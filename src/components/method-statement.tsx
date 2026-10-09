import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const DECK = "Pressure_Vessel_Shell_Repair_Guide.pptx";

const DECK_INTRO =
  "A sample method statement our team works from for shell repairs: it walks a plant team from deciding whether a patch is the right fix, through excavation, sizing, qualified welding and NDE, to hydrotest and Form R-1 sign-off — all anchored to ASME PCC-2, NBIC Part 3 and ASME BPVC Section IX.";

const SLIDES: { title: string; note: string }[] = [
  {
    title: "Pressure Vessel Shell Repair",
    note: "The cover slide sets the scope: a window patch or insert plate repair of a vessel shell, dimensioned by R-Value, T-PATCH, T-SHELL and W-DIM. Every rule that follows traces back to one of three documents — ASME PCC-2, NBIC Part 3 and ASME BPVC Section IX.",
  },
  {
    title: "Three Pillars of Compliant Repair",
    note: "Three code pillars hold up a compliant repair. Design and sizing per ASME PCC-2 Article 201 for butt-welded insert plates; legal and inspection per NBIC Part 3 (3.3.4.6) covering flush and window patches, jurisdictional sign-off and the R-Stamp framework; metallurgy and execution per ASME BPVC Sections IX and VIII for WPS, WPQ and baseline design rules. Miss one column and the repair is not code-compliant.",
  },
  {
    title: "Diagnostic Application Matrix",
    note: "When is a patch the right fix? Local wall thinning from erosion or corrosion, crack removal, and localised bulging in cylindrical, spherical and conical shells, plus tube windows with restricted access. It cannot be used for complete shell course or head replacement — or where the damage cannot be mapped fully into sound base metal. If you cannot map it to sound metal, do not patch it.",
  },
  {
    title: "Step-by-Step Repair Execution",
    note: "Execution starts with Step 1 Excavate — remove the defective material completely, with the cutout extending entirely into sound base metal. Step 2 Examine — cut edges are checked by surface NDE (MT/PT) to prove there are no laminations or remaining cracks before the patch goes in. Wall thickness, bevel angle and cutout width are recorded as fit-up variables. You cannot weld over a defect you have not proven is gone.",
  },
  {
    title: "Patch Design & Dimensions",
    note: "Three sizing rules set the patch. For non-PWHT carbon and low-alloy steel the minimum size is the lesser of 12t or 380 mm (15 in). The cutout must cover the whole damaged area plus any likely future damage, overlap sound base metal by at least 25 mm (1 in), and be big enough that every attachment weld lands on 100% sound material.",
  },
  {
    title: "Corner Radii & Stress",
    note: "Square corners are strictly prohibited on the cutout. The minimum corner radius must be at least three times the material thickness (R ≥ 3t), with a general minimum of 75 mm (3 in). Rounded corners stop severe stress concentrations building up at the corners during pressurisation and thermal cycling — exactly where a patch would otherwise crack in service.",
  },
  {
    title: "Clearance & Contoured Pads",
    note: "A standard insert plate (non-PWHT) must keep at least 150 mm (6 in) between the patch weld and the nearest nozzle attachment weld, so the heat-affected zones do not overlap. If the damage sits inside that 150 mm, there is one permitted exception: the patch becomes a 360-degree reinforcement pad right around the nozzle, attached with full-penetration joints. There is no third option.",
  },
  {
    title: "Forming & Metallurgical Matching",
    note: "The insert plate is rolled or pressed to match the original vessel curvature exactly, with a flush fit on the waterside mandatory. If cold forming drives extreme fibre elongation beyond 5%, post-weld heat treatment becomes mandatory. The plate must also match the shell's ASME P-Number, allowable stress, notch toughness and nominal thickness — a mismatched plate in a matched repair is a future failure point.",
  },
  {
    title: "Thickness Transitions & Fit-Up",
    note: "Three fit-up checks. Where the insert plate is thicker than the shell, the edge carries a machined taper of at least 3:1 so there is no abrupt step. Misalignment stays within the construction code's maximum offset limits with flush waterside alignment, and the root gap must be strictly uniform right around the patch perimeter.",
  },
  {
    title: "Welding Procedures & Joint Type",
    note: "Welding runs to a qualified WPS and PQR per ASME Section IX, with welders holding valid WPQ credentials — no paperwork, no weld. Joints are full-penetration butt welds, double-welded where accessible. Special case: patching a tube with restricted accessibility requires GTAW (TIG) for the initial root pass on the inside.",
  },
  {
    title: "PWHT Requirements & Alternatives",
    note: "Post-weld heat treatment applies when the original construction code or service conditions demand it (for example ASME VIII UCS-56), and always where cold forming took extreme fibre elongation beyond 5%. Where full PWHT would harm the vessel in service, temper bead welding per ASME IX QW-290 may be engineered to control heat-affected zone toughness.",
  },
  {
    title: "NDE: Surface & Volumetric",
    note: "Inspection runs in two layers. Surface NDE (MT/PT) is required on the root pass and on the finished weld surface to catch cracking and laminations. Volumetric NDE (RT/UT) is required for full-thickness welds — especially where the repair exceeds the maximum size of an unreinforced opening, or where the original construction code calls for it. The thicker the repair, the deeper the look.",
  },
  {
    title: "Hydrostatic Testing",
    note: "A hydrostatic test is generally required after a full-thickness shell repair. Test pressure must be at least 1.0 × MAOP, adjusted for the remaining corrosion allowance. Where hydrotesting is genuinely impossible, extensive NDE may be substituted only if the post-construction code allows it and the jurisdictional authority accepts it.",
  },
  {
    title: "Documentation, Stamping & AI Sign-Off",
    note: "The paperwork closes the job: NBIC Form R-1 records the defect removal method, materials and exact repair parameters, and the official R symbol is applied to the nameplate by the Certificate Holder. An Authorized Inspector reviews the repair plan, witnesses the hold points and accepts the final documentation before the vessel returns to service.",
  },
  {
    title: "Insert Plate Quick-Reference Checklist",
    note: "One table compresses the deck into four phases. Prep — excavate to 100% sound metal and MT/PT the edges (NBIC Part 3). Design — match P-Number, R ≥ 3t, 150 mm nozzle clearance (ASME PCC-2). Fit & weld — flush waterside, 3:1 taper, full-penetration weld with a GTAW root for tubes (ASME IX / PCC-2). Verify — volumetric NDE, hydrotest ≥ 1.0 × MAOP, Form R-1 (ASME VIII / NBIC Part 3).",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function MethodStatementButton() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const slide = SLIDES[index];
  const last = SLIDES.length - 1;

  useEffect(() => {
    if (open) closeRef.current?.focus();
    else launcherRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => Math.min(last, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, last]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(last, i + 1));

  /* keep the neighbouring slides warm so paging does not flash */
  useEffect(() => {
    for (const i of [index - 1, index + 1]) {
      if (i >= 0 && i <= last) new Image().src = `method-statement/slide-${pad(i + 1)}.jpg`;
    }
  }, [index, last]);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex items-center justify-center gap-3 border border-white/25 px-6 py-4 font-display text-[1.15rem] uppercase leading-none tracking-[0.06em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
      >
        Sample method statement
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 2.5h5l3 3v8H4z" />
          <path d="M9 2.5v3h3" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="method-statement-backdrop"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-steel-900/90 p-3 backdrop-blur-sm sm:p-6"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="method-statement-title"
              className="plate grain relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[3px] border border-white/15 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.9)]"
              initial={reduce ? undefined : { opacity: 0, y: 14, scale: 0.985 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* header */}
              <div className="flex shrink-0 items-start justify-between gap-5 border-b border-white/15 px-5 py-4 sm:px-7 sm:py-5">
                <div className="min-w-0">
                  <span className="label text-safety">Section 04 · Quality · Sample method statement</span>
                  <h2
                    id="method-statement-title"
                    className="display mt-2.5 text-[clamp(1.4rem,3.4vw,2.1rem)] text-bone"
                  >
                    Pressure Vessel Shell Repair
                  </h2>
                  <p className="mt-2 max-w-[70ch] text-[0.95rem] leading-[1.65] text-bone/70">
                    {DECK_INTRO}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close sample method statement"
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {/* body: slide + explanation at the side */}
              <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-y-auto lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:overflow-hidden">
                {/* slide */}
                <div className="flex min-w-0 flex-col border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                  <div className="relative aspect-video w-full min-w-0 border border-white/15 bg-steel-900">
                    <img
                      src={`method-statement/slide-${pad(index + 1)}.jpg`}
                      alt={`Slide ${index + 1}: ${slide.title}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                    <span className="label absolute left-3 top-3 bg-steel-900/85 px-2.5 py-1.5 text-safety">
                      Slide {pad(index + 1)} / {pad(SLIDES.length)}
                    </span>
                  </div>

                  {/* thumbnails */}
                  <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
                    {SLIDES.map((s, i) => (
                      <button
                        key={s.title}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}: ${s.title}`}
                        aria-current={i === index ? "true" : undefined}
                        className={`h-8 w-12 shrink-0 border text-[0.62rem] font-mono leading-none transition-colors duration-150 ${
                          i === index
                            ? "border-safety bg-safety/20 text-safety"
                            : "border-white/15 text-bone/50 hover:border-safety/60 hover:text-safety"
                        }`}
                      >
                        {pad(i + 1)}
                      </button>
                    ))}
                  </div>

                  {/* prev / next */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      disabled={index === 0}
                      className="inline-flex items-center gap-2 border border-white/25 px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M15 6l-6 6 6 6" />
                      </svg>
                      Prev
                    </button>
                    <span className="label tnum text-bone/45">
                      {pad(index + 1)} · {slide.title}
                    </span>
                    <button
                      type="button"
                      onClick={next}
                      disabled={index === last}
                      className="inline-flex items-center gap-2 border border-white/25 px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Next
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* explanation at the side */}
                <aside className="flex min-w-0 flex-col p-5 sm:p-6 lg:overflow-y-auto">
                  <span className="label text-safety">What this slide covers</span>
                  <h3 className="display mt-3 text-[clamp(1.25rem,2.4vw,1.7rem)] text-bone">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-[1.75] text-bone/80">{slide.note}</p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <span className="label text-bone/45">Codes worked to</span>
                    <ul className="mt-3 space-y-2 font-mono text-[0.8rem] uppercase tracking-[0.1em] text-bone/70">
                      <li>ASME PCC-2 · repair of pressure equipment</li>
                      <li>NBIC Part 3 · repairs and alterations</li>
                      <li>ASME BPVC Section IX · welding qualifications</li>
                    </ul>
                  </div>

                  <p className="mt-6 border-l-2 border-safety/50 pl-4 text-[0.92rem] leading-[1.7] text-bone/65">
                    This is a sample of how we plan and document a shell repair. Your job gets its
                    own method statement, ITP and JSA, raised in the Quality Management Center and
                    approved before any hot work begins.
                  </p>

                  <div className="mt-auto pt-6">
                    <a
                      href={DECK}
                      download
                      className="inline-flex w-fit items-center gap-2.5 border border-white/20 px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-bone/70 transition-colors duration-200 hover:border-safety hover:text-safety"
                    >
                      Download the deck · PPTX
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 4v12M6 12l6 6 6-6M4 20h16" />
                      </svg>
                    </a>
                  </div>
                </aside>
              </div>

              {/* footer */}
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-white/15 px-5 py-4 sm:px-7">
                <span className="label text-bone/45">Sample · Pressure vessel shell repair</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 font-display text-[1.1rem] uppercase leading-none tracking-[0.06em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
