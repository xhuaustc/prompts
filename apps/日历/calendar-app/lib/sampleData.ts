import type { CalendarEvent, CalendarSource } from "@/lib/types";

function at(date: Date, hour: number, minute: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0);
}

export const CALENDARS: CalendarSource[] = [
  { id: "work", name: "Work", colorClass: "bg-sky-400" },
  { id: "personal", name: "Personal", colorClass: "bg-fuchsia-400" },
  { id: "focus", name: "Focus", colorClass: "bg-emerald-400" }
];

export function createSampleEvents(weekAnchor: Date): CalendarEvent[] {
  const base = new Date(weekAnchor);
  const days = Array.from({ length: 7 }, (_, i) => new Date(base.getTime() + i * 24 * 60 * 60 * 1000));

  return [
    {
      id: "e1",
      calendarId: "work",
      title: "Team Meeting",
      start: at(days[1]!, 9, 0),
      end: at(days[1]!, 10, 0),
      location: "Summit Room",
      attendees: ["Ava", "Noah", "Mia"],
      description: "Weekly alignment on priorities and blockers.",
      colorClass: "bg-sky-500/80"
    },
    {
      id: "e2",
      calendarId: "work",
      title: "Client Call",
      start: at(days[3]!, 11, 0),
      end: at(days[3]!, 11, 45),
      location: "Zoom",
      attendees: ["You", "Client Team"],
      description: "Project checkpoint and next steps.",
      colorClass: "bg-violet-500/80"
    },
    {
      id: "e3",
      calendarId: "personal",
      title: "Lunch Date",
      start: at(days[2]!, 12, 0),
      end: at(days[2]!, 13, 0),
      location: "Cafe Lumen",
      attendees: ["You", "Sam"],
      description: "A calm break and good food.",
      colorClass: "bg-amber-500/80"
    },
    {
      id: "e4",
      calendarId: "focus",
      title: "Deep Work",
      start: at(days[4]!, 8, 30),
      end: at(days[4]!, 10, 30),
      location: "Studio",
      attendees: ["You"],
      description: "No notifications. Ship something meaningful.",
      colorClass: "bg-emerald-500/80"
    },
    {
      id: "e5",
      calendarId: "work",
      title: "Design Review",
      start: at(days[0]!, 14, 0),
      end: at(days[0]!, 15, 0),
      location: "Glassboard",
      attendees: ["Design", "Engineering"],
      description: "Review weekly UI updates and feedback.",
      colorClass: "bg-pink-500/80"
    }
  ];
}


