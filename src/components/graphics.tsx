import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

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
export function Nameplate({
  onOpenOrgChart,
}: {
  onOpenOrgChart?: () => void;
}) {
  const rows: [string, ReactNode][] = [
    [
      "COMPANY",
      <>
        <span className="text-oxide-light">FREESKILLS</span> ENGINEERING (M) SDN BHD
      </>,
    ],
    ["REG. NO.", "1502941-H"],
    ["FAC. REG. NO.", "JKKP/PK/2026/265610"],
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
          ALTERATION · REPAIR · OVERHAUL · GENERAL FABRICATION · HYDROSTATIC TESTING · ON-SITE WELDING
        </p>

        {onOpenOrgChart && (
          <button
            type="button"
            onClick={onOpenOrgChart}
            aria-haspopup="dialog"
            className="group mt-5 flex w-full items-center justify-between gap-4 border border-white/25 bg-black/30 px-4 py-3.5 text-left transition-colors duration-200 hover:border-safety hover:bg-safety/10"
          >
            <span className="min-w-0">
              <span className="label block text-safety">Organisation chart</span>
              <span className="mt-1.5 block font-display text-[1.1rem] uppercase leading-tight tracking-[0.05em] text-bone transition-colors duration-200 group-hover:text-safety">
                Names · qualifications · experience
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/25 text-bone transition-colors duration-200 group-hover:border-safety group-hover:text-safety"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Organisation chart + technical personnel — opens from the plate     */
/* ------------------------------------------------------------------ */
type OrgPerson = {
  name: string;
  role: string;
  quals: string;
  years: string;
};

type OrgTier = {
  idx: string;
  title: string;
  people: OrgPerson[];
  cols: string;
  conn: string; /* visibility of the drop line + bar (single-row breakpoints) */
  highlight?: boolean;
};

const ORG_TIERS: OrgTier[] = [
  {
    idx: "01",
    title: "Leadership",
    cols: "mx-auto max-w-sm grid-cols-1",
    conn: "hidden",
    highlight: true,
    people: [
      {
        name: "Ahmad Nazwan Bin Mohd Sarbini",
        role: "Managing Director / Project Lead",
        quals: "Leads project and corporate operations · Chairman, Safety Committee",
        years: "—",
      },
    ],
  },
  {
    idx: "02",
    title: "Key roles",
    cols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    conn: "hidden lg:block",
    people: [
      {
        name: "Shahrul Azmi Bin Salim Shah",
        role: "QAQC & Engineering Manager",
        quals:
          "ASME Section VIII Div. 1 · Section IX welding · Section V NDE · Section II materials · appointed DOSH contact person",
        years: "25+ YRS",
      },
      {
        name: "Mohd Yusof Bin Abdul Rahman",
        role: "Construction Manager",
        quals:
          "Project coordination from inception to completion · fabrication, installation and site works",
        years: "10+ YRS",
      },
      {
        name: "Mohd Hafifi Bin Rahmat Ali",
        role: "Project Manager",
        quals:
          "Method statements and ITPs · fabrication and installation scheduling, monitoring and supervision",
        years: "10+ YRS",
      },
      {
        name: "Muhammad Tajhafizi Mohd Tajul Azmi",
        role: "OSH Coordinator",
        quals:
          "OSH and site safety operations · HIRARC, inductions and toolbox talks, ERP drills under OSHA 1994",
        years: "8+ YRS",
      },
    ],
  },
  {
    idx: "03",
    title: "Support",
    cols: "grid-cols-1 sm:grid-cols-2",
    conn: "hidden sm:block",
    people: [
      {
        name: "Nur Mastura Aida Bt Mohd Tajul Azmi",
        role: "Executive Secretary",
        quals: "Corporate and management support",
        years: "—",
      },
      {
        name: "Jayalaxmi A/P Sandirin",
        role: "Administrative Assistant",
        quals: "Office administration support",
        years: "—",
      },
    ],
  },
  {
    idx: "04",
    title: "Site & workshop staff",
    cols: "grid-cols-1 sm:grid-cols-2",
    conn: "hidden sm:block",
    people: [
      {
        name: "Muhammad Lugman Yahaya",
        role: "Project Supervisor",
        quals: "Site work supervision and crew coordination",
        years: "—",
      },
      {
        name: "Farikh Syahidan Mohd Rosly",
        role: "Project Supervisor",
        quals: "Site work supervision and crew coordination",
        years: "—",
      },
      {
        name: "Rizwan",
        role: "Fitter / AESP",
        quals: "Structural and plate fitting · AESP",
        years: "—",
      },
      {
        name: "Che Mohd Saidi Che Hassan",
        role: "Qualified Welder",
        quals:
          "Coded weld qualification · 6G pipe welding, all positions on pressure-containing components",
        years: "8+ YRS",
      },
    ],
  },
];

function YearsChip({ years }: { years: string }) {
  if (years === "—") {
    return <span className="font-mono text-[0.8rem] text-bone/40">—</span>;
  }
  return (
    <span className="label tnum inline-block border border-safety/45 px-2.5 py-1.5 text-safety">
      {years}
    </span>
  );
}

export function OrgChartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  /* lock scroll, close on Escape, focus the close button */
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="org-chart-backdrop"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-steel-900/90 p-3 backdrop-blur-sm sm:p-6"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            id="org-chart-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="org-chart-title"
className="plate grain relative flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-[3px] border border-white/15 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.9)]"
            initial={reduce ? undefined : { opacity: 0, y: 14, scale: 0.985 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* header — close button stays visible while the body scrolls */}
            <div className="flex shrink-0 items-start justify-between gap-5 border-b border-white/15 px-5 py-5 sm:px-8">
              <div className="min-w-0">
                <span className="label text-safety">Organisation chart · Rev. 0</span>
                <h2
                  id="org-chart-title"
                  className="display mt-2.5 text-[clamp(1.5rem,4vw,2.35rem)] text-bone"
                >
                  Organisation &amp; Technical Personnel
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close organisation chart"
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* body */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-8">
              {/* ---- chart ---- */}
              <div className="mt-1">
                {ORG_TIERS.map((tier) => {
                  const multi = tier.people.length > 1;
                  const showConn = multi && tier.conn !== "hidden";
                  return (
                    <div key={tier.idx} className="w-full">
                      <div className="flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-white/15 sm:w-12" aria-hidden="true" />
                        <span className="label text-bone/55">
                          {tier.idx} · {tier.title}
                        </span>
                        <span className="h-px w-8 bg-white/15 sm:w-12" aria-hidden="true" />
                      </div>

                      {showConn && (
                        <div className={`mb-5 ${tier.conn}`} aria-hidden="true">
                          <div className="mx-auto h-5 w-px bg-white/20" />
                          <div className="h-px w-full bg-white/20" />
                        </div>
                      )}

                      <div className={`grid gap-x-4 gap-y-8 ${tier.cols}`}>
                        {tier.people.map((p) => (
                          <div
                            key={p.name}
                            className={`relative border px-4 py-4 text-center ${
                              tier.highlight
                                ? "border-safety/50 bg-safety/[0.07]"
                                : "border-white/12 bg-steel-800/70"
                            }`}
                          >
                            {showConn && (
                              <span
                                className={`absolute -top-5 left-1/2 h-5 w-px -translate-x-1/2 bg-white/20 ${tier.conn}`}
                                aria-hidden="true"
                              />
                            )}
                            <div className="font-display text-[1.2rem] uppercase leading-tight tracking-[0.03em] text-bone lg:text-[1.3rem]">
                              {p.name}
                            </div>
                            <div className="mt-2 font-mono text-[0.85rem] uppercase leading-snug tracking-[0.12em] text-safety/90">
                              {p.role}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ---- personnel list ---- */}
              <div className="mt-10 border-t border-white/15 pt-7">
                <h3 className="display text-[clamp(1.3rem,3vw,1.75rem)] text-safety">
                  List of Technical Person
                </h3>

                {ORG_TIERS.flatMap((t) => t.people).map((p) => (
                  <div
                    key={p.name}
                    className="grid gap-x-4 gap-y-2 border-b border-white/[0.09] py-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.95fr)_minmax(0,1.9fr)_6rem] md:items-start"
                  >
                    <div className="font-display text-[1.2rem] uppercase leading-tight tracking-[0.03em] text-bone lg:text-[1.3rem]">
                      {p.name}
                    </div>
                    <div className="font-mono text-[0.85rem] uppercase leading-snug tracking-[0.1em] text-safety/90 md:pt-1.5">
                      {p.role}
                    </div>
                    <div className="text-[0.96rem] leading-[1.65] text-bone/75">{p.quals}</div>
                    <div className="md:justify-self-start md:pt-1 lg:justify-self-end">
                      <YearsChip years={p.years} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* footer */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-white/15 px-5 py-4 sm:px-8">
              <span className="label text-bone/45">Chart Rev. 0 · 19/07/2026</span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 font-display text-[1.1rem] uppercase leading-none tracking-[0.06em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
