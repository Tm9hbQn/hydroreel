"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SearchItem {
  lesson_id: string;
  lesson_title: string;
  bite_title: string;
  bite_id: string;
  sequence_title: string;
  category_title: string;
  category_icon: string;
}

export interface SpotlightSearchProps {
  searchIndex: SearchItem[];
  onSelect: (lessonId: string) => void;
  placeholder?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Fuzzy match algorithm (subsequence matching) */
function fuzzyMatch(query: string, text: string): boolean {
  if (!query) return true;
  if (!text) return false;
  
  const q = query.replace(/\s+/g, "").toLowerCase();
  const t = text.replace(/\s+/g, "").toLowerCase();
  
  if (t.includes(q)) return true;
  
  // Subsequence match (e.g. 'grr' matches 'G r e a t r o l l')
  let qIdx = 0;
  for (let i = 0; i < t.length && qIdx < q.length; i++) {
    if (t[i] === q[qIdx]) qIdx++;
  }
  return qIdx === q.length;
}

/** 
 * Simplistic highlighter: since fuzzy match can match non-contiguous chars,
 * highlighting exactly is complex. We'll highlight exact word matches if they exist,
 * or just return the text if it was a fuzzy match without exact substring.
 */
function HighlightedText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  if (parts.length === 1) {
    // No exact match, but passed fuzzy filter. Just render text.
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <mark
            key={i}
            className="bg-blue-400/30 text-blue-900 rounded-sm px-[2px]"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Max visible results                                                */
/* ------------------------------------------------------------------ */

const MAX_RESULTS = 8;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SpotlightSearch({
  searchIndex,
  onSelect,
  placeholder = "חפש שיעור, תרגיל או נושא…",
}: SpotlightSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ---- Filtered results ---- */
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.trim();

    return searchIndex
      .filter(
        (item) =>
          fuzzyMatch(q, item.bite_title) ||
          fuzzyMatch(q, item.lesson_title) ||
          fuzzyMatch(q, item.sequence_title) ||
          fuzzyMatch(q, item.category_title)
      )
      .slice(0, MAX_RESULTS);
  }, [query, searchIndex]);

  /* ---- Open / Close handlers ---- */
  const open = useCallback(() => {
    setIsOpen(true);
    // Let the animation start, then focus
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    inputRef.current?.blur();
  }, []);

  /* ---- Click-outside ---- */
  useEffect(() => {
    if (!isOpen) return;

    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, close]);

  /* ---- Escape key ---- */
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  /* ---- Select a result ---- */
  const handleSelect = useCallback(
    (lessonId: string) => {
      onSelect(lessonId);
      close();
    },
    [onSelect, close],
  );

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <>
      {/* ======== Resting search bar (inline, not open) ======== */}
      {!isOpen && (
        <motion.button
          type="button"
          onClick={open}
          dir="rtl"
          layoutId="spotlight-bar"
          className="
            w-full h-14 rounded-2xl
            flex items-center gap-3 px-5
            bg-white/90 backdrop-blur-sm
            border border-slate-200
            shadow-[0_2px_16px_rgba(0,0,0,0.06)]
            cursor-text select-none
            transition-shadow hover:shadow-[0_4px_24px_rgba(59,130,246,0.12)]
          "
        >
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <span className="text-slate-400 text-base font-medium truncate">
            {placeholder}
          </span>
        </motion.button>
      )}

      {/* ======== Spotlight overlay (open state) ======== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* --- Dark glassmorphism backdrop --- */}
            <motion.div
              key="spotlight-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="
                fixed inset-0 z-[998]
                bg-black/40 backdrop-blur-md
              "
              aria-hidden="true"
            />

