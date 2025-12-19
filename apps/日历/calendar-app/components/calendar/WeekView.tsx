"use client";

import type { CalendarEvent } from "@/lib/types";
import {
  formatMonthDay,
  formatShortDay,
  formatTime,
  isSameDay,
  minutesSinceStartOfDay,
  startOfDay
} from "@/lib/date";
import { cn } from "@/components/ui/cn";

const START_HOUR = 8;
const END_HOUR = 16;
const HOUR_HEIGHT = 72;

type WeekViewProps = {
  weekDays: Date[];
  events: CalendarEvent[];
  onEventClick: (e: CalendarEvent) => void;
};

export function WeekView({ weekDays, events, onEventClick }: WeekViewProps) {
  const hourCount = END_HOUR - START_HOUR;
  const totalHeight = hourCount * HOUR_HEIGHT;

  const hours = Array.from({ length: hourCount + 1 }, (_, i) => START_HOUR + i);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="grid grid-cols-[72px_1fr]">
        <div className="border-b border-white/10 p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/50">Time</div>
        </div>

        <div className="grid grid-cols-7 border-b border-white/10">
          {weekDays.map((d) => {
            const isToday = isSameDay(d, startOfDay(new Date()));
            return (
              <div key={d.toISOString()} className="px-3 py-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white/60">{formatShortDay(d)}</div>
                  <div
                    className={cn(
                      "text-xs font-semibold",
                      isToday ? "text-white" : "text-white/70"
                    )}
                  >
                    {formatMonthDay(d)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative border-r border-white/10 bg-white/0">
          <div style={{ height: totalHeight }} className="relative">
            {hours.map((h, idx) => (
              <div
                key={h}
                className={cn(
                  "absolute left-0 right-0 flex items-start justify-end pr-3",
                  idx === hours.length - 1 ? "" : "border-t border-white/10"
                )}
                style={{ top: idx * HOUR_HEIGHT }}
              >
                <div className="mt-1 text-[11px] font-semibold text-white/45">
                  {new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(
                    new Date(2024, 0, 1, h, 0)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7">
          {weekDays.map((day) => {
            const dayEvents = events.filter((e) => isSameDay(e.start, day));

            return (
              <div
                key={day.toISOString()}
                className="relative border-r border-white/10 last:border-r-0"
                style={{ height: totalHeight }}
              >
                {hours.map((_, idx) =>
                  idx === 0 ? null : (
                    <div
                      key={idx}
                      className="absolute left-0 right-0 border-t border-white/10"
                      style={{ top: idx * HOUR_HEIGHT }}
                    />
                  )
                )}

                {dayEvents.map((e) => {
                  const startMinutes = minutesSinceStartOfDay(e.start) - START_HOUR * 60;
                  const endMinutes = minutesSinceStartOfDay(e.end) - START_HOUR * 60;
                  const clampedStart = Math.max(0, startMinutes);
                  const clampedEnd = Math.min(hourCount * 60, endMinutes);
                  const duration = Math.max(10, clampedEnd - clampedStart);

                  const top = (clampedStart / 60) * HOUR_HEIGHT;
                  const height = Math.max(28, (duration / 60) * HOUR_HEIGHT);

                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => onEventClick(e)}
                      className={cn(
                        "absolute left-2 right-2 rounded-2xl border border-white/10 p-3 text-left shadow-glass transition",
                        "hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                        e.colorClass
                      )}
                      style={{ top, height }}
                      aria-label={`Open event ${e.title}`}
                      title={e.title}
                    >
                      <div className="text-xs font-semibold text-white/95 truncate">{e.title}</div>
                      <div className="mt-1 text-[11px] font-semibold text-white/80">
                        {formatTime(e.start)} – {formatTime(e.end)}
                      </div>
                      {e.location ? <div className="mt-1 text-[11px] text-white/70 truncate">{e.location}</div> : null}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-white/60">
        <div>Week view (08:00 – 16:00)</div>
        <div className="hidden sm:block">Click any event for details.</div>
      </div>
    </div>
  );
}


