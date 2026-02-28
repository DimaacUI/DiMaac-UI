"use client"

import { cn } from "@/lib/utils";
import { CodeXml, Eye } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useState } from "react";
import Toggle from "@/core/components/Toggle";
import CopyButton from "@/core/components/CopyButton";

interface CodeBlockProps{
    sourceCode: string;
    component?: React.ReactNode;
    className?: string;
}

const CodeBlock = ( props: CodeBlockProps) => {
    const [isPreview, setIsPreview] = useState(true);

    const toggleOptions = [
        {
            label: "Preview",
            icon: <Eye size={16} />,
            value: "preview"
        },
        {
            label: "Code",
            icon: <CodeXml size={16} />,
            value: "code"
        }
    ];

    return(
        <div className="mt-5 flex flex-col gap-2 overflow-hidden">
        <Toggle 
            options={toggleOptions}
            value={isPreview ? "preview" : "code"}
            onChange={(value) => setIsPreview(value === "preview")}
        />
        <div className={cn("w-full bg-[#17171A] p-4 rounded-xl border border-white/10 text-sm font-mono mb-5 relative group", props.className)}>
            {!isPreview && (
                <div className="absolute top-7 right-7 z-10">
                    <CopyButton text={props.sourceCode} size="sm" />
                </div>
            )}
            
            <div className="w-full h-full">
            {isPreview && props.component ? (
                <div className="w-full">
                    {props.component}
                </div>
            ) : (
                    <div className="w-full max-h-[800px] overflow-auto">
                        <SyntaxHighlighter 
                    lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                    language="typescript" style={vscDarkPlus} className="rounded-lg bg-red-500">
                    {props.sourceCode}
                    </SyntaxHighlighter>
                    </div>
            )}
            </div>
        </div>
        </div>
    )
}

export default CodeBlock;