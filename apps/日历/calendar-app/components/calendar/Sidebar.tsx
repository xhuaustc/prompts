"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import type { CalendarSource } from "@/lib/types";
import { formatMonthTitle } from "@/lib/date";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { MiniMonth } from "@/components/calendar/MiniMonth";

type SidebarProps = {
  monthAnchor: Date;
  onMonthAnchorChange: (d: Date) => void;
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
  calendars: CalendarSource[];
  visibility: Record<string, boolean>;
  onToggleCalendar: (id: string) => void;
};

export function Sidebar({
  monthAnchor,
  onMonthAnchorChange,
  selectedDate,
  onSelectDate,
  calendars,
  visibility,
  onToggleCalendar
}: SidebarProps) {
  return (
    <aside className="hidden w-[264px] shrink-0 animate-fade-up flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-4 shadow-glass backdrop-blur-xl lg:flex">
      <Button variant="primary" className="w-full justify-center" onClick={() => null}>
        <Plus className="h-4 w-4" />
        Create
      </Button>

      <div className="rounded-2xl border border-white/10 bg-white/10 p-3 shadow-glass backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-white/85">{formatMonthTitle(monthAnchor)}</div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 px-0"
              aria-label="Previous month"
              onClick={() => onMonthAnchorChange(new Date(monthAnchor.getFullYear(), monthAnchor.getMonth() - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 px-0"
              aria-label="Next month"
              onClick={() => onMonthAnchorChange(new Date(monthAnchor.getFullYear(), monthAnchor.getMonth() + 1, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <MiniMonth
          monthAnchor={monthAnchor}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/10 p-3 shadow-glass backdrop-blur">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">My calendars</div>
        <div className="space-y-2">
          {calendars.map((c) => {
            const checked = Boolean(visibility[c.id]);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onToggleCalendar(c.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition",
                  checked
                    ? "border-white/10 bg-white/10 hover:bg-white/15"
                    : "border-white/5 bg-white/5 hover:bg-white/10"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", c.colorClass)} />
                  <span className={cn(checked ? "text-white/85" : "text-white/50")}>{c.name}</span>
                </span>
                <span className={cn("text-xs", checked ? "text-white/60" : "text-white/40")}>
                  {checked ? "On" : "Off"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}


