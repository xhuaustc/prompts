"use client";

import { useEffect } from "react";
import { MapPin, Users, X } from "lucide-react";

import type { CalendarEvent, CalendarSource } from "@/lib/types";
import { formatTime } from "@/lib/date";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

type EventModalProps = {
  event: CalendarEvent | null;
  calendars: CalendarSource[];
  onClose: () => void;
};

export function EventModal({ event, calendars, onClose }: EventModalProps) {
  useEffect(() => {
    if (!event) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [event, onClose]);

  if (!event) return null;

  const cal = calendars.find((c) => c.id === event.calendarId);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg animate-scale-in rounded-3xl border border-white/10 bg-white/10 p-5 shadow-glass backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={cn("h-2.5 w-2.5 rounded-full", cal?.colorClass ?? "bg-white/50")} />
              <div className="text-xs font-semibold text-white/60">{cal?.name ?? "Calendar"}</div>
            </div>
            <div className="mt-2 text-lg font-semibold text-white/95">{event.title}</div>
            <div className="mt-1 text-sm text-white/70">
              {formatTime(event.start)} – {formatTime(event.end)}
            </div>
          </div>

          <Button variant="ghost" size="sm" className="h-9 w-9 px-0" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          {event.location ? (
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <MapPin className="h-4 w-4 text-white/60" />
              <div className="text-sm text-white/80">{event.location}</div>
            </div>
          ) : null}

          {event.attendees?.length ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-white/60" />
                <div className="text-sm font-semibold text-white/80">Attendees</div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {event.attendees.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/75"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {event.description ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/75">
              {event.description}
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}


