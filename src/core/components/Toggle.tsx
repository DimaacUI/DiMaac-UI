"use client"

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ToggleOption {
    label: string;
    icon?: React.ReactNode;
    value: string;
}

interface ToggleProps {
    options: ToggleOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const Toggle = ({ options, value, onChange, className }: ToggleProps) => {
    const [hasInteracted, setHasInteracted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const activeIndex = options.findIndex(option => option.value === value);
    
    const handleChange = (newValue: string) => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
        onChange(newValue);
    };

    return (
        <div 
            ref={containerRef}
            className={cn(
                "flex relative bg-gray-900/20 backdrop-blur-sm rounded-xl p-1 w-fit border border-white/10 cursor-pointer ",
                className
            )}
        >
            {/* Sliding background */}
            <div 
                className={cn(
                    "absolute top-1 h-[calc(100%-0.5rem)] bg-[#DDFC3E] rounded-lg shadow-sm",
                    hasInteracted && "transition-transform duration-300 ease-out"
                )}
                style={{
                    width: `calc(50% - 0.25rem)`,
                    transform: `translateX(${activeIndex * 100}%)`,
                }}
            />
            
            {/* Toggle buttons */}
            {options.map((option) => (
                <button
                    key={option.value}
                    className={cn(
                        "flex items-center justify-center gap-2 text-sm font-medium py-1.5 px-4 rounded-lg relative z-10 whitespace-nowrap flex-1 cursor-pointer",
                        "transition-colors duration-200",
                        value === option.value 
                            ? "text-gray-900" 
                            : "text-white/80 hover:text-white"
                    )}
                    onClick={() => handleChange(option.value)}
                >
                    <span>{option.label}</span>
                    {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                </button>
            ))}
        </div>
    );
};

export default Toggle;