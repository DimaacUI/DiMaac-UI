'use client';

import { useState } from 'react';
import { TemplatePage } from '@/types/templates';

interface TemplateDownloadPanelProps {
  template: TemplatePage;
  subscriptionCheckoutUrl?: string;
}

const TemplateDownloadPanel = ({ template, subscriptionCheckoutUrl }: TemplateDownloadPanelProps) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleDownload = async () => {
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/templates/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: template.slug,
          licenseKey: template.tier === 'free' ? undefined : licenseKey,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setStatus('error');
        setMessage(data.error ?? 'Download failed');
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = template.zipFileName ?? `${template.slug}.zip`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
      setStatus('idle');
      setMessage('Download started');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#17171A] p-6 space-y-5">
      <div>
        <h3 className="text-md font-semibold text-white mb-1">Get the source</h3>
        <p className="text-sm text-white/70">
          {template.tier === 'free'
            ? 'Free download — full source, no license key needed.'
            : 'Pro template — subscribe to DiMaac Pro, then paste your license key from Lemon Squeezy.'}
        </p>
      </div>

      {template.tier === 'pro' && subscriptionCheckoutUrl && subscriptionCheckoutUrl !== '#' && (
        <a
          href={subscriptionCheckoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[#DDFC3E] text-black font-bold text-sm px-5 py-3 hover:opacity-90 transition-opacity"
        >
          Subscribe — all pro templates
        </a>
      )}

      {template.tier === 'pro' && (
        <div className="space-y-2">
          <label htmlFor="license-key" className="text-sm text-white/80">
            License key (from your Lemon Squeezy receipt)
          </label>
          <input
            id="license-key"
            type="text"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="w-full rounded-lg border border-white/10 bg-[#252222] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={status === 'loading' || (template.tier === 'pro' && !licenseKey.trim())}
          className="inline-flex items-center justify-center rounded-lg bg-white text-black font-bold text-sm px-5 py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {status === 'loading' ? 'Preparing…' : 'Download zip'}
        </button>
        {template.zipFileName && (
          <span className="text-xs text-white/50 font-mono">{template.zipFileName}</span>
        )}
      </div>

      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-[#DDFC3E]'}`}>{message}</p>
      )}

      {template.tier === 'pro' && (
        <p className="text-xs text-white/50 leading-relaxed">
          After checkout, Lemon Squeezy emails your license key. Paste it here to download. One Pro
          subscription unlocks every pro template.
        </p>
      )}
    </div>
  );
};

export default TemplateDownloadPanel;
