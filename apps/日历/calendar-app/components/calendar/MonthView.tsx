"use client";

import type { CalendarEvent } from "@/lib/types";
import { formatShortDay, getMonthGrid, isSameDay, startOfDay } from "@/lib/date";
import { cn } from "@/components/ui/cn";

type MonthViewProps = {
  monthAnchor: Date;
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
  events: CalendarEvent[];
};

export function MonthView({ monthAnchor, selectedDate, onSelectDate, events }: MonthViewProps) {
  const cells = getMonthGrid(monthAnchor, 1);
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 1 + i));

  function hasEvents(day: Date) {
    return events.some((e) => isSameDay(e.start, day));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="grid grid-cols-7 border-b border-white/10 px-3 py-2">
        {weekdays.map((d) => (
          <div key={d.toISOString()} className="text-center text-[11px] font-semibold text-white/55">
            {formatShortDay(d)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-white/10 p-px">
        {cells.map((c) => {
          const isSelected = isSameDay(c.date, selectedDate);
          const isToday = isSameDay(c.date, startOfDay(new Date()));
          const dot = hasEvents(c.date);

          return (
            <button
              key={c.date.toISOString()}
              type="button"
              onClick={() => onSelectDate(c.date)}
              className={cn(
                "relative min-h-[88px] bg-white/0 p-3 text-left transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                "hover:bg-white/5"
              )}
              aria-label={`Select ${c.date.toDateString()}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-lg text-xs font-semibold",
                    c.inMonth ? "text-white/80" : "text-white/35",
                    isSelected ? "bg-blue-500/70 text-white shadow-glass" : ""
                  )}
                >
                  {c.date.getDate()}
                </div>

                {isToday ? (
                  <div className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">
                    Today
                  </div>
                ) : null}
              </div>

              {dot ? (
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
                  <span className="text-[11px] text-white/60">Events</span>
                </div>
              ) : (
                <div className="mt-4 text-[11px] text-white/35"> </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}


