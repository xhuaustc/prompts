"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/components/ui/cn";

type HeaderAction = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

type HeaderBarProps = {
  title: string;
  search: string;
  onSearchChange: (value: string) => void;
  rightActions: HeaderAction[];
};

export function HeaderBar({ title, search, onSearchChange, rightActions }: HeaderBarProps) {
  return (
    <div className="animate-fade-up rounded-3xl border border-white/10 bg-white/10 px-4 py-3 shadow-glass backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-wide text-white/90">{title}</div>
          <div className="text-xs text-white/60">A calm week, clearly planned.</div>
        </div>

        <div className="mx-auto hidden w-full max-w-[520px] items-center gap-2 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search events, people, places..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {rightActions.map((a) => (
            <Button
              key={a.label}
              variant="ghost"
              size="sm"
              onClick={a.onClick}
              aria-label={a.label}
              title={a.label}
              className="h-9 w-9 px-0"
            >
              {a.icon}
            </Button>
          ))}

          <div className="ml-1 flex items-center gap-2">
            <div
              className={cn(
                "grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/10 backdrop-blur",
                "shadow-glass"
              )}
              aria-label="User profile"
              title="Profile"
            >
              <span className="text-xs font-semibold text-white/90">MP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex md:hidden">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events..."
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}


