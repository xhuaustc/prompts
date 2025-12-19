"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { CalendarView } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

type CalendarToolbarProps = {
  view: CalendarView;
  onViewChange: (v: CalendarView) => void;
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};

export function CalendarToolbar({
  view,
  onViewChange,
  title,
  onPrev,
  onNext,
  onToday
}: CalendarToolbarProps) {
  const views: { id: CalendarView; label: string }[] = [
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" }
  ];

  return (
    <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white/90">{title}</div>
        <div className="flex items-center gap-1 md:hidden">
          <Button variant="ghost" size="sm" className="h-8 w-8 px-0" onClick={onPrev} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 px-0" onClick={onNext} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 md:justify-end">
        <div className="flex items-center gap-2">
          <div className="flex rounded-2xl border border-white/10 bg-white/10 p-1 backdrop-blur">
            {views.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => onViewChange(v.id)}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                  view === v.id ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
                )}
              >
                {v.label}
              </button>
            ))}
          </div>

          <Button variant="ghost" size="sm" onClick={onToday}>
            Today
          </Button>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" className="h-9 w-9 px-0" onClick={onPrev} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 px-0" onClick={onNext} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}


