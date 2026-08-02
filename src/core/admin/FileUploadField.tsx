'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';

interface FileUploadFieldProps {
  label: string;
  hint?: string;
  accept: string;
  value: string | null;
  onChange: (url: string | null, meta?: { size: number; name: string }) => void;
  /** Blob folder prefix, e.g. "templates/zips". */
  folder: string;
}

/**
 * Uploads straight from the browser to Blob storage via a short-lived token,
 * so large template zips never pass through a serverless function.
 */
export default function FileUploadField({
  label,
  hint,
  accept,
  value,
  onChange,
  folder,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setProgress(0);

    try {
      // Zips go to the private store, images/video to the public one. The
      // server decides from the folder — this only has to match it.
      const isPrivate = folder.startsWith('templates/zips');

      const result = await upload(`${folder}/${file.name}`, file, {
        access: isPrivate ? 'private' : 'public',
        handleUploadUrl: '/api/admin/blob-upload',
        onUploadProgress: ({ percentage }) => setProgress(percentage),
      });

      onChange(result.url, { size: file.size, name: file.name });
      setProgress(null);
    } catch (err) {
      setProgress(null);
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  }

  const filename = value ? decodeURIComponent(value.split('/').pop() ?? '') : null;

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-white/60">{label}</label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={progress !== null}
          className="rounded-lg border border-white/15 bg-[#17171A] px-3 py-2 text-sm text-white transition-colors hover:border-white/30 disabled:opacity-50"
        >
          {progress !== null ? `Uploading ${Math.round(progress)}%` : value ? 'Replace' : 'Upload'}
        </button>

        {value && progress === null && (
          <>
            {folder.startsWith('templates/zips') ? (
              // Private blob — the URL won't open without the store token, so
              // showing it as a link would just look broken.
              <span className="max-w-[220px] truncate text-sm text-white/70">
                {filename} <span className="text-white/35">(private)</span>
              </span>
            ) : (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-[220px] truncate text-sm text-[#DDFC3E] hover:underline"
              >
                {filename}
              </a>
            )}
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-sm text-white/40 transition-colors hover:text-red-300"
            >
              Remove
            </button>
          </>
        )}
      </div>

      {progress !== null && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-[#DDFC3E] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {hint && !error && <p className="text-xs text-white/35">{hint}</p>}
      {error && <p className="text-xs text-red-300">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
