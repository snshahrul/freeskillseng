import { motion } from "framer-motion";
import { Nameplate, Reveal, StampedLabel } from "./graphics";
import { LocationMap } from "./map";

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
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

      <div className="relative z-10 mx-auto w-full max-w-[86rem] px-5 pb-16 pt-28 sm:px-8 lg:pb-8 lg:pt-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <StampedLabel index="00">
              Menglembu · Ipoh · Perak · Malaysia
            </StampedLabel>

            <h1 className="display mt-7 text-bone">
              <span className="block text-[clamp(3.1rem,12vw,10.5rem)]">Boiler &amp;</span>
              <span className="block text-[clamp(2.25rem,9.2vw,8.1rem)] text-bone/85">
                Pressure Vessel
              </span>
              <span className="-ml-[0.035em] block text-[clamp(3.6rem,14.5vw,12.6rem)] text-oxide-light">
                Repair
              </span>
            </h1>

            <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <p className="max-w-[52ch] text-[1.02rem] leading-[1.72] text-bone/80">
                Freeskills Engineering (M) Sdn Bhd repairs, overhauls and re-certifies steam
                boilers and unfired pressure vessels, and fabricates general steel structures
                for factories and plants across Ipoh, Perak and the northern corridor — in our
                Menglembu workshop or on your shutdown schedule.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:+60164100464"
                  className="group inline-flex items-center gap-3 bg-oxide px-6 py-4 font-display text-[1.15rem] uppercase tracking-[0.06em] text-paper transition-colors duration-200 hover:bg-oxide-light"
                >
                  <span className="label opacity-70">Tel</span>
                  +60 16 410 0464
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-bone/25 px-6 py-4 font-display text-[1.15rem] uppercase tracking-[0.06em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
                >
                  Request a survey
                </a>
              </div>
            </div>
          </div>

          {/* the riveted data plate — overlaps into the schedule band */}
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
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:w-[58%] lg:pr-10">
            {[
              ["Reg. No.", "1502941-H"],
              ["Statute", "Factories & Machinery Act 1967"],
              ["Scope", "Repair · Overhaul · Fabrication"],
              ["Coverage", "Workshop & on-site, nationwide"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="border-b border-white/[0.09] px-1 py-5 last:border-b-0 sm:odd:border-r sm:odd:border-r-white/[0.09] sm:odd:pr-8 sm:even:pl-2 lg:[&:nth-last-child(2)]:border-b-0"
              >
                <div className="label text-safety">{k}</div>
                <div className="mt-2 font-mono text-[0.78rem] leading-snug tracking-[0.05em] text-bone/85">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CAPABILITY SCHEDULE — the full-bleed ruled table                    */
/* ================================================================== */
const CAPABILITIES = [
  {
    idx: "01",
    code: "BPV-01",
    title: "Boiler Repair & Overhaul",
    desc: "Shell and furnace plate replacement, tube renewal, tube plate re-boring, end plate repair, refractory renewal, safety valve overhaul and hydraulic testing before return to service.",
    out: "Fire-tube · smoke-tube · water-tube",
  },
  {
    idx: "02",
    code: "BPV-02",
    title: "Pressure Vessel Repair & Re-certification",
    desc: "Defect rectification, nozzle and reinforcement pad replacement, dished end repair, hydrostatic test certification and coordination of DOSH inspection for the Certificate of Fitness.",
    out: "Air receivers · heat exchangers · separators",
  },
  {
    idx: "03",
    code: "SS-03",
    title: "Steel Structure Fabrication",
    desc: "Design-and-build platforms, mezzanines, staircases, handrails, machine bases, canopies and structural steel frames — cut, fitted, welded and painted in-house.",
    out: "Mild steel · galvanised · stainless",
  },
  {
    idx: "04",
    code: "PP-04",
    title: "Pressure & Process Piping",
    desc: "Steam, condensate, compressed air and process line fabrication, installation and repair, including pipe supports, manifolds, expansion loops and valve station work.",
    out: "Schedule 40 / 80 carbon steel",
  },
  {
    idx: "05",
    code: "TF-05",
    title: "Tank, Chute & Ducting Fabrication",
    desc: "Storage and mixing tanks, hoppers, chutes, cyclones, jacketed vessels and ducting for dust and fume extraction, with plate rolling, forming and site erection.",
    out: "Plate rolling · forming · welding",
  },
  {
    idx: "06",
    code: "OS-06",
    title: "On-site Welding & Shutdown Support",
    desc: "Breakdown response and planned shutdown crews for on-site cutting, fitting and welding, alignment, reinstatement and commissioning support to get the plant back to production.",
    out: "Perak · Kedah · Penang · Selangor",
  },
];

export function Capability() {
  return (
    <section id="capability" className="paper-rule relative scroll-mt-20 bg-paper text-ink">
      <div className="mx-auto w-full max-w-[86rem] px-5 pb-4 pt-28 sm:px-8 lg:pb-6 lg:pt-40">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end">
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
          <p className="max-w-[54ch] pb-2 text-[1.02rem] leading-[1.72] text-ink/75">
            Six working lines, one workshop. Every job is quoted against a written scope, executed
            by qualified welders and closed out with the test records your plant maintenance file
            and your insurer expect to see.
          </p>
        </div>
      </div>

      {/* schedule head */}
      <div className="mx-auto mt-12 w-full max-w-[86rem] px-5 sm:px-8">
        <div className="hidden grid-cols-[3.2rem_7.5rem_minmax(0,1fr)_minmax(0,1.15fr)] gap-x-6 border-b-2 border-ink/70 px-1 pb-3 md:grid">
          <div className="label text-ink/65">No.</div>
          <div className="label text-ink/65">Code</div>
          <div className="label text-ink/65">Scope of work</div>
          <div className="label text-ink/65">Description / typical output</div>
        </div>
      </div>

      {/* rows */}
      <div className="mx-auto w-full max-w-[86rem] px-5 pb-28 sm:px-8">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.code} delay={i * 0.045}>
            <div className="group grid grid-cols-1 gap-x-6 gap-y-3 border-b border-ink/15 px-1 py-7 transition-colors duration-200 hover:bg-ink hover:text-paper md:grid-cols-[3.2rem_7.5rem_minmax(0,1fr)_minmax(0,1.15fr)] md:items-baseline">
              <div className="label tnum text-oxide transition-colors duration-200 group-hover:text-safety">
                {c.idx}
              </div>
              <div className="label text-ink/65 transition-colors duration-200 group-hover:text-paper/60">
                {c.code}
              </div>
              <h3 className="font-display text-[clamp(1.55rem,3.2vw,2.15rem)] uppercase leading-[0.98] tracking-[0.005em]">
                {c.title}
              </h3>
              <div>
                <p className="max-w-[48ch] text-[0.93rem] leading-[1.7] text-ink/75 transition-colors duration-200 group-hover:text-paper/80">
                  {c.desc}
                </p>
                <p className="label mt-3 text-ink/60 transition-colors duration-200 group-hover:text-safety/85">
                  {c.out}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  WORKS EXECUTED                                                      */
/* ================================================================== */
const WORK_ITEMS = [
  "Boiler shell plate replacement & patching",
  "Fire-tube and water-tube renewal",
  "Tube plate re-boring and re-tubing",
  "Furnace & combustion chamber repair",
  "Refractory and insulation renewal",
  "Dished end and nozzle pad repair",
  "Hydrostatic pressure testing & certification",
  "Safety valve overhaul and setting",
  "Steam line and condensate piping repair",
  "Platforms, staircases and handrails",
  "Machine bases, frames and skirting",
  "Ducting, hopper and cyclone works",
];

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

          <div className="mt-10 space-y-px border-t border-white/10">
            {[
              ["Attendance", "Workshop & on-site crews"],
              ["Response", "Planned shutdown & breakdown"],
              ["Records", "Test certificates issued"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4">
                <span className="label text-bone/45">{k}</span>
                <span className="font-mono text-[0.78rem] tracking-[0.05em] text-bone/85">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="max-w-[58ch] text-[1.02rem] leading-[1.75] text-bone/80">
            Most of our work arrives as a defect list, a failed inspection item or a piece of plant
            that has stopped the line. Below is the everyday scope we take on — from a single
            leaking tube to a complete structural platform.
          </p>
          <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {WORK_ITEMS.map((item, i) => (
              <Reveal key={item} delay={(i % 6) * 0.04}>
                <div className="group flex items-baseline gap-4 border-b border-white/10 py-4">
                  <span className="label tnum text-safety/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.98rem] leading-[1.55] text-bone/85 transition-colors duration-200 group-hover:text-bone">
                    {item}
                  </span>
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
/*  COMPLIANCE & SAFETY                                                 */
/* ================================================================== */
const COMPLIANCE = [
  [
    "Factories and Machinery Act 1967 (Act 139)",
    "The statute governing steam boilers and unfired pressure vessels in Malaysia, and the basis on which prescribed machinery is registered and inspected.",
  ],
  [
    "FMA (Steam Boiler & Unfired Pressure Vessel) Regulations 1970",
    "Requirements for manufacture, repair, authorised safe working pressure, safety valves and hydrostatic testing of boilers and vessels.",
  ],
  [
    "FMA (Notification, Certificate of Fitness & Inspection) Regulations 1970 — P.U.(A) 43/70",
    "Registration, inspection intervals and the Certificate of Fitness (Form A for steam boilers, Form B for unfired pressure vessels), ordinarily valid fifteen calendar months.",
  ],
  [
    "Section 29A, Act 139 — written authority",
    "No person shall manufacture, fabricate, test, install, maintain, dismantle or repair prescribed machinery without written authority from the Chief Inspector.",
  ],
  [
    "Hydrostatic test certificate",
    "Vessels are tested hydrostatically for a period of not less than twenty minutes with no leakage or undue deflection or distortion of its parts, witnessed and recorded.",
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
              className="mt-8 inline-flex items-center gap-3 border border-ink/25 px-6 py-4 font-display text-[1.15rem] uppercase tracking-[0.06em] text-ink transition-colors duration-200 hover:border-oxide hover:bg-oxide hover:text-paper"
            >
              Discuss a repair scope
            </a>
          </div>

          <div>
            <div className="grid grid-cols-[1fr] gap-x-8 border-b-2 border-ink/70 pb-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
              <div className="label text-ink/65">Instrument</div>
              <div className="label text-ink/65">What it governs</div>
            </div>
            {COMPLIANCE.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.04}>
                <div className="group grid grid-cols-1 gap-x-8 gap-y-2 border-b border-ink/15 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
                  <div className="flex items-baseline gap-4">
                    <span className="label tnum text-oxide">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-[1.28rem] uppercase leading-[1.1] tracking-[0.015em]">
                      {title}
                    </h3>
                  </div>
                  <p className="max-w-[52ch] text-[0.92rem] leading-[1.72] text-ink/72">{body}</p>
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
/*  JOB FLOW                                                            */
/* ================================================================== */
const FLOW = [
  ["01", "Survey & assessment", "Site attendance, thickness and visual findings review, and identification of defects against the current certificate of fitness."],
  ["02", "Scope & quotation", "Written scope of work, material specification, method statement and a schedule agreed with your plant team."],
  ["03", "Repair / fabrication", "Cutting, forming, fit-up and welding in the Menglembu workshop or on-site within your shutdown window."],
  ["04", "Test & inspection", "Hydrostatic testing, safety valve setting, weld inspection and coordination with the appointed inspector."],
  ["05", "Handover & records", "Reinstatement, registration plate marking, test certificates and job records issued for your maintenance file."],
];

export function Flow() {
  return (
    <section id="flow" className="relative scroll-mt-20 overflow-hidden bg-steel-900 text-bone">
      <img
        src="images/plate-stock.jpg"
        alt="Steel plate stock and profile cutting with sparks in the fabrication workshop"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-steel-900 via-steel-900/88 to-steel-900" />

      <div className="relative mx-auto w-full max-w-[86rem] px-5 py-24 sm:px-8 lg:py-28">
        <StampedLabel index="04">Job flow</StampedLabel>
        <h2 className="display mt-6 max-w-[18ch] text-[clamp(2.25rem,6vw,4.8rem)]">
          From defect list to <span className="text-oxide-light">signed-off handover</span>
        </h2>

        <div className="mt-14 grid gap-px border-t border-white/15 sm:grid-cols-2 lg:grid-cols-5">
          {FLOW.map(([n, title, body], i) => (
            <Reveal key={n} delay={i * 0.06}>
              <div className="group h-full border-b border-white/10 px-0 py-8 transition-colors duration-200 hover:bg-white/[0.04] lg:border-b-0 lg:border-r lg:border-white/10 lg:px-6 lg:last:border-r-0">
                <div className="flex items-center gap-3">
                  <span className="label tnum text-safety">{n}</span>
                  <motion.span
                    className="h-px flex-1 origin-left bg-oxide/70"
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
                <h3 className="mt-5 font-display text-[1.45rem] uppercase leading-[1.05] tracking-[0.01em]">
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
/*  CONTACT                                                             */
/* ================================================================== */
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
              {[
                ["Company", "Freeskills Engineering (M) Sdn Bhd"],
                ["Registration", "1502941-H"],
                [
                  "Address",
                  "Lot 01 & 02, Hala Perusahaan Kledang Utara 6,\nMenglembu, 31450 Ipoh, Perak Darul Ridzuan, Malaysia",
                ],
                ["Telephone", "+60 16 410 0464"],
                ["Email", "freeskillseng@gmail.com"],
                ["Hours", "Monday – Saturday, 8:30 am – 6:00 pm"],
              ].map(([k, v]) => (
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
                className="inline-flex items-center gap-3 bg-oxide px-7 py-4 font-display text-[1.2rem] uppercase tracking-[0.06em] text-paper transition-colors duration-200 hover:bg-oxide-light"
              >
                Call +60 16 410 0464
              </a>
              <a
                href="mailto:freeskillseng@gmail.com?subject=Repair%20enquiry%20%E2%80%94%20Freeskills%20Engineering"
                className="inline-flex items-center gap-3 border border-ink/25 px-7 py-4 font-display text-[1.2rem] uppercase tracking-[0.06em] text-ink transition-colors duration-200 hover:border-oxide hover:text-oxide"
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
