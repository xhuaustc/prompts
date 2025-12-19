import { cn } from "@/components/ui/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "glass";
  size?: "sm" | "md";
};

export function Button({ className, variant = "glass", size = "md", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm"
  }[size];

  const variants = {
    primary:
      "bg-blue-500/90 hover:bg-blue-400/90 text-white shadow-glass border border-white/10 backdrop-blur",
    ghost:
      "bg-white/0 hover:bg-white/10 text-white/80 hover:text-white border border-white/0 hover:border-white/10 backdrop-blur",
    glass:
      "bg-white/10 hover:bg-white/15 text-white border border-white/10 shadow-glass backdrop-blur"
  }[variant];

  return <button className={cn(base, sizes, variants, className)} {...props} />;
}


