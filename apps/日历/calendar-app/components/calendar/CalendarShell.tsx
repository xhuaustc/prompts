"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Bell, Settings2, Sparkles } from "lucide-react";

import type { CalendarEvent, CalendarSource, CalendarView } from "@/lib/types";
import { CALENDARS, createSampleEvents } from "@/lib/sampleData";
import {
  addDays,
  addMonths,
  clampDateToMonth,
  formatDayTitle,
  formatMonthTitle,
  formatRange,
  getWeekDays,
  startOfDay,
  startOfWeek
} from "@/lib/date";
import { HeaderBar } from "@/components/calendar/HeaderBar";
import { Sidebar } from "@/components/calendar/Sidebar";
import { CalendarToolbar } from "@/components/calendar/CalendarToolbar";
import { WeekView } from "@/components/calendar/WeekView";
import { DayView } from "@/components/calendar/DayView";
import { MonthView } from "@/components/calendar/MonthView";
import { EventModal } from "@/components/calendar/EventModal";
import { AIAssistant } from "@/components/calendar/AIAssistant";
import { MusicSuggestion } from "@/components/calendar/MusicSuggestion";

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80";

function createInitialVisibility(calendars: CalendarSource[]) {
  return Object.fromEntries(calendars.map((c) => [c.id, true])) as Record<string, boolean>;
}

export function CalendarShell() {
  const [view, setView] = useState<CalendarView>("week");
  const [selectedDate, setSelectedDate] = useState<Date>(() => startOfDay(new Date()));
  const [monthAnchor, setMonthAnchor] = useState<Date>(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<Record<string, boolean>>(() =>
    createInitialVisibility(CALENDARS)
  );
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    setMonthAnchor(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate]);

  const weekStart = useMemo(() => startOfWeek(selectedDate, 1), [selectedDate]);
  const weekDays = useMemo(() => getWeekDays(selectedDate, 1), [selectedDate]);
  const events = useMemo(() => createSampleEvents(weekStart), [weekStart]);

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events.filter((e) => {
      if (!visibility[e.calendarId]) return false;
      if (!q) return true;
      const haystack = [
        e.title,
        e.location ?? "",
        ...(e.attendees ?? []),
        e.description ?? ""
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [events, search, visibility]);

  const headerRightIcons = [
    { icon: <Sparkles className="h-4 w-4" />, label: "AI", onClick: () => null },
    { icon: <Bell className="h-4 w-4" />, label: "Notifications", onClick: () => null },
    { icon: <Settings2 className="h-4 w-4" />, label: "Settings", onClick: () => null }
  ];

  const title =
    view === "month"
      ? formatMonthTitle(selectedDate)
      : view === "day"
        ? formatDayTitle(selectedDate)
        : formatRange(weekStart, addDays(weekStart, 6));

  function onToday() {
    setSelectedDate(startOfDay(new Date()));
  }

  function onPrev() {
    if (view === "week") setSelectedDate(addDays(selectedDate, -7));
    if (view === "day") setSelectedDate(addDays(selectedDate, -1));
    if (view === "month") {
      const nextMonth = addMonths(monthAnchor, -1);
      setSelectedDate((current) => clampDateToMonth(current, nextMonth));
      setMonthAnchor(nextMonth);
    }
  }

  function onNext() {
    if (view === "week") setSelectedDate(addDays(selectedDate, 7));
    if (view === "day") setSelectedDate(addDays(selectedDate, 1));
    if (view === "month") {
      const nextMonth = addMonths(monthAnchor, 1);
      setSelectedDate((current) => clampDateToMonth(current, nextMonth));
      setMonthAnchor(nextMonth);
    }
  }

  return (
    <div className="relative min-h-screen text-white">
      <Image
        src={BACKGROUND_IMAGE}
        alt="Mountain background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/70" />

      <div className="relative mx-auto flex min-h-screen max-w-[1400px] gap-5 px-5 py-6">
        <Sidebar
          monthAnchor={monthAnchor}
          onMonthAnchorChange={setMonthAnchor}
          selectedDate={selectedDate}
          onSelectDate={(d) => setSelectedDate(startOfDay(d))}
          calendars={CALENDARS}
          visibility={visibility}
          onToggleCalendar={(id) =>
            setVisibility((prev) => ({
              ...prev,
              [id]: !prev[id]
            }))
          }
        />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <HeaderBar
            title="Calendar"
            search={search}
            onSearchChange={setSearch}
            rightActions={headerRightIcons}
          />

          <div className="animate-fade-up rounded-3xl border border-white/10 bg-white/10 shadow-glass backdrop-blur-xl">
            <CalendarToolbar
              view={view}
              onViewChange={setView}
              title={title}
              onPrev={onPrev}
              onNext={onNext}
              onToday={onToday}
            />

            <div className="p-4 pt-2">
              {view === "week" && (
                <WeekView weekDays={weekDays} events={filteredEvents} onEventClick={setActiveEvent} />
              )}
              {view === "day" && (
                <DayView day={selectedDate} events={filteredEvents} onEventClick={setActiveEvent} />
              )}
              {view === "month" && (
                <MonthView
                  monthAnchor={monthAnchor}
                  selectedDate={selectedDate}
                  onSelectDate={(d) => setSelectedDate(startOfDay(d))}
                  events={filteredEvents}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <MusicSuggestion />
      <AIAssistant />

      <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} calendars={CALENDARS} />
    </div>
  );
}


