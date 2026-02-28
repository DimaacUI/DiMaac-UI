'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, CodeXml, Eye } from 'lucide-react';
import LenisScrollArea from './LenisScrollArea';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Logo from './Logo';
import CopyButton from './CopyButton';
import Badge from './Badge';
import ClientTabPanel, { TabItem } from './ClientTabPanel';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { NAV_SECTIONS } from '@/config/navigation';
import type { ComponentPage, PropSection } from '@/types/components';

type SerializableComponentData = Omit<ComponentPage, 'demoComponent'>;

interface FileDisplay {
  name: string;
  content: string;
  path: string;
}

interface FullscreenComponentViewProps {
  componentData: SerializableComponentData;
  demoSourceCode: string;
  filesToDisplay: FileDisplay[];
  cliComponentName: string;
  children: React.ReactNode; // Rendered demo component from server
}

function isItemActive(pathname: string, href: string): boolean {
  if (href === '/' && pathname === '/') return true;
  if (href !== '/' && pathname.startsWith(href)) return true;
  return false;
}

export default function FullscreenComponentView({
  componentData,
  demoSourceCode,
  filesToDisplay,
  cliComponentName,
  children: demoChildren,
}: FullscreenComponentViewProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  const sectionsWithActiveState = NAV_SECTIONS.map((section) => ({
    ...section,
    item: section.item.map((item) => ({
      ...item,
      isActive: isItemActive(pathname, item.href),
    })),
  }));

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0B0B0F] h-[100dvh]">
      {/* Top bar - above content, below drawer */}
      <header className="flex-shrink-0 flex items-center justify-between h-14 px-4 border-b border-white/10 bg-black/50 backdrop-blur-sm z-[9997]">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} className="text-white" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">{componentData.title}</span>
          <button
            onClick={() => setViewMode(viewMode === 'preview' ? 'code' : 'preview')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              viewMode === 'preview'
                ? 'bg-white/10 text-white hover:bg-white/15'
                : 'bg-[#DDFC3E] text-black hover:bg-[#DDFC3E]/90'
            )}
          >
            {viewMode === 'preview' ? (
              <>
                <CodeXml size={18} />
                Code
              </>
            ) : (
              <>
                <Eye size={18} />
                Preview
              </>
            )}
          </button>
        </div>
      </header>

      {/* Drawer overlay - high z so it stays above pinned/3D content (e.g. ImagesFlow) */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998]"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer - high z so it stays above all component content */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-80 bg-[#0B0B0F] border-r border-white/10 z-[9999] transform transition-transform duration-300 ease-out flex flex-col',
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex-shrink-0 p-4 border-b border-white/10 flex items-center justify-between">
          <Logo className="w-24 h-auto" />
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 text-white text-xl"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <Sidebar
            title="DiMaac"
            sections={sectionsWithActiveState}
            onItemClick={() => setDrawerOpen(false)}
            isMobile
          />
        </div>
      </div>

      {/* Content area */}
      <main className="flex-1 flex flex-col min-h-0">
        {viewMode === 'preview' ? (
          <LenisScrollArea>{demoChildren}</LenisScrollArea>
        ) : (
          <div
            className="flex-1 overflow-auto w-full px-4 py-8"
            data-lenis-prevent
          >
            <div className="w-full max-w-[900px] mx-auto">
            {/* Header */}
            <header className="mb-8 space-y-4">
              <div className="space-y-3">
                <h1 className="font-bold text-xl md:text-2xl text-white leading-tight">{componentData.title}</h1>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">{componentData.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {componentData.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </header>

            {/* Source code */}
            <div className="w-full mb-8">
              <div className="w-full bg-[#17171A] p-4 rounded-xl border border-white/10 relative group">
                <div className="absolute top-4 right-4 z-10">
                  <CopyButton text={demoSourceCode} size="sm" />
                </div>
                <div className="w-full max-h-[600px] overflow-auto" data-lenis-prevent>
                  <SyntaxHighlighter
                    lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                    language="typescript"
                    style={vscDarkPlus}
                    className="rounded-lg !bg-transparent !p-0"
                  >
                    {demoSourceCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>

            {/* Installation & Props */}
            <ClientTabPanel tabList={['Installation', 'Props']} defaultTab="Installation">
              <TabItem label="Installation">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-semibold text-white mb-3">Using CLI</h3>
                    <div className="bg-[#252222] p-4 rounded-lg border border-white/10 relative group">
                      <code className="text-sm text-white/90 font-mono">npx dimaac add {cliComponentName}</code>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <CopyButton text={`npx dimaac add ${cliComponentName}`} size="sm" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-white mb-3">Manual Installation</h3>
                    <div className="bg-[#252222] p-4 rounded-lg border border-white/10 relative group">
                      <code className="text-sm text-white/90 font-mono">
                        npm install {componentData.dependencies.join(' ')}
                      </code>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <CopyButton text={`npm install ${componentData.dependencies.join(' ')}`} size="sm" />
                      </div>
                    </div>
                  </div>
                  {filesToDisplay.map((file, index) => (
                    <div
                      key={index}
                      className="w-full bg-[#17171A] rounded-xl border border-white/10 relative group"
                    >
                      <div className="p-4 pb-2">
                        <p className="text-white text-sm bg-[#252222] w-fit p-2 rounded-md">{file.name}</p>
                      </div>
                      <div className="absolute top-4 right-4 z-10">
                        <CopyButton text={file.content} size="sm" />
                      </div>
                      <div className="px-4 pb-4 max-h-[500px] overflow-auto" data-lenis-prevent>
                        <SyntaxHighlighter
                          lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                          language="typescript"
                          style={vscDarkPlus}
                          className="rounded-lg !bg-transparent !p-0"
                        >
                          {file.content}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  ))}
                </div>
              </TabItem>

              <TabItem label="Props">
                <div className="space-y-6">
                  {componentData.props.map((propSection: PropSection, sectionIndex: number) => (
                    <div key={sectionIndex}>
                      <h3 className="text-md font-semibold text-white mb-3">{propSection.title}</h3>
                      <div className="overflow-x-auto -mx-4 md:mx-0 rounded-lg border border-white/10">
                        <table className="min-w-full divide-y divide-white/10">
                          <thead className="bg-[#252222]">
                            <tr>
                              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                                Type
                              </th>
                              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                                Default
                              </th>
                              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-[#1a1a1a] divide-y divide-white/10">
                            {propSection.props.map((prop, propIndex) => (
                              <tr key={propIndex}>
                                <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-[#EDEDED]">
                                  {prop.property}
                                  {prop.required && <span className="text-red-400 ml-1">*</span>}
                                </td>
                                <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-white/80">
                                  <code className="bg-gray-800 px-2 py-1 rounded text-xs">{prop.type}</code>
                                </td>
                                <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-white/80">
                                  {prop.defaultValue ? (
                                    <code className="bg-gray-800 px-2 py-1 rounded text-xs">
                                      {prop.defaultValue}
                                    </code>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                <td className="px-3 md:px-6 py-4 text-sm text-white/80">{prop.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </TabItem>
            </ClientTabPanel>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
