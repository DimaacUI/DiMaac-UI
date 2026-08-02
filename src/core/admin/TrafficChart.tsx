'use client';

import { useState } from 'react';

/**
 * Views and downloads over time.
 *
 * Two series, one y-axis, grouped bars with a 2px surface gap between fills.
 * Colours are categorical slots 1 and 2 from the validated dark palette; the
 * legend plus the tooltip mean identity is never carried by colour alone.
 */

const SERIES_1 = '#3987e5'; // views
const SERIES_2 = '#d95926'; // downloads

interface Point {
  day: string;
  views: number;
  downloads: number;
}

export default function TrafficChart({ data }: { data: Point[] }) {
  const [hover, setHover] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center rounded-xl border border-white/10 bg-[#111114] text-sm text-white/40">
        No traffic recorded yet.
      </div>
    );
  }

  const max = Math.max(1, ...data.map((d) => Math.max(d.views, d.downloads)));
  const barGroupWidth = 100 / data.length;

  const active = hover !== null ? data[hover] : null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#111114] p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">Traffic</h3>
        <div className="flex items-center gap-4 text-xs text-white/60">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ background: SERIES_1 }}
            />
            Views
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ background: SERIES_2 }}
            />
            Downloads
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="flex h-[180px] items-end gap-[2px]" onMouseLeave={() => setHover(null)}>
          {data.map((point, index) => (
            <div
              key={point.day}
              className="group relative flex h-full flex-1 items-end justify-center gap-[2px]"
              onMouseEnter={() => setHover(index)}
            >
              <div
                className="w-full max-w-[10px] rounded-t-[4px] transition-opacity"
                style={{
                  height: `${(point.views / max) * 100}%`,
                  background: SERIES_1,
                  minHeight: point.views > 0 ? 2 : 0,
                  opacity: hover === null || hover === index ? 1 : 0.35,
                }}
              />
              <div
                className="w-full max-w-[10px] rounded-t-[4px] transition-opacity"
                style={{
                  height: `${(point.downloads / max) * 100}%`,
                  background: SERIES_2,
                  minHeight: point.downloads > 0 ? 2 : 0,
                  opacity: hover === null || hover === index ? 1 : 0.35,
                }}
              />
            </div>
          ))}
        </div>

        {active && (
          <div
            className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 rounded-lg border border-white/15 bg-[#0B0B0F] px-3 py-2 text-xs shadow-lg"
            style={{ left: `${(hover! + 0.5) * barGroupWidth}%` }}
          >
            <p className="mb-1 font-semibold text-white">{active.day}</p>
            <p className="text-white/70">
              <span className="mr-1 inline-block h-2 w-2 rounded-sm" style={{ background: SERIES_1 }} />
              {active.views} views
            </p>
            <p className="text-white/70">
              <span className="mr-1 inline-block h-2 w-2 rounded-sm" style={{ background: SERIES_2 }} />
              {active.downloads} downloads
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-white/35">
        <span>{data[0]?.day}</span>
        <span>{data[data.length - 1]?.day}</span>
      </div>
    </div>
  );
}
