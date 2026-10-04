import { motion } from "framer-motion";
import { Nameplate, Reveal, StampedLabel } from "./graphics";
import { LocationMap } from "./map";

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
const CREDS: [string, string][] = [
  ["Reg. No.", "1502941-H"],
  ["Statute", "Factories & Machinery Act 1967"],
  ["Scope", "Repair · Overhaul · Fabrication"],
  ["Coverage", "Workshop & on-site, nationwide"],
];

export function Hero() {
  return (
    <section className="relative bg-steel-900">
      {/* image plate */}
      <div className="grain absolute inset-0 overflow-hidden">
        <img
          src="images/hero-workshop.jpg"
          alt="Welder repairing the shell plate of a steam boiler inside the Freeskills Engineering fabrication workshop"
          className="h-full w-full object-cover object-[68%_45%] opacity-[0.62]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900 via-steel-900/88 to-steel-900/25" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-steel-900 via-steel-900/70 to-transparent" />
        <div className="absolute inset-0 bg-oxide-dark/10 mix-blend-multiply" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[86rem] px-5 pb-14 pt-28 sm:px-8 lg:pb-8 lg:pt-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <StampedLabel index="00">
              Menglembu · Ipoh · Perak · Malaysia
            </StampedLabel>

            <h1 className="display mt-7 text-bone">
              <span className="block text-[clamp(2.9rem,11vw,9.5rem)]">Boiler &amp;</span>
              <span className="block whitespace-nowrap text-[clamp(2.1rem,8.6vw,7.6rem)] text-bone/85">
                Pressure Vessel
              </span>
              <span className="-ml-[0.035em] block text-[clamp(2.9rem,13vw,9.8rem)] text-oxide-light">
                Repairer
              </span>
            </h1>

            <p className="mt-7 max-w-[56ch] text-[1.05rem] leading-[1.75] text-bone/80 sm:text-[1.15rem]">
              <span className="font-semibold text-oxide-light">Freeskills</span> Engineering
              repairs, overhauls and re-certifies steam boilers and unfired pressure vessels — and
              fabricates structural steel — from our workshop in Menglembu, Ipoh, with on-site
              crews across the northern corridor.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-oxide px-7 py-4 font-display text-[1.2rem] uppercase leading-none tracking-[0.06em] text-paper transition-colors duration-200 hover:bg-oxide-light"
              >
                Get a written quote
              </a>
              <a
                href="#capability"
                className="inline-flex items-center justify-center gap-2 border border-white/25 px-7 py-4 font-display text-[1.2rem] uppercase leading-none tracking-[0.06em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
              >
                View capability
              </a>
            </div>

            <p className="mt-5 font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.12em] text-bone/55">
              Or call{" "}
              <a
                href="tel:+60164100464"
                className="text-bone/85 underline decoration-oxide decoration-2 underline-offset-4 transition-colors duration-200 hover:text-safety"
              >
                +60 16 410 0464
              </a>{" "}
              · Mon–Sat, 8:30 am – 6:00 pm
            </p>
          </div>

          {/* the riveted data plate — overlaps into the credential strip */}
          <div className="relative z-20 lg:-mb-36 lg:justify-self-end">
            <Reveal y={26}>
              <Nameplate />
            </Reveal>
          </div>
        </div>
      </div>

      {/* credential strip */}
      <div className="relative z-10 border-y border-white/10 bg-steel-800/85">
        <div className="mx-auto w-full max-w-[86rem] px-5 sm:px-8">
          <dl className="flex flex-col sm:flex-row lg:w-[60%]">
            {CREDS.map(([k, v]) => (
              <div
                key={k}
                className="flex-1 border-t border-white/[0.09] py-5 first:border-t-0 sm:border-t-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
              >
                <dt className="label text-safety">{k}</dt>
                <dd className="mt-2 font-mono text-[0.78rem] leading-snug tracking-[0.05em] text-bone/85">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CAPABILITY — six service cards                                     */
/* ================================================================== */
type CapabilityCard = {
  idx: string;
  code: string;
  title: string;
  desc: string;
  out: string;
  img: string;
};

const CAPABILITIES: CapabilityCard[] = [
  {
    idx: "01",
    code: "BPV-01",
    title: "Boiler Repair & Overhaul",
    desc: "Shell and furnace plate replacement, tube renewal, tube plate re-boring, end plate repair, refractory renewal, safety valve overhaul and hydraulic testing before return to service.",
    out: "Fire-tube · smoke-tube · water-tube",
    img: "package boiler.jpg",
  },
  {
    idx: "02",
    code: "BPV-02",
    title: "Pressure Vessel Repair & Re-certification",
    desc: "Defect rectification, nozzle and reinforcement pad replacement, dished end repair, hydrostatic test certification and coordination of DOSH inspection for the Certificate of Fitness.",
    out: "Air receivers · heat exchangers · separators",
    img: "images/boiler-tubes.jpg",
  },
  {
    idx: "03",
    code: "SS-03",
    title: "Steel Structure Fabrication",
    desc: "Design-and-build platforms, mezzanines, staircases, handrails, machine bases, canopies and structural steel frames — cut, fitted, welded and painted in-house.",
    out: "Mild steel · galvanised · stainless",
    img: "structure.jpg",
  },
  {
    idx: "04",
    code: "PP-04",
    title: "Pressure & Process Piping",
    desc: "Steam, condensate, compressed air and process line fabrication, installation and repair, including pipe supports, manifolds, expansion loops and valve station work.",
    out: "Schedule 40 / 80 carbon steel",
    img: "silo.jpg",
  },
  {
    idx: "05",
    code: "TF-05",
    title: "Tank, Chute & Ducting Fabrication",
    desc: "Storage and mixing tanks, hoppers, chutes, cyclones, jacketed vessels and ducting for dust and fume extraction, with plate rolling, forming and site erection.",
    out: "Plate rolling · forming · welding",
    img: "chimny.jpg",
  },
  {
    idx: "06",
    code: "OS-06",
    title: "On-site Welding & Shutdown Support",
    desc: "Breakdown response and planned shutdown crews for on-site cutting, fitting and welding, alignment, reinstatement and commissioning support to get the plant back to production.",
    out: "Perak · Kedah · Penang · Selangor",
    img: "images/plate-stock.jpg",
  },
];

export function Capability() {
  return (
    <section id="capability" className="paper-rule relative scroll-mt-20 bg-paper text-ink">
      <div className="mx-auto w-full max-w-[86rem] px-5 pb-24 pt-24 sm:px-8 lg:pb-28 lg:pt-36">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end">
          <div>
            <StampedLabel index="01" tone="paper">
              Capability schedule
            </StampedLabel>
            <h2 className="display mt-6 text-[clamp(2.25rem,7vw,5.6rem)] text-ink">
              What we
              <br />
              <span className="text-oxide">are set up to do</span>
            </h2>
          </div>
          <p className="max-w-[54ch] pb-1 text-[1.02rem] leading-[1.72] text-ink/75">
            Six working lines, one workshop. Every job is quoted against a written scope, executed
            by qualified welders and closed out with the test records your plant maintenance file
            and your insurer expect to see.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.05} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-ink/15 bg-[#f7f3ea] transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_28px_50px_-32px_rgba(34,38,42,0.6)]">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-oxide transition-transform duration-300 group-hover:scale-x-100"
                />
                <div className="relative h-40 shrink-0 overflow-hidden border-b border-ink/10">
                  <img
                    src={c.img}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-oxide-dark/10 mix-blend-multiply" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="label tnum text-oxide">{c.idx}</span>
                    <span className="label text-ink/50">{c.code}</span>
                  </div>
                  <h3 className="mt-4 font-display text-[clamp(1.4rem,2.2vw,1.7rem)] uppercase leading-[1.04] tracking-[0.01em] text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-3.5 text-[0.93rem] leading-[1.7] text-ink/75">{c.desc}</p>
                  <div className="mt-auto border-t border-ink/15 pt-4">
                    <span className="label text-ink/55">Typical output</span>
                    <p className="mt-2 text-[0.86rem] leading-snug text-ink/75">{c.out}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  WORKS EXECUTED — grouped by trade                                  */
/* ================================================================== */
const WORK_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Boiler & pressure equipment",
    items: [
      "Boiler shell plate replacement & patching",
      "Fire-tube and water-tube renewal",
      "Tube plate re-boring and re-tubing",
      "Furnace & combustion chamber repair",
      "Refractory and insulation renewal",
      "Dished end and nozzle pad repair",
      "Hydrostatic pressure testing & certification",
      "Safety valve overhaul and setting",
    ],
  },
  {
    title: "Structural steel & fabrication",
    items: [
      "Platforms, staircases and handrails",
      "Machine bases, frames and skirting",
      "Ducting, hopper and cyclone works",
    ],
  },
  {
    title: "Piping & site works",
    items: [
      "Steam line and condensate piping repair",
      "On-site cutting, fitting and welding",
      "Shutdown and breakdown attendance",
    ],
  },
];

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="mt-[0.28rem] h-3.5 w-3.5 shrink-0 text-safety"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8.5l3.7 3.7L13.5 4.5" />
    </svg>
  );
}

export function Works() {
  return (
    <section id="works" className="relative scroll-mt-20 bg-steel-900 text-bone">
      {/* full-bleed band */}
      <div className="relative h-[42vh] min-h-[300px] w-full overflow-hidden">
        <img
          src="images/steel-structure.jpg"
          alt="Freshly fabricated structural steel sections coated in red-oxide primer, stacked in the fabrication workshop"
          className="h-full w-full object-cover object-center opacity-70"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-900 via-steel-900/45 to-steel-900/20" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-[86rem] px-5 pb-8 sm:px-8">
            <StampedLabel index="02">Works executed</StampedLabel>
            <h2 className="display mt-4 max-w-[16ch] text-[clamp(2.25rem,7.4vw,6.2rem)]">
              Repairs that keep <span className="text-safety">plants running</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[86rem] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-24">
        <div>
          <div className="grain relative overflow-hidden border border-white/10">
            <img
              src="images/boiler-tubes.jpg"
              alt="Renewed fire tubes expanded into the tube plate of a boiler during repair"
              className="h-full max-h-[26rem] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-steel-900/15" />
          </div>
          <p className="mt-4 border-l-2 border-oxide pl-4 font-mono text-[0.72rem] leading-[1.8] tracking-[0.06em] text-bone/60">
            FIRE-TUBE BOILER · TUBE RENEWAL AND TUBE PLATE REPAIR CARRIED OUT AT THE MENGLEMBU
            WORKSHOP PRIOR TO HYDROSTATIC TESTING.
          </p>

          <div className="mt-10 border-t border-white/10">
            {[
              ["Attendance", "Workshop & on-site crews"],
              ["Response", "Planned shutdown & breakdown"],
              ["Records", "Test certificates issued"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4"
              >
                <span className="label text-bone/45">{k}</span>
                <span className="font-mono text-[0.78rem] tracking-[0.05em] text-bone/85">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="max-w-[58ch] text-[1.02rem] leading-[1.75] text-bone/80">
            Most of our work arrives as a defect list, a failed inspection item, or a piece of plant
            that has stopped the line. Below is the everyday scope we take on — from a single
            leaking tube to a complete structural platform.
          </p>

          <div className="mt-10 space-y-9">
            {WORK_GROUPS.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 0.06}>
                <div>
                  <div className="flex items-center gap-4">
                    <span className="label tnum text-safety">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[1.5rem] uppercase leading-none tracking-[0.02em] text-bone">
                      {g.title}
                    </h3>
                    <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
                  </div>
                  <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 border-b border-white/10 py-3.5"
                      >
                        <Check />
                        <span className="text-[0.95rem] leading-[1.5] text-bone/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  COMPLIANCE & SAFETY                                                */
/* ================================================================== */
const COMPLIANCE: [string, string][] = [
  [
    "Factories and Machinery Act 1967 (Act 139)",
    "The statute governing steam boilers and unfired pressure vessels in Malaysia, and the basis on which prescribed machinery is registered and inspected.",
  ],
  [
    "FMA (Steam Boiler & Unfired Pressure Vessel) Regulations 1970",
    "Requirements for manufacture, repair, authorised safe working pressure, safety valves and hydrostatic testing of boilers and vessels.",
  ],
  [
    "Certificate of Fitness & Inspection Regulations 1970 — P.U.(A) 43/70",
    "Registration, inspection intervals and the Certificate of Fitness — Form A for steam boilers, Form B for unfired pressure vessels — ordinarily valid fifteen calendar months.",
  ],
  [
    "Section 29A, Act 139 — written authority",
    "No person shall manufacture, fabricate, test, install, maintain, dismantle or repair prescribed machinery without written authority from the Chief Inspector.",
  ],
  [
    "ASME PCC-2 — Repair of Pressure Equipment & Piping",
    "Accepted guidelines for inspecting, evaluating and repairing pressure-containing components and industrial piping systems.",
  ],
  [
    "NBIC — National Board Inspection Code",
    "A systematic approach to inspecting, evaluating and repairing boilers and pressure vessels, recognised internationally for safe, compliant, extended service life.",
  ],
  [
    "Hydrostatic test",
    "Required where a repair involves full-penetration welding or major replacement of pressure-retaining components; minor non-penetrating repairs such as seal welds and tube plugging are exempt under ASME PCC-2. Weld repairs after final PWHT require hydrostatic re-testing under ASME Section VIII, Division 1.",
  ],
  [
    "Safety valve accumulation test",
    "With the stop valve closed and under full firing, pressure accumulation must not exceed ten per cent above the authorised safe working pressure.",
  ],
  [
    "Registration number plate (Reg. 82)",
    "The registration number plate is provided, marked and maintained on every steam boiler and unfired pressure vessel held under certificate of fitness.",
  ],
];

export function Compliance() {
  return (
    <section id="compliance" className="paper-rule scroll-mt-20 bg-paper text-ink">
      <div className="mx-auto w-full max-w-[86rem] px-5 py-24 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <StampedLabel index="03" tone="paper">
              Compliance &amp; safety
            </StampedLabel>
            <h2 className="display mt-6 text-[clamp(2.25rem,6vw,4.8rem)]">
              Work that
              <br />
              <span className="text-oxide">stands up to</span>
              <br />
              inspection
            </h2>
            <p className="mt-7 max-w-[42ch] text-[1.02rem] leading-[1.72] text-ink/75">
              Boiler and pressure vessel work is statutory work. Repairs and fabrication are
              executed to the requirements of the Factories and Machinery Act 1967 and its
              subsidiary regulations, and coordinated with the DOSH-appointed inspector for
              inspection, testing and certification.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center border border-ink/25 px-6 py-4 font-display text-[1.15rem] uppercase leading-none tracking-[0.06em] text-ink transition-colors duration-200 hover:border-oxide hover:bg-oxide hover:text-paper"
            >
              Discuss a repair scope
            </a>
          </div>

          <div>
            <div className="grid grid-cols-[1fr] gap-x-8 border-b-2 border-ink/70 pb-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
              <div className="label text-ink/65">Instrument</div>
              <div className="label hidden text-ink/65 sm:block">What it governs</div>
            </div>
            {COMPLIANCE.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.04}>
                <div className="group grid grid-cols-1 gap-x-8 gap-y-2 border-b border-ink/15 py-5 transition-colors duration-200 hover:bg-ink/[0.04] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
                  <div className="flex items-baseline gap-4">
                    <span className="label tnum text-oxide">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[1.25rem] uppercase leading-[1.12] tracking-[0.015em]">
                      {title}
                    </h3>
                  </div>
                  <p className="max-w-[54ch] text-[0.92rem] leading-[1.7] text-ink/75">{body}</p>
                </div>
              </Reveal>
            ))}
            <p className="mt-8 border-l-2 border-oxide bg-ink/[0.04] px-5 py-4 font-mono text-[0.72rem] leading-[1.9] tracking-[0.05em] text-ink/70">
              NOTE — SCOPE IS CONFIRMED IN WRITING BEFORE ANY HOT WORK BEGINS. METHOD STATEMENTS,
              WELDER QUALIFICATIONS AND TEST RECORDS ARE PROVIDED WITH THE JOB FILE ON REQUEST.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  JOB FLOW                                                           */
/* ================================================================== */
const FLOW: [string, string, string][] = [
  [
    "01",
    "Survey & assessment",
    "Site attendance to conduct thorough defect assessments, perform thickness measurements, and review visual findings, ensuring precise identification of defects in alignment with the current Certificate of Fitness.",
  ],
  [
    "02",
    "Scope & quotation",
    "Written scope of work, material specification, method statement, inspection test plans and a schedule agreed with your plant team and safety requirements.",
  ],
  [
    "03",
    "Repair / fabrication",
    "Cutting, rolling, forming, fit-up and welding in the Menglembu workshop or on-site within your shutdown window.",
  ],
  [
    "04",
    "Test & inspection",
    "Hydrostatic testing, bubble testing, safety valve setting, weld inspection and coordination with the appointed person or authorised inspector.",
  ],
  [
    "05",
    "Handover & records",
    "Reinstatement, test certificates and job records issued for your maintenance file and traceable records for your insurer and the appointed inspector.",
  ],
];

export function Flow() {
  return (
    <section id="flow" className="relative scroll-mt-20 overflow-hidden bg-steel-900 text-bone">
      <img
        src="package boiler.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-steel-900 via-steel-900/88 to-steel-900" />

      <div className="relative mx-auto w-full max-w-[86rem] px-5 py-24 sm:px-8 lg:py-28">
        <StampedLabel index="04">Job flow</StampedLabel>
        <h2 className="display mt-6 max-w-[18ch] text-[clamp(2.25rem,6vw,4.8rem)]">
          From defect list to <span className="text-oxide-light">signed-off handover</span>
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {FLOW.map(([n, title, body], i) => (
            <Reveal key={n} delay={i * 0.06} className="h-full">
              <div className="group flex h-full flex-col border border-white/12 bg-steel-800/50 p-6 transition-colors duration-200 hover:border-oxide/60 hover:bg-steel-800">
                <div className="flex items-center gap-3">
                  <span className="tnum flex h-9 w-9 shrink-0 items-center justify-center border border-oxide/70 font-mono text-[0.78rem] font-semibold text-safety">
                    {n}
                  </span>
                  <motion.span
                    className="h-px flex-1 origin-left bg-oxide/60"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.75,
                      delay: 0.08 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
                <h3 className="mt-5 font-display text-[1.4rem] uppercase leading-[1.05] tracking-[0.01em]">
                  {title}
                </h3>
                <p className="mt-3 text-[0.89rem] leading-[1.7] text-bone/70">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CONTACT                                                            */
/* ================================================================== */
const DETAILS: [string, string][] = [
  ["Company", "Freeskills Engineering (M) Sdn Bhd"],
  ["Registration", "1502941-H"],
  [
    "Address",
    "Lot 01 & 02, Hala Perusahaan Kledang Utara 6,\nMenglembu, 31450 Ipoh, Perak Darul Ridzuan, Malaysia",
  ],
  ["Telephone", "+60 16 410 0464"],
  ["Email", "freeskillseng@gmail.com"],
  ["Hours", "Monday – Saturday, 8:30 am – 6:00 pm"],
];

export function Contact() {
  return (
    <section id="contact" className="paper-rule scroll-mt-20 bg-paper text-ink">
      <div className="mx-auto w-full max-w-[86rem] px-5 py-24 sm:px-8 lg:py-28">
        <StampedLabel index="05" tone="paper">
          Contact &amp; works address
        </StampedLabel>

        <div className="mt-8 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16">
          <div>
            <h2 className="display text-[clamp(2.25rem,6.4vw,5.2rem)]">
              Talk to the
              <br />
              <span className="text-oxide">workshop</span> directly
            </h2>

            <dl className="mt-10 border-t-2 border-ink/70">
              {DETAILS.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-ink/15 py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
                >
                  <dt className="label pt-1 text-ink/65">{k}</dt>
                  <dd className="whitespace-pre-line font-mono text-[0.86rem] leading-[1.75] tracking-[0.045em] text-ink">
                    {k === "Telephone" ? (
                      <a
                        href="tel:+60164100464"
                        className="border-b border-oxide/40 pb-0.5 text-oxide transition-colors duration-200 hover:border-oxide hover:text-oxide-dark"
                      >
                        +60 16 410 0464
                      </a>
                    ) : k === "Email" ? (
                      <a
                        href="mailto:freeskillseng@gmail.com"
                        className="border-b border-oxide/40 pb-0.5 text-oxide transition-colors duration-200 hover:border-oxide hover:text-oxide-dark"
                      >
                        freeskillseng@gmail.com
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="tel:+60164100464"
                className="inline-flex items-center justify-center gap-3 bg-oxide px-7 py-4 font-display text-[1.2rem] uppercase leading-none tracking-[0.06em] text-paper transition-colors duration-200 hover:bg-oxide-light"
              >
                Call +60 16 410 0464
              </a>
              <a
                href="mailto:freeskillseng@gmail.com?subject=Repair%20enquiry%20%E2%80%94%20Freeskills%20Engineering"
                className="inline-flex items-center justify-center gap-3 border border-ink/25 px-7 py-4 font-display text-[1.2rem] uppercase leading-none tracking-[0.06em] text-ink transition-colors duration-200 hover:border-oxide hover:text-oxide"
              >
                Email a scope
              </a>
            </div>

            <p className="mt-6 max-w-[46ch] font-mono text-[0.72rem] leading-[1.9] tracking-[0.05em] text-ink/60">
              SHUTDOWN AND BREAKDOWN ATTENDANCE BY ARRANGEMENT. SEND US YOUR DEFECT LIST, DRAWING OR
              INSPECTION REPORT AND WE WILL RESPOND WITH A WRITTEN SCOPE.
            </p>
          </div>

          {/* live locality map */}
          <div>
            <div className="grain relative overflow-hidden border border-ink/20 bg-paper">
              <LocationMap className="h-[22rem] w-full sm:h-[26rem]" />
            </div>
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/20 pt-4">
              <p className="label text-ink/55">Interactive map · OpenStreetMap</p>
              <p className="font-mono text-[0.72rem] tracking-[0.06em] text-ink/70">
                4.5685° N, 101.0367° E
              </p>
            </div>
            <p className="mt-6 max-w-[52ch] text-[0.98rem] leading-[1.72] text-ink/75">
              The workshop sits on Hala Perusahaan Kledang Utara 6 in the Menglembu industrial
              estate, a short run from Jalan Menglembu and the North–South Expressway — with room
              for trailer access, plate delivery and vehicle-mounted repair work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