            {/* --- Floating search container --- */}
            <motion.div
              key="spotlight-container"
              ref={containerRef}
              dir="rtl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
              className="
                fixed top-0 left-0 right-0 z-[999]
                flex flex-col
                px-4 pt-[max(env(safe-area-inset-top),12px)]
              "
            >
              {/* -- Input row -- */}
              <div
                className="
                  relative w-full h-14 rounded-2xl
                  bg-white shadow-[0_8px_40px_rgba(0,0,0,0.18)]
                  ring-2 ring-blue-400/60
                  flex items-center overflow-hidden
                "
              >
                {/* Gradient border glow (focus indicator) */}
                <div
                  className="
                    pointer-events-none absolute inset-0 rounded-2xl
                    bg-gradient-to-l from-blue-500/20 via-cyan-400/10 to-transparent
                  "
                  aria-hidden="true"
                />

                <Search className="w-5 h-5 text-blue-500 shrink-0 mr-4 relative z-10" />

                <input
                  ref={inputRef}
                  type="text"
                  dir="rtl"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  autoComplete="off"
                  className="
                    flex-1 h-full bg-transparent
                    text-slate-900 text-base font-medium
                    placeholder:text-slate-400
                    outline-none border-none
                    relative z-10
                    pr-1
                  "
                />

                {/* Clear / close button */}
                <button
                  type="button"
                  onClick={close}
                  className="
                    w-9 h-9 rounded-xl ml-2
                    flex items-center justify-center
                    bg-slate-100 hover:bg-slate-200
                    transition-colors relative z-10
                  "
                  aria-label="סגור חיפוש"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* -- Results list -- */}
              <AnimatePresence mode="wait">
                {results.length > 0 && (
                  <motion.ul
                    key="results-list"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="
                      mt-3 w-full rounded-2xl overflow-hidden
                      bg-white/95 backdrop-blur-lg
                      shadow-[0_12px_48px_rgba(0,0,0,0.14)]
                      border border-white/60
                      divide-y divide-slate-100
                      max-h-[60dvh] overflow-y-auto
                      overscroll-contain
                    "
                  >
                    {results.map((item, idx) => (
                      <motion.li
                        key={`${item.lesson_id}-${item.bite_id}`}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03, duration: 0.2 }}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelect(item.lesson_id)}
                          className="
                            w-full flex items-start gap-3 px-4 py-3
                            text-right
                            hover:bg-blue-50/60 active:bg-blue-100/50
                            transition-colors
                          "
                        >
                          {/* Category icon */}
                          <span
                            className="
                              text-xl mt-0.5 shrink-0
                              w-9 h-9 rounded-xl
                              bg-gradient-to-br from-blue-50 to-cyan-50
                              flex items-center justify-center
                              shadow-sm
                            "
                            aria-hidden="true"
                          >
                            {item.category_icon}
                          </span>

                          {/* Text content */}
                          <div className="flex flex-col min-w-0">
                            {/* Bite title is now the primary big text */}
                            <span className="text-sm font-bold text-slate-900 leading-snug truncate">
                              <HighlightedText
                                text={item.bite_title || "ללא כותרת"}
                                query={query}
                              />
                            </span>

                            {/* Lesson title is the secondary smaller text */}
                            <span className="text-xs text-slate-500 leading-snug truncate mt-0.5">
                              נושא ראשי: <HighlightedText
                                text={item.lesson_title}
                                query={query}
                              />
                            </span>

                            <span className="text-[11px] text-slate-400 leading-snug truncate mt-0.5">
                              {item.category_title}
                              {" · "}
                              {item.sequence_title}
                            </span>
                          </div>
                        </button>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {/* Empty state when typing but no matches */}
                {query.trim().length > 0 && results.length === 0 && (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="
                      mt-3 w-full rounded-2xl
                      bg-white/95 backdrop-blur-lg
                      shadow-[0_12px_48px_rgba(0,0,0,0.14)]
                      border border-white/60
                      flex flex-col items-center justify-center
                      py-10 px-6
                    "
                  >
                    <Search className="w-8 h-8 text-slate-300 mb-3" />
                    <p className="text-slate-400 text-sm font-medium text-center">
                      לא נמצאו תוצאות עבור &ldquo;{query}&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
