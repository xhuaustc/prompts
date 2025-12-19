const DAY_MS = 24 * 60 * 60 * 1000;

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function clampDateToMonth(date: Date, monthAnchor: Date): Date {
  const y = monthAnchor.getFullYear();
  const m = monthAnchor.getMonth();
  const last = new Date(y, m + 1, 0).getDate();
  const day = Math.min(date.getDate(), last);
  return new Date(y, m, day, date.getHours(), date.getMinutes(), 0, 0);
}

export function startOfWeek(date: Date, weekStartsOn: 0 | 1 = 1): Date {
  const d = startOfDay(date);
  const day = d.getDay(); // 0-6
  const diff = (day - weekStartsOn + 7) % 7;
  return addDays(d, -diff);
}

export function getWeekDays(anchorDate: Date, weekStartsOn: 0 | 1 = 1): Date[] {
  const start = startOfWeek(anchorDate, weekStartsOn);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function minutesSinceStartOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export function formatMonthTitle(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
  }).format(date);
}

export function formatDayTitle(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function formatShortDay(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

export function formatMonthDay(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export function formatRange(start: Date, end: Date): string {
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  const sameYear = start.getFullYear() === end.getFullYear();

  const startFmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" })
  }).format(start);

  const endFmt = new Intl.DateTimeFormat("en-US", {
    month: sameMonth ? undefined : "short",
    day: "numeric",
    year: "numeric"
  }).format(end);

  return `${startFmt} – ${endFmt}`;
}

export type MonthCell = {
  date: Date;
  inMonth: boolean;
};

export function getMonthGrid(monthAnchor: Date, weekStartsOn: 0 | 1 = 1): MonthCell[] {
  const year = monthAnchor.getFullYear();
  const month = monthAnchor.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const gridStart = startOfWeek(firstOfMonth, weekStartsOn);

  return Array.from({ length: 42 }, (_, i) => {
    const date = addDays(gridStart, i);
    return { date, inMonth: date.getMonth() === month };
  });
}


