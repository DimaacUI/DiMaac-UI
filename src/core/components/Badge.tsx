import { cn } from "@/lib/utils";

interface BadgeProps{
    children: React.ReactNode;
    className?: string;
}

const Badge = ({children, className}: BadgeProps) => {
    return (
        <div className={cn("bg-white/10 rounded-md px-2.5 py-1.5 text-xs border border-white/10", className)}>{children}</div>
    )
}

export default Badge;