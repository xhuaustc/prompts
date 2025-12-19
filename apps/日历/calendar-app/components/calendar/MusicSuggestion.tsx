"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

export function MusicSuggestion() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);

  const track = useMemo(
    () => ({
      title: "Hans Zimmer — Focus Suggestion",
      subtitle: "Try a calm, steady motif for deep work."
    }),
    []
  );

  useEffect(() => {
    if (!visible) setPlaying(false);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[360px] max-w-[calc(100vw-40px)] animate-fade-up">
      <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-glass backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={cn("grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10")}>
              <Volume2 className="h-4 w-4 text-white/80" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white/90 truncate">{track.title}</div>
              <div className="mt-1 text-xs text-white/60">{track.subtitle}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="text-xs font-semibold text-white/50 hover:text-white/80 transition"
            aria-label="Hide music suggestion"
          >
            Hide
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-white/55">{playing ? "Playing (simulated)" : "Paused"}</div>
          <Button variant="primary" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Pause" : "Play"}
          </Button>
        </div>
      </div>
    </div>
  );
}


