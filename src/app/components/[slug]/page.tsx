import Badge from '@/core/components/Badge';
import CodeBlock from '@/core/components/CodeBlock';
import ClientTabPanel, { TabItem } from '@/core/components/ClientTabPanel';
import CopyButton from '@/core/components/CopyButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { getComponentBySlug } from '@/data/componentData';
import { fetchGitHubFiles, fetchGitHubFile } from '@/lib/githubFetcher';

interface ComponentDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Extract CLI component name from GitHub files or use cli property
const getCliComponentName = (componentData: any): string => {
    if (componentData.cli) {
        return componentData.cli;
    }
    if (componentData.githubFiles && componentData.githubFiles.length > 0) {
        const mainComponentFile = componentData.githubFiles.find((file: any) => 
            file.displayName?.includes('components/ui/') && file.name.endsWith('.tsx')
        );
        
        if (mainComponentFile) {
            const fileName = mainComponentFile.name.replace('.tsx', '');
            return fileName;
        }
    }
    
    return componentData.title.replace(/\s+/g, '');
};

export default async function ComponentDetailPage({ params }: ComponentDetailPageProps) {
    const { slug } = await params;
    const componentData = getComponentBySlug(slug);
    
    if (!componentData) {
        return (
            <div className="w-full md:max-w-[calc(100%-300px)] flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">Component Not Found</h1>
                    <p className="text-white/80">The component &quot;{slug}&quot; could not be found.</p>
                </div>
            </div>
        );
    }
    
    const cliComponentName = getCliComponentName(componentData);

    // Fetch demo source code from GitHub if demoSourcePath is specified
    let demoSourceCode = componentData.sourceCode || '';
    if (componentData.demoSourcePath) {
        try {
            demoSourceCode = await fetchGitHubFile(componentData.demoSourcePath);
        } catch (error) {
            console.error('Error fetching demo source code:', error);
            // Fall back to static sourceCode if it exists
        }
    }

    // Fetch source code from GitHub if githubFiles are specified
    let githubFiles: Array<{ name: string; content: string; path: string }> = [];
    if (componentData.githubFiles && componentData.githubFiles.length > 0) {
        try {
            githubFiles = await fetchGitHubFiles(
                componentData.githubFiles.map(file => ({
                    name: file.displayName || file.name,
                    path: file.githubPath
                }))
            );
        } catch (error) {
            console.error('Error fetching GitHub files:', error);
            // Continue with empty array - fallback to static files if they exist
        }
    }

    // Use GitHub files if available, otherwise fall back to static files
    const filesToDisplay = githubFiles.length > 0 ? githubFiles : (componentData.files || []);

    const DemoComponent = componentData.demoComponent;
    return (
        <div className="w-full md:max-w-[calc(100%-300px)] md:mt-[1rem]">
            <div className="w-full">
                {/* Header Section */}
                <header className="mb-8 space-y-4">
                    <div className="space-y-3">
                        <h1 className="font-bold text-xl md:text-2xl text-white leading-tight">
                            {componentData.title}
                        </h1>
                        <p className="text-sm md:text-md text-white/80 leading-relaxed">
                            {componentData.description}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {componentData.tags.map((tag) => (
                            <Badge key={tag}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </header>

                {/* Component Demo Section */}
                <div className="w-full mb-8">
                    <CodeBlock component={<DemoComponent />} sourceCode={demoSourceCode}></CodeBlock>
                </div>
                {/* Documentation Section */}
                <section className="w-full">
                    <ClientTabPanel
                        tabList={['Installation', 'Props']}
                        defaultTab="Installation"
                    >
                        <TabItem label="Installation">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-md font-semibold text-white mb-3">Using CLI</h3>
                                    <div className="bg-[#252222] p-4 rounded-lg border border-white/10 relative group">
                                        <code className="text-sm text-white/90 font-mono">
                                            npx dimaac add {cliComponentName}
                                        </code>
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
                                    <div key={index} className="w-full bg-[#18181C] rounded-xl border border-white/10 relative group">
                                        <div className="p-4 pb-2">
                                            <p className='text-white text-sm bg-[#252222] w-fit p-2 rounded-md'>{file.name}</p>
                                        </div>
                                        <div className="absolute top-4 right-4 z-10">
                                            <CopyButton text={file.content} size="sm" />
                                        </div>
                                        <div className="px-4 pb-4 max-h-[500px] overflow-auto">
                                            <SyntaxHighlighter
                                                lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                                                language="typescript" style={vscDarkPlus} className="rounded-lg">
                                                {file.content}
                                            </SyntaxHighlighter>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabItem>

                        <TabItem label="Props">
                            <div className="space-y-6">
                                {componentData.props.map((propSection, sectionIndex) => (
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
                                                                <code className="bg-gray-800 px-2 py-1 rounded text-xs">
                                                                    {prop.type}
                                                                </code>
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
                                                            <td className="px-3 md:px-6 py-4 text-sm text-white/80">
                                                                {prop.description}
                                                            </td>
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
                </section>
            </div>
        </div>
    )
}