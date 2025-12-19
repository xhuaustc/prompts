export type CalendarView = "day" | "week" | "month";

export type CalendarSource = {
  id: string;
  name: string;
  colorClass: string;
};

export type CalendarEvent = {
  id: string;
  calendarId: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  attendees?: string[];
  description?: string;
  colorClass: string;
};


