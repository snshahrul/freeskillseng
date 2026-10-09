import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Role = "user" | "assistant";

interface Msg {
  id: number;
  role: Role;
  content: string;
}

const GREETING =
  "Hello — ask me about Freeskills Engineering: what we repair, the workshop and equipment, quality and safety, or how to get a written quote.";

const SUGGESTIONS: [string, string][] = [
  ["What do you repair?", "What kinds of equipment do you repair?"],
  ["On-site shutdown crews?", "Do you send crews for on-site shutdown and breakdown work?"],
  ["How do I get a quote?", "How do I get a written quote?"],
  ["Where is the workshop?", "Where is your workshop and what are your opening hours?"],
];

let counter = 0;
const nextId = () => ++counter;

/* ---------------- minimal inline markdown (bold + links) ---------------- */
function renderInline(text: string, onInternalLink: () => void): React.ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]*\))/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const plain = (chunk: string) =>
    chunk.split("\n").map((line, i) => (
      <Fragment key={i}>
        {i > 0 && <br />}
        {line}
      </Fragment>
    ));

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(plain(text.slice(last, match.index)));
    const token = match[0];

    if (token.startsWith("**")) {
      nodes.push(<strong key={key++} className="font-semibold text-bone">{token.slice(2, -2)}</strong>);
    } else {
      const split = token.indexOf("](");
      const label = token.slice(1, split);
      const href = token.slice(split + 2, -1).trim().replace(/^["']|["']$/g, "");
      const internal = href.startsWith("#");
      nodes.push(
        <a
          key={key++}
          href={href}
          onClick={internal ? onInternalLink : undefined}
          target={internal ? undefined : "_blank"}
          rel={internal ? undefined : "noreferrer"}
          className="text-safety underline decoration-safety/40 underline-offset-2 transition-colors duration-150 hover:decoration-safety"
        >
          {label}
        </a>,
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(plain(text.slice(last)));
  return nodes;
}

function renderContent(content: string, onInternalLink: () => void) {
  return content.split(/\n{2,}/).map((para, i) => (
    <p key={i} className={i > 0 ? "mt-3" : undefined}>
      {renderInline(para, onInternalLink)}
    </p>
  ));
}

export function Assistant() {
  const [open, setOpenState] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ id: nextId(), role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reduce = useReducedMotion();
  const panelInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  /* focus the field when the panel opens, hand focus back when it closes */
  useEffect(() => {
    if (open) panelInputRef.current?.focus();
    else launcherRef.current?.focus();
  }, [open]);

  /* Escape closes */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenState(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* keep the transcript pinned to the newest message */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;

    setError(null);
    const next: Msg[] = [...messages, { id: nextId(), role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await res.json().catch(() => null)) as { reply?: string; error?: string } | null;

      if (!res.ok) {
        if (res.status === 404 && import.meta.env.DEV) {
          throw new Error("No /api/chat in plain `vite dev` — run `vercel dev` to test the assistant locally.");
        }
        throw new Error(data?.error || "The assistant is unavailable right now. Please call +60 16 410 0464.");
      }

      if (!data?.reply) throw new Error("Empty response. Please try again.");

      setMessages((prev) => [...prev, { id: nextId(), role: "assistant", content: data.reply as string }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please call +60 16 410 0464.");
    } finally {
      setBusy(false);
      panelInputRef.current?.focus();
    }
  };

  const reset = () => {
    setMessages([{ id: nextId(), role: "assistant", content: GREETING }]);
    setError(null);
    panelInputRef.current?.focus();
  };

  return (
    <>
      {/* ---------------- launcher ---------------- */}
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpenState(true)}
          aria-haspopup="dialog"
          aria-label="Ask the Freeskills assistant"
          className="plate grain group fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center border border-white/20 text-bone shadow-[0_22px_45px_-18px_rgba(0,0,0,0.95)] transition-colors duration-200 hover:border-safety hover:text-safety sm:bottom-6 sm:right-6"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-4.6A8 8 0 0 1 3 12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z" />
            <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
          </svg>
          <span
            aria-hidden="true"
            className="absolute -right-1 -top-1 h-3 w-3 rounded-full border border-steel-900 bg-safety"
          />
        </button>
      )}

      {/* ---------------- panel ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="assistant-panel"
            role="dialog"
            aria-label="Freeskills assistant"
            className="plate grain fixed inset-x-3 bottom-3 z-[60] flex h-[min(34rem,calc(100dvh-5rem))] flex-col overflow-hidden border border-white/15 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.95)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[25rem]"
            initial={reduce ? undefined : { opacity: 0, y: 18, scale: 0.985 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* header */}
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/15 px-4 py-3.5 sm:px-5">
              <div className="min-w-0">
                <span className="label flex items-center gap-2 text-safety">
                  <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-safety" />
                  Freeskills · Assistant
                </span>
                <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bone/50">
                  AI answers · verify by phone
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={reset}
                  title="Start a new conversation"
                  aria-label="Start a new conversation"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-bone/60 transition-colors duration-200 hover:border-safety hover:text-safety"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 11a8 8 0 1 0-2.3 6.3" />
                    <path d="M20 5v6h-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setOpenState(false)}
                  aria-label="Close assistant"
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-bone/60 transition-colors duration-200 hover:border-safety hover:text-safety"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* transcript */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5"
            >
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : undefined}>
                  {m.role === "user" ? (
                    <p className="max-w-[85%] border border-oxide/40 bg-oxide/15 px-3.5 py-2.5 text-[0.94rem] leading-relaxed text-bone">
                      {m.content}
                    </p>
                  ) : (
                    <div className="max-w-[95%]">
                      <span className="label mb-1.5 block text-bone/40">Assistant</span>
                      <div className="border-l-2 border-safety/50 pl-3.5 text-[0.96rem] leading-[1.7] text-bone/85">
                        {renderContent(m.content, () => setOpenState(false))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {busy && (
                <div className="flex items-center gap-1.5 border-l-2 border-safety/50 pl-3.5" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-safety/70 motion-safe:animate-bounce"
                      style={{ animationDelay: `${i * 120}ms`, animationDuration: "1.1s" }}
                    />
                  ))}
                </div>
              )}

              {/* suggested questions, only before the first question */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map(([label, prompt]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => void send(prompt)}
                      disabled={busy}
                      className="border border-white/15 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-bone/70 transition-colors duration-200 hover:border-safety hover:text-safety disabled:opacity-50"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {error && (
                <p role="alert" className="border border-safety/40 bg-safety/10 px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-safety">
                  {error}
                </p>
              )}
            </div>

            {/* composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex shrink-0 items-end gap-2 border-t border-white/15 px-3 py-3 sm:px-4"
            >
              <input
                ref={panelInputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about repairs, quality, safety…"
                aria-label="Message the Freeskills assistant"
                maxLength={2000}
                className="min-w-0 flex-1 border border-white/15 bg-steel-900/70 px-3.5 py-3 text-[0.95rem] text-bone placeholder:text-bone/35 focus:border-safety/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || input.trim().length === 0}
                aria-label="Send message"
                className="flex h-[2.9rem] w-[2.9rem] shrink-0 items-center justify-center bg-oxide text-paper transition-colors duration-200 hover:bg-oxide-light disabled:cursor-not-allowed disabled:opacity-45"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12l16-8-6 8 6 8-16-8z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
