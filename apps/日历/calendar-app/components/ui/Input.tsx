import { cn } from "@/components/ui/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={cn(
                "h-10 w-full rounded-xl bg-white/10 border border-white/10 px-4 text-sm text-white placeholder:text-white/50 backdrop-blur shadow-glass",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                className
            )}
            {...props}
        />
    );
}


