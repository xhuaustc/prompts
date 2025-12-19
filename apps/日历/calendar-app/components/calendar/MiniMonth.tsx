"use client";

import { cn } from "@/components/ui/cn";
import { formatShortDay, getMonthGrid, isSameDay, startOfDay } from "@/lib/date";

type MiniMonthProps = {
  monthAnchor: Date;
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
};

export function MiniMonth({ monthAnchor, selectedDate, onSelectDate }: MiniMonthProps) {
  const cells = getMonthGrid(monthAnchor, 1);
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 1 + i));

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {weekdays.map((d) => (
          <div key={d.toISOString()} className="text-center text-[10px] font-semibold text-white/45">
            {formatShortDay(d)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((c) => {
          const day = c.date.getDate();
          const isSelected = isSameDay(c.date, selectedDate);
          const isToday = isSameDay(c.date, startOfDay(new Date()));
          return (
            <button
              key={c.date.toISOString()}
              type="button"
              onClick={() => onSelectDate(c.date)}
              className={cn(
                "h-8 rounded-lg text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                c.inMonth ? "text-white/80" : "text-white/35",
                isSelected ? "bg-blue-500/70 text-white shadow-glass" : "hover:bg-white/10",
                isToday && !isSelected ? "ring-1 ring-white/20" : ""
              )}
              aria-label={`Select ${c.date.toDateString()}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}


