import 'server-only';

/**
 * Minimal GitHub Git Data API client.
 *
 * Uses blobs → tree → commit → update-ref so a component and its registry
 * entries land in ONE commit — a half-applied publish would break the build.
 * The commit is always authored as GITHUB_COMMIT_EMAIL regardless of which
 * account the token belongs to.
 */

const API = 'https://api.github.com';

interface RepoConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export function isGitHubConfigured(): boolean {
  return Boolean(process.env.GITHUB_PAT);
}

function config(): RepoConfig {
  const token = process.env.GITHUB_PAT;
  if (!token) throw new Error('GITHUB_PAT is not set — cannot publish components.');

  return {
    owner: process.env.GITHUB_OWNER ?? 'DimaacUI',
    repo: process.env.GITHUB_REPO ?? 'DiMaac-UI',
    branch: process.env.GITHUB_BRANCH ?? 'main',
    token,
  };
}

async function gh<T>(path: string, init: RequestInit & { token: string }): Promise<T> {
  const { token, ...rest } = init;
  const response = await fetch(`${API}${path}`, {
    ...rest,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(rest.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`GitHub ${path} failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  return response.json() as Promise<T>;
}

export interface CommitFile {
  /** Repo-relative path, e.g. src/examples/components/cards/FooDemo.tsx */
  path: string;
  content: string;
}

export interface CommitResult {
  sha: string;
  url: string;
}

/** Commits every file atomically and returns the new commit sha. */
export async function commitFiles(files: CommitFile[], message: string): Promise<CommitResult> {
  if (files.length === 0) throw new Error('No files to commit.');

  const { owner, repo, branch, token } = config();
  const base = `/repos/${owner}/${repo}`;

  // 1. Current branch head + its tree.
  const ref = await gh<{ object: { sha: string } }>(
    `${base}/git/ref/heads/${branch}`,
    { token, method: 'GET' },
  );
  const headSha = ref.object.sha;

  const headCommit = await gh<{ tree: { sha: string } }>(
    `${base}/git/commits/${headSha}`,
    { token, method: 'GET' },
  );

  // 2. One blob per file.
  const blobs = await Promise.all(
    files.map(async (file) => {
      const blob = await gh<{ sha: string }>(`${base}/git/blobs`, {
        token,
        method: 'POST',
        body: JSON.stringify({
          content: Buffer.from(file.content, 'utf8').toString('base64'),
          encoding: 'base64',
        }),
      });
      return { path: file.path, sha: blob.sha };
    }),
  );

  // 3. Tree layered on the current one.
  const tree = await gh<{ sha: string }>(`${base}/git/trees`, {
    token,
    method: 'POST',
    body: JSON.stringify({
      base_tree: headCommit.tree.sha,
      tree: blobs.map((blob) => ({
        path: blob.path,
        mode: '100644',
        type: 'blob',
        sha: blob.sha,
      })),
    }),
  });

  // 4. Commit.
  const author = {
    name: process.env.GITHUB_COMMIT_NAME ?? 'Joydeb',
    email: process.env.GITHUB_COMMIT_EMAIL ?? 'rjoydeb622@gmail.com',
    date: new Date().toISOString(),
  };

  const commit = await gh<{ sha: string; html_url: string }>(`${base}/git/commits`, {
    token,
    method: 'POST',
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [headSha],
      author,
      committer: author,
    }),
  });

  // 5. Move the branch.
  await gh(`${base}/git/refs/heads/${branch}`, {
    token,
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });

  return { sha: commit.sha, url: commit.html_url };
}

/** Kicks off a Vercel build so the new component actually ships. */
export async function triggerDeploy(): Promise<boolean> {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) return false;

  try {
    const response = await fetch(hook, { method: 'POST', cache: 'no-store' });
    return response.ok;
  } catch (error) {
    console.error('[github] deploy hook failed:', error);
    return false;
  }
}
