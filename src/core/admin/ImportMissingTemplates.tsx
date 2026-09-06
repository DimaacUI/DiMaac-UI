'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { importStaticTemplates } from '@/app/admin/templates/actions';

interface Props {
  missing: { slug: string; title: string }[];
}

/**
 * Templates that shipped with the latest deploy but aren't in the database
 * yet are imported as soon as the admin opens this page, so the list always
 * matches what the public site shows. Existing rows are never touched.
 */
export default function ImportMissingTemplates({ missing }: Props) {
  const router = useRouter();
  const started = useRef(false);
  const [state, setState] = useState<'importing' | 'done' | 'error'>('importing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    importStaticTemplates({ onlyMissing: true }).then((result) => {
      if (result.ok) {
        setState('done');
        setMessage(result.summary ?? 'Imported.');
        router.refresh();
      } else {
        setState('error');
        setMessage(result.error ?? 'Import failed');
      }
    });
  }, [router]);

  const names = missing.map((m) => m.title).join(', ');

  return (
    <div
      className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
        state === 'error'
          ? 'border-red-500/30 bg-red-500/10 text-red-200'
          : 'border-[#DDFC3E]/30 bg-[#DDFC3E]/10 text-white/80'
      }`}
    >
      {state === 'importing' && (
        <>
          Adding {missing.length} template{missing.length === 1 ? '' : 's'} from the latest deploy:{' '}
          <span className="text-white">{names}</span>…
        </>
      )}
      {state === 'done' && (
        <>
          Added from the latest deploy: <span className="text-white">{names}</span>. {message}
        </>
      )}
      {state === 'error' && (
        <>
          Couldn&apos;t import {names}: {message}
        </>
      )}
    </div>
  );
}
