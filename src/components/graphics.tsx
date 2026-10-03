import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Company mark — hexagonal bolt-plate around an F/E stem glyph        */
/*  Drawn by hand. Single colour (currentColor), legible at 16px.       */
/* ------------------------------------------------------------------ */
export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Freeskills Engineering mark"
      fill="none"
    >
      {/* hexagonal plate / nut head */}
      <path
        d="M24 1.6 L43.4 12.8 V35.2 L24 46.4 L4.6 35.2 V12.8 Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* inner rule */}
      <path
        d="M24 6.2 L39.4 15.1 V32.9 L24 41.8 L8.6 32.9 V15.1 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
        opacity="0.45"
      />
      {/* F / E stem glyph — long top arm (F), centre + base arms (E) */}
      <path
        d="M14.6 12.4 H33.4 V17.9 H20.6 V21.1 H29.4 V26.6 H20.6 V35.6 H14.6 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal — slides a short distance and stops hard. No bounce.         */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stamped micro-label with 2-digit index in safety yellow             */
/* ------------------------------------------------------------------ */
export function StampedLabel({
  index,
  children,
  tone = "steel",
}: {
  index?: string;
  children: ReactNode;
  tone?: "steel" | "paper";
}) {
  return (
    <div className="flex items-center gap-3">
      {index && (
        <span className="label tnum text-safety">{index}</span>
      )}
      <span className="h-px w-8 bg-current opacity-30" aria-hidden="true" />
      <span className={`label ${tone === "paper" ? "text-ink/70" : "text-bone/70"}`}>
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Riveted brushed-steel data plate — the memorable moment             */
/* ------------------------------------------------------------------ */
export function Nameplate() {
  const rows: [string, ReactNode][] = [
    [
      "COMPANY",
      <>
        <span className="text-oxide-light">FREESKILLS</span> ENGINEERING (M) SDN BHD
      </>,
    ],
    ["REG. NO.", "1502941-H"],
    ["CLASS", "BOILER & PRESSURE VESSEL REPAIRER"],
    ["WORKS", "LOT 01 & 02, HALA PERUSAHAAN KLEDANG UTARA 6"],
    ["DISTRICT", "MENGLEMBU 31450 · IPOH · PERAK"],
  ];
  return (
    <div className="plate grain relative w-full max-w-[30rem] overflow-hidden rounded-[3px] border border-white/10 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.85)]">
      {/* rivets */}
      <span className="rivet absolute left-3 top-3 h-2.5 w-2.5 rounded-full" />
      <span className="rivet absolute right-3 top-3 h-2.5 w-2.5 rounded-full" />
      <span className="rivet absolute left-3 bottom-3 h-2.5 w-2.5 rounded-full" />
      <span className="rivet absolute right-3 bottom-3 h-2.5 w-2.5 rounded-full" />

      <div className="px-6 py-6 sm:px-8">
        <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3">
          <span className="label text-safety">DATA PLATE</span>
          <span className="label tnum text-bone/50">NO. 01 / 01</span>
        </div>
        <dl className="mt-4 space-y-2.5">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[5.6rem_1fr] gap-3 border-b border-white/[0.07] pb-2">
              <dt className="label text-bone/45">{k}</dt>
              <dd className="font-mono text-[0.72rem] leading-[1.45] tracking-[0.06em] text-bone">
                {v}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 font-mono text-[0.62rem] leading-relaxed tracking-[0.14em] text-bone/45">
          REPAIR · OVERHAUL · FABRICATION · HYDROSTATIC TESTING · ON-SITE WELDING
        </p>
      </div>
    </div>
  );
}
