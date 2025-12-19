"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

const DEFAULT_MESSAGE =
  "Try batching deep work blocks in the morning, then keep afternoons for meetings. Want me to propose a calmer weekly rhythm?";

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const message = useMemo(() => DEFAULT_MESSAGE, []);

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 3000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTyped("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(message.slice(0, i));
      if (i >= message.length) window.clearInterval(id);
    }, 38);
    return () => window.clearInterval(id);
  }, [open, message]);

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-5 z-40 w-[340px] max-w-[calc(100vw-40px)] animate-fade-up">
      <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-glass backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className={cn("grid h-9 w-9 place-items-center rounded-2xl bg-white/10 border border-white/10")}>
              <Sparkles className="h-4 w-4 text-white/80" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">AI Assistant</div>
              <div className="text-xs text-white/55">Typing…</div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 px-0"
            onClick={() => setOpen(false)}
            aria-label="Close assistant"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
          {typed}
          <span className="ml-0.5 inline-block h-4 w-[1px] translate-y-[2px] bg-white/50 align-middle animate-pulse" />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Not now
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Sounds good
          </Button>
        </div>
      </div>
    </div>
  );
}


