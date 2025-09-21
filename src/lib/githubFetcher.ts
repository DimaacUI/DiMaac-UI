/**
 * GitHub source code fetcher utility
 * Fetches raw file content from GitHub repository
 */

interface GitHubFile {
  path: string;
  name: string;
}

interface GitHubConfig {
  owner: string;
  repo: string;
  branch?: string;
}

const DEFAULT_CONFIG: GitHubConfig = {
  owner: 'DimaacUI', 
  repo: 'DiMaac-UI', 
  branch: 'main'
};

/**
 * Helper function to test GitHub configuration
 * Call this to verify your GitHub setup is working
 */
export async function testGitHubConfig(): Promise<void> {
  console.log('Testing GitHub configuration...');
  console.log('Config:', DEFAULT_CONFIG);
  
  // Test with a simple file that should exist
  const testUrl = `https://api.github.com/repos/${DEFAULT_CONFIG.owner}/${DEFAULT_CONFIG.repo}`;
  try {
    const response = await fetch(testUrl);
    if (response.ok) {
      const repoInfo = await response.json();
      console.log('✅ Repository found:', repoInfo.full_name);
      console.log('📁 Default branch:', repoInfo.default_branch);
    } else {
      console.error('❌ Repository not found or not accessible');
      console.error('Check your owner/repo names in DEFAULT_CONFIG');
    }
  } catch (error) {
    console.error('❌ Error testing GitHub config:', error);
  }
}

/**
 * Fetches raw file content from GitHub
 */
export async function fetchGitHubFile(filePath: string, config: Partial<GitHubConfig> = {}): Promise<string> {
  const { owner, repo, branch } = { ...DEFAULT_CONFIG, ...config };
  
  // GitHub raw content URL format
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
  
  try {
    console.log(`Attempting to fetch: ${url}`);
    const response = await fetch(url, {
      next: { 
        revalidate: process.env.NODE_ENV === 'development' ? 300 : 3600 
      }
    });
    
    if (!response.ok) {
      console.warn(`GitHub fetch failed: ${response.status} ${response.statusText} for ${url}`);
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }
    
    const content = await response.text();
    console.log(`Successfully fetched ${filePath} (${content.length} characters)`);
    return content;
  } catch (error) {
    console.error(`Error fetching GitHub file ${filePath}:`, error);
    console.error(`URL attempted: ${url}`);
    // Return a fallback message instead of throwing
    return `// Error: Could not fetch source code from GitHub\n// File: ${filePath}\n// URL: ${url}\n// Please check if the file exists and the repository is accessible.\n// You may need to update the GitHub configuration in githubFetcher.ts`;
  }
}

/**
 * Fetches multiple files from GitHub
 */
export async function fetchGitHubFiles(files: GitHubFile[], config: Partial<GitHubConfig> = {}): Promise<Array<{ name: string; content: string; path: string }>> {
  const promises = files.map(async (file) => ({
    name: file.name,
    path: file.path,
    content: await fetchGitHubFile(file.path, config)
  }));
  
  return await Promise.all(promises);
}

/**
 * Common file paths for DiMaac components
 */
export const COMPONENT_PATHS = {
  // UI Components
  imageGallery: 'src/ui/components/gallery/ImageGallery.tsx',
  scrollingGallery: 'src/ui/components/gallery/ScrollingGallery.tsx',
  liquidImageReveal: 'src/ui/components/reveals/image/LiquidImageReveal.tsx',
  textLoader: 'src/ui/components/loaders/TextLoader.tsx',
  mouseTiltCard: 'src/ui/components/cards/MouseTiltCard.tsx',
  textScrambleReveal: 'src/ui/components/reveals/text/TextScrambleReveal.tsx',
  mouseTrail: 'src/ui/components/interactive/MouseTrail.tsx',
  expandablePanel: 'src/ui/components/layout/ExpandablePanel.tsx',
  swipeableCards: 'src/ui/components/cards/SwipeableCards.tsx',
  instagramCard: 'src/ui/components/cards/InstagramCard.tsx',
  contextMenu: 'src/ui/components/interactive/ContextMenu.tsx',
  
  // Demo Components
  imageGalleryDemo: 'src/examples/components/gallery/ImageGalleryDemo.tsx',
  scrollingGalleryDemo: 'src/examples/components/gallery/ScrollingGalleryDemo.tsx',
  liquidImageRevealDemo: 'src/examples/components/reveals/LiquidImageRevealDemo.tsx',
  textLoaderDemo: 'src/examples/components/loaders/TextLoaderDemo.tsx',
  mouseTiltCardDemo: 'src/examples/components/cards/MouseTiltCardDemo.tsx',
  textScrambleRevealDemo: 'src/examples/components/reveals/TextScrambleRevealDemo.tsx',
  mouseTrailDemo: 'src/examples/components/interactive/MouseTrailDemo.tsx',
  expandablePanelDemo: 'src/examples/components/layout/ExpandablePanelDemo.tsx',
  swipeableCardsDemo: 'src/examples/components/cards/SwipeableCardsDemo.tsx',
  instagramCardDemo: 'src/examples/components/cards/InstagramCardDemo.tsx',
  contextMenuDemo: 'src/examples/components/interactive/ContextMenuDemo.tsx',
  
  // Utility files
  utils: 'src/lib/utils.ts',
  useGSAPResize: 'src/lib/useGSAPResize.tsx',
} as const;

export type ComponentPath = keyof typeof COMPONENT_PATHS;
