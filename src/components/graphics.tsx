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
  const rows: [string, string][] = [
    ["COMPANY", "FREESKILLS ENGINEERING (M) SDN BHD"],
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

/* ------------------------------------------------------------------ */
/*  Locality schematic — hand-drawn SVG, not an embedded map            */
/* ------------------------------------------------------------------ */
export function LocalitySchematic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 400"
      className={className}
      role="img"
      aria-label="Schematic location diagram of the Freeskills Engineering workshop in Menglembu, Ipoh"
    >
      <defs>
        <pattern id="fsGrid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0 H0 V26" fill="none" stroke="#22262a" strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
        <marker id="fsArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#22262a" fillOpacity="0.55" />
        </marker>
      </defs>

      <rect width="640" height="400" fill="#ede9e1" />
      <rect width="640" height="400" fill="url(#fsGrid)" />

      {/* Bukit Kledang ridge — contour hatching */}
      <g stroke="#7c847f" strokeWidth="1.1" fill="none" opacity="0.6">
        <path d="M20 300 C60 250 90 220 120 232 C150 244 168 286 150 318" />
        <path d="M42 316 C74 276 96 254 120 262 C142 270 154 300 142 326" />
        <path d="M64 330 C88 302 104 288 120 292 C136 298 142 316 136 334" />
      </g>
      <text x="34" y="366" className="label" fill="#22262a" fillOpacity="0.55" fontSize="11" letterSpacing="2.2">
        BUKIT KLEDANG
      </text>

      {/* expressway */}
      <path
        d="M-10 66 C120 88 210 60 300 24"
        stroke="#22262a"
        strokeOpacity="0.35"
        strokeWidth="7"
        fill="none"
      />
      <text x="120" y="42" className="label" fill="#22262a" fillOpacity="0.5" fontSize="11" letterSpacing="2.2">
        NORTH–SOUTH EXPRESSWAY (E1)
      </text>

      {/* main road */}
      <path d="M0 176 H640" stroke="#22262a" strokeOpacity="0.55" strokeWidth="9" fill="none" />
      <path d="M0 176 H640" stroke="#ede9e1" strokeWidth="1.4" strokeDasharray="14 12" fill="none" />
      <text x="18" y="164" className="label" fill="#22262a" fillOpacity="0.7" fontSize="11" letterSpacing="2.2">
        JALAN MENGLEMBU
      </text>

      {/* industrial estate grid */}
      <g transform="rotate(-9 380 280)">
        <g stroke="#22262a" strokeOpacity="0.32" strokeWidth="4" fill="none">
          <path d="M210 232 H620" />
          <path d="M210 288 H620" />
          <path d="M210 344 H620" />
        </g>
        <text x="216" y="226" className="label" fill="#22262a" fillOpacity="0.72" fontSize="12" letterSpacing="2.6">
          HALA PERUSAHAAN KLEDANG UTARA 6
        </text>
        <text x="216" y="282" className="label" fill="#22262a" fillOpacity="0.4" fontSize="11" letterSpacing="2.2">
          HALA PERUSAHAAN KLEDANG UTARA 4
        </text>
      </g>

      {/* workshop pin */}
      <g>
        <line x1="352" y1="252" x2="352" y2="176" stroke="#c4441f" strokeWidth="2" strokeDasharray="5 5" />
        <rect x="316" y="238" width="72" height="30" fill="#c4441f" />
        <rect x="322" y="244" width="60" height="18" fill="none" stroke="#ede9e1" strokeWidth="1" strokeOpacity="0.6" />
        <text x="352" y="257" textAnchor="middle" fill="#ede9e1" fontSize="11" letterSpacing="2" fontFamily="IBM Plex Mono, monospace">
          LOT 01/02
        </text>
        <circle cx="352" cy="222" r="5.5" fill="#c4441f" />
        <circle cx="352" cy="222" r="11" fill="none" stroke="#c4441f" strokeWidth="1.2" strokeOpacity="0.5" />
      </g>

      {/* direction arrows */}
      <g stroke="#22262a" strokeOpacity="0.55" strokeWidth="2" fill="none">
        <line x1="500" y1="140" x2="612" y2="140" markerEnd="url(#fsArrow)" />
        <line x1="120" y1="140" x2="30" y2="140" markerEnd="url(#fsArrow)" />
      </g>
      <text x="500" y="128" className="label" fill="#22262a" fillOpacity="0.6" fontSize="11" letterSpacing="2.2">
        IPOH CITY 8 KM
      </text>
      <text x="30" y="128" className="label" fill="#22262a" fillOpacity="0.6" fontSize="11" letterSpacing="2.2">
        SIMPANG PULAI
      </text>

      {/* compass */}
      <g transform="translate(596 352)">
        <circle r="22" fill="none" stroke="#22262a" strokeOpacity="0.35" strokeWidth="1.2" />
        <path d="M0 -16 L6 8 L0 2 L-6 8 Z" fill="#22262a" fillOpacity="0.75" />
        <text y="-24" textAnchor="middle" fill="#22262a" fillOpacity="0.6" fontSize="11" letterSpacing="1.6" fontFamily="IBM Plex Mono, monospace">
          N
        </text>
      </g>
    </svg>
  );
}
