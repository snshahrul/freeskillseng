import { Fragment, type ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { Nameplate, OrgChartModal, Reveal, SafetyCommitteeModal, StampedLabel } from "./graphics";
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
  const [orgChartOpen, setOrgChartOpen] = useState(false);

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
              <Nameplate onOpenOrgChart={() => setOrgChartOpen(true)} />
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

      {/* organisation chart popup, opened from the data plate */}
      <OrgChartModal open={orgChartOpen} onClose={() => setOrgChartOpen(false)} />
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

const INFRA_ITEMS: [string, string][] = [
  ["Three covered bays", "plate & cylinder storage, materials handling, assembly & fit-up"],
  ["CNC laser cutting", "MPS-D3 system in the dedicated Lot 02 facility"],
  ["Plate rolling to 12.7 mm", "three-roll plate rolling machine (EQ-011)"],
  ["Machining in-house", "precision lathe (EQ-007) and milling machine with digital readout (EQ-008)"],
  ["Welding & cutting", "SMAW, GTAW and GMAW per approved WPS · oxy-fuel and air-arc"],
  ["Calibrated inspection", "thickness survey and flaw detection with reference blocks, in-house"],
];

type InfraPhoto = { src: string; alt: string; caption: string; w: number; h: number };

/* Shop-floor photos — served from public/ (spaces are URL-encoded). */
const INFRA_PHOTOS: InfraPhoto[] = [
  {
    src: "laser%20cutter.jpg",
    alt: "CNC laser cutter at the Freeskills Engineering workshop, Menglembu",
    caption: "Laser cutting",
    w: 260,
    h: 190,
  },
  {
    src: "Fab%20Layout%20C.jpg",
    alt: "Plate rolling machine at the Freeskills Engineering workshop, Menglembu",
    caption: "Rolling machine",
    w: 1280,
    h: 960,
  },
  {
    src: "12.png",
    alt: "Milling machine with digital readout at the Freeskills Engineering workshop",
    caption: "Milling machine",
    w: 297,
    h: 398,
  },
  {
    src: "13.jpg",
    alt: "Precision lathe at the Freeskills Engineering workshop",
    caption: "Lathe machine",
    w: 273,
    h: 389,
  },
  {
    src: "B.jpg",
    alt: "Bay workstation in the covered bays at the Freeskills Engineering workshop",
    caption: "Bay workstation",
    w: 355,
    h: 261,
  },
];

/* Site-work photos — fabrication and erection work off the shop floor. */
const SITE_WORK_PHOTOS: InfraPhoto[] = [
  {
    src: "Tank%20Fabrication.jpg",
    alt: "Tank fabrication by Freeskills Engineering",
    caption: "Tank fabrication",
    w: 1040,
    h: 780,
  },
  {
    src: "Chimny%20Facrication.jpg",
    alt: "Chimney fabrication by Freeskills Engineering",
    caption: "Chimney fabrication",
    w: 1020,
    h: 459,
  },
  {
    src: "Chimmy%20ducting.jpg",
    alt: "Chimney ducting by Freeskills Engineering",
    caption: "Chimney ducting",
    w: 1040,
    h: 780,
  },
  {
    src: "steel%20structure%20erection.jpg",
    alt: "Steel structure erection by Freeskills Engineering",
    caption: "Steel structure erection",
    w: 1280,
    h: 960,
  },
  {
    src: "steel%20structure%20erection%201.jpg",
    alt: "Steel structure erection by Freeskills Engineering",
    caption: "Steel structure erection",
    w: 1280,
    h: 960,
  },
];

const INFRA_PHOTO_GROUPS: { title: string; photos: InfraPhoto[] }[] = [
  { title: "From the shop floor", photos: INFRA_PHOTOS },
  { title: "Site Work", photos: SITE_WORK_PHOTOS },
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

        {/* infrastructure & facilities */}
        <div
          id="infrastructure"
          className="mt-16 scroll-mt-24 overflow-hidden rounded-[6px] border border-white/10 bg-steel-800 text-bone"
        >
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="label text-safety">Infrastructure &amp; facilities</span>
                <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
              </div>
              <h3 className="display mt-5 text-[clamp(1.9rem,3.6vw,2.9rem)] text-bone">
                Built for <span className="text-safety">heavy repair work</span>
              </h3>
              <p className="mt-5 max-w-[58ch] text-[1rem] leading-[1.72] text-bone/80">
                Our dedicated repair workshop at Lot 01 &amp; 02, Menglembu is engineered for
                high-tolerance heavy mechanical operations on boilers and pressure vessels — three
                covered bays, CNC laser cutting, heavy plate rolling and calibrated inspection under
                one roof, with an equipment register and calibration certificates available for
                your evaluation.
              </p>

              <ul id="equipment" className="mt-7 scroll-mt-28 grid gap-x-10 sm:grid-cols-2">
                {INFRA_ITEMS.map(([t, b]) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 border-b border-white/10 py-3.5"
                  >
                    <span
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-safety"
                      aria-hidden="true"
                    />
                    <span className="text-[0.93rem] leading-[1.55]">
                      <span className="font-semibold text-bone">{t}</span>{" "}
                      <span className="text-bone/70">— {b}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.12em] text-bone/50">
                Lot 01 &amp; 02, Hala Perusahaan Kledang Utara 6 · Menglembu, Ipoh · equipment list
                &amp; calibration certificates on file
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 border-t border-white/10 bg-steel-700/60 p-7 lg:border-l lg:border-t-0">
              <img
                src="images/facility-lot02.jpg"
                alt="Freeskills Engineering Lot 02 facility, front view, Menglembu, Ipoh"
                width={321}
                height={231}
                loading="lazy"
                className="w-full max-w-[22rem] rounded-[4px] border border-white/15 object-cover shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)]"
              />
              <p className="label text-bone/55">Lot 02 · front view facility</p>
            </div>
          </div>

          {/* photo galleries — shop floor + site work */}
          <div className="border-t border-white/10 p-7 sm:p-10">
            {INFRA_PHOTO_GROUPS.map((group, gi) => (
              <div
                key={group.title}
                className={gi > 0 ? "mt-9 border-t border-white/10 pt-8" : undefined}
              >
                <div className="flex items-center gap-3">
                  <span className="label text-safety">{group.title}</span>
                  <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {group.photos.map((p) => (
                    <figure key={p.src} className="min-w-0">
                      <img
                        src={p.src}
                        alt={p.alt}
                        width={p.w}
                        height={p.h}
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-[4px] border border-white/15 object-cover shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)] transition-colors duration-200 hover:border-safety/60"
                      />
                      <figcaption className="label mt-2.5 text-bone/55">{p.caption}</figcaption>
                    </figure>
                  ))}
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
/*  QUALITY MANAGEMENT SYSTEM                                          */
/* ================================================================== */
const QMS_POINTS: [string, string, string][] = [
  [
    "01",
    "Controlled before work starts",
 "Scope is confirmed in writing; then the defect assessment, thickness measurement (if required), visual inspection, Inspection & Test Plan, method statement and job safety analysis are raised — and all relevant documents are sent to DOSH as a ‘repair notice’ and approved in the system before any hot work begins.",
  ],
  [
    "02",
    "Qualified welders & procedures",
    "Welding Procedure Specifications (WPS), Procedure Qualification Records (PQR) and welder qualification tests (WQT) to the ASME Boiler & Pressure Vessel Code Section IX or ISO/BS EN 15614, with welder continuity tracked — only qualified welders are permitted to weld on pressure parts.",
  ],
  [
    "03",
    "Answered in minutes, monitored live",
    "Inspection plans, repair procedures, acceptance criteria and decision-making are answered within minutes — without delaying your plant shutdown planning or schedule. Every client or inspector can monitor repair progress live via a link to our Quality Management Center and can leave comments or suggestions for improvement — all of it handled inside the system.",
  ],
  [
    "04",
    "Certified, traceable close-out",
    "Numbered certificates, PDF test reports and job records are cloud-synced to the job file and released after client acceptance — for your maintenance records, your insurer and the appointed inspector.",
  ],
];

/* code books held by Freeskills — each opens its PDF from /public/codes */
const CODE_BOOKS: { title: string; tag: string; file: string }[] = [
  {
    title: "ASME BPVC Section VIII, Division 1",
    tag: "Pressure vessels · construction & repair",
    file: "ASME-BPVC-VIII-Div-1.pdf",
  },
  {
    title: "ASME BPVC Section IX",
    tag: "Welding & brazing qualifications",
    file: "ASME-BPVC-IX.pdf",
  },
  {
    title: "ASME BPVC Section V",
    tag: "Nondestructive examination",
    file: "ASME-BPVC-V.pdf",
  },
  {
    title: "ASME BPVC Section II",
    tag: "Materials · parts A–D",
    file: "ASME-BPVC-II.pdf",
  },
  {
    title: "ASME PCC-2",
    tag: "Repair of pressure equipment & piping",
    file: "ASME-PCC-2.pdf",
  },
  {
    title: "NBIC",
    tag: "National Board inspection code",
    file: "NBIC.pdf",
  },
  {
    title: "Factories & Machinery Act 1967",
    tag: "Act 139 · Malaysia",
    file: "FMA-1967-Act-139.pdf",
  },
  {
    title: "FMA Steam Boiler & UPV Regulations 1970",
    tag: "Repair, testing & safety valves",
    file: "FMA-SB-UPV-Regulations-1970.pdf",
  },
  {
    title: "Certificate of Fitness & Inspection Regs 1970",
    tag: "P.U.(A) 43/70 · Form A / Form B",
    file: "CoF-Inspection-Regulations-1970.pdf",
  },
];

const DEMO_STEPS: [string, string, string][] = [
  [
    "01",
    "Raise the job",
    "The defect list is logged against the client and equipment record — history, drawings and certificates pulled up in one place.",
  ],
  [
    "02",
    "Plans & approvals",
    "ITP, method statement and JSA generated in-system; repair-notice documents sent to DOSH and approved before any hot work.",
  ],
  [
    "03",
    "Qualified execution",
    "WPS/PQR and welder qualifications matched to the job, with the workshop updating progress live as the repair runs.",
  ],
  [
    "04",
    "Test & decide",
    "Inspections recorded and acceptance criteria answered within minutes — results sent to the inspector or client without delay.",
  ],
  [
    "05",
    "Handover",
    "Numbered certificate, PDF test reports and the complete, ordered job file released after client acceptance.",
  ],
];

/* Section 1.0 of the QA/QC manual — the five pledges, verbatim. */
const QUALITY_POLICY_PLEDGES: [string, string, string][] = [
  [
    "01",
    "Safety First",
    "Prioritize the safety of our personnel, the public, and the environment in all repair and fabrication activities, strictly adhering to DOSH (Department of Occupational Safety and Health, Malaysia) and Factories and Machinery Act (FMA) 1967 requirements.",
  ],
  [
    "02",
    "Regulatory Compliance",
    "Ensure all repairs and fabrications comply with the relevant sections of the ASME Code and BS EN Standards.",
  ],
  [
    "03",
    "Customer Satisfaction",
    "Understand and meet customer requirements fully, aiming to exceed their expectations regarding project timelines, quality, and budget.",
  ],
  [
    "04",
    "Continuous Improvement",
    "Continuously improve the effectiveness of our Quality Management System through measurable objectives, regular audits, and management reviews.",
  ],
  [
    "05",
    "Competence",
    "Ensure all welders, supervisors, and NDT technicians are suitably qualified and certified for the specific tasks they undertake.",
  ],
];

export function QMS() {
  const [showDemo, setShowDemo] = useState(false);

  const toggleDemo = () => {
    const next = !showDemo;
    setShowDemo(next);
    if (next) {
      window.requestAnimationFrame(() => {
        document.getElementById("qms-demo")?.scrollIntoView({ block: "center" });
      });
    }
  };

  return (
    <section
      id="qms"
      className="relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-gradient-to-b from-steel-800 to-steel-900 text-bone"
    >
      <div className="mx-auto w-full max-w-[86rem] px-5 py-24 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <StampedLabel index="04">Quality Management System</StampedLabel>
            <h2 className="display mt-6 text-[clamp(2.25rem,6vw,4.8rem)]">
              Under control,
              <br />
              <span className="text-safety">within the code</span>
            </h2>
            <p className="mt-7 max-w-[46ch] text-[1.02rem] leading-[1.72] text-bone/80">
              Freeskills Engineering runs every alteration, repair, inspection, testing and
              certification job through our Quality Management Center — one controlled online
              workspace shared by the workshop, our inspectors and your plant team. Plans, welding
              qualifications, inspection readings, test results and certificates are raised,
              checked and stored there in sequence, so nothing is signed off until the record
              behind it exists.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleDemo}
                aria-expanded={showDemo}
                aria-controls="qms-demo"
                className="inline-flex items-center justify-center gap-3 bg-safety px-7 py-4 font-display text-[1.2rem] uppercase leading-none tracking-[0.06em] text-steel-900 transition-colors duration-200 hover:bg-bone"
              >
                {showDemo ? "Hide the demo" : "See how it works"}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-300 ${showDemo ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v10M3.5 8.5L8 13l4.5-4.5" />
                </svg>
              </button>
              <a
                href="https://qmc.freeskillengineering.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-white/25 px-6 py-4 font-display text-[1.15rem] uppercase leading-none tracking-[0.06em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
              >
                Open the live system
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
                  <path d="M5.5 10.5L10.5 5.5M6.5 5.5h4v4" />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <p className="mt-4 font-mono text-[0.72rem] uppercase leading-relaxed tracking-[0.14em] text-bone/50">
              qmc.freeskillengineering.com · cloud sync &amp; PDF reports
            </p>
          </div>

          <div>
            <div className="grid grid-cols-1 border-t border-white/15 pb-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
              <div className="label pt-4 text-bone/55">Control point</div>
              <div className="label hidden pt-4 text-bone/55 sm:block">How it keeps the job in line</div>
            </div>
            {QMS_POINTS.map(([n, title, body], i) => (
              <Reveal key={n} delay={i * 0.05}>
                <div className="group grid grid-cols-1 gap-x-8 gap-y-2 border-b border-white/10 py-6 transition-colors duration-200 hover:bg-white/[0.03] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
                  <div className="flex items-baseline gap-4">
                    <span className="label tnum text-safety">{n}</span>
                    <h3 className="font-display text-[1.35rem] uppercase leading-[1.1] tracking-[0.015em]">
                      {title}
                    </h3>
                  </div>
                  <p className="max-w-[54ch] text-[0.92rem] leading-[1.7] text-bone/75">{body}</p>
                </div>
              </Reveal>
            ))}
            <p className="mt-8 border-l-2 border-safety bg-white/[0.03] px-5 py-4 font-mono text-[0.72rem] leading-[1.9] tracking-[0.05em] text-bone/65">
              NOTE — THE QUALITY MANAGEMENT CENTER IS THE SINGLE SOURCE FOR CLIENT EQUIPMENT DATA
              MONITORING (CF EXPIRY DATES), PROJECT MONITORING, DOCUMENT PREPARATION FOR APPROVAL,
              INSPECTION PLANS, WELDER AND WELDING RECORDS, ALL RELATED PROCEDURES AND MATERIAL
              SPECIFICATIONS, TEST RESULTS AND CERTIFICATES. EVERY JOB FILE STAYS THERE, IN ORDER,
              FROM DEFECT LIST TO SIGNED-OFF HANDOVER.
            </p>
          </div>
        </div>

        {/* quality policy — Section 1.0 of the QA/QC manual, printed on the page */}
        <div
          id="quality-policy"
          className="mt-16 scroll-mt-24 border-t border-white/15 pt-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="label text-safety">Section 1.0 · Quality Policy</span>
            <span className="label text-bone/45">QA/QC manual · communicated to all</span>
          </div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <h3 className="display text-[clamp(1.6rem,3.4vw,2.4rem)]">
              The <span className="text-safety">Quality Policy</span> we work to
            </h3>
            <button
              type="button"
              onClick={() => window.print()}
              className="print:hidden inline-flex items-center justify-center gap-3 border border-white/25 px-6 py-3.5 font-display text-[1.05rem] uppercase leading-none tracking-[0.06em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
            >
              Print this policy as PDF
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
                <path d="M4.5 6V2.5h7V6M4.5 12H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1.5M4.5 9.5h7v4h-7z" />
              </svg>
            </button>
          </div>

          <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-[1.75] text-bone/85">
            Freeskills Engineering (M) Sdn Bhd is committed to delivering safe, reliable,
            and high-quality new, repair, maintenance, and fabrication services for
            pressure vessels.
          </p>
          <p className="mt-4 font-display text-[1.35rem] uppercase tracking-[0.02em] text-bone">
            To achieve this, we pledge to:
          </p>

          <ol className="mt-6 border-t border-white/15">
            {QUALITY_POLICY_PLEDGES.map(([n, title, body]) => (
              <li
                key={n}
                className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-white/10 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
              >
                <div className="flex items-baseline gap-4">
                  <span className="label tnum text-safety">{n}</span>
                  <h4 className="font-display text-[1.35rem] uppercase leading-[1.1] tracking-[0.015em]">
                    {title}
                  </h4>
                </div>
                <p className="max-w-[54ch] text-[0.92rem] leading-[1.7] text-bone/75">{body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-14">
            <div>
              <p className="max-w-[62ch] text-[0.98rem] leading-[1.72] text-bone/75">
                This policy is communicated to all employees and is reviewed annually for
                continuing suitability.
              </p>
              <p className="mt-5 border-l-2 border-safety bg-white/[0.03] px-5 py-4 font-mono text-[0.72rem] leading-[1.9] tracking-[0.05em] text-bone/65">
                NOTE — ISO 9001:2015 CLAUSE 5.2: THE QUALITY POLICY MUST BE COMMUNICATED,
                UNDERSTOOD, AND APPLIED THROUGHOUT THE ORGANIZATION. REFER TO SECTION 15.0
                FOR TRAINING AND COMMUNICATION RECORDS.
              </p>
            </div>

            {/* approval block — mirrors the signature panel of the manual */}
            <div className="border border-white/12 bg-steel-800/50 p-6">
              <span className="label text-bone/45">Approved by</span>
              <p className="mt-4 font-display text-[1.3rem] uppercase leading-tight tracking-[0.02em] text-bone">
                Freeskills Engineering (M) Sdn Bhd
              </p>
              <div className="mt-6 border-t border-white/15 pt-4">
                <div className="grid grid-cols-1 gap-x-4 py-1.5 sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
                  <span className="label pt-1 text-bone/45">Name</span>
                  <span className="text-[0.92rem] leading-[1.6] text-bone/85">Nazwan Sarbini</span>
                </div>
                <div className="grid grid-cols-1 gap-x-4 py-1.5 sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
                  <span className="label pt-1 text-bone/45">Designation</span>
                  <span className="text-[0.92rem] leading-[1.6] text-bone/85">Managing Director</span>
                </div>
                <div className="grid grid-cols-1 gap-x-4 py-1.5 sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
                  <span className="label pt-1 text-bone/45">Date</span>
                  <span className="text-[0.92rem] leading-[1.6] text-bone/85">_______________</span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-7 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.12em] text-bone/45">
            Freeskills Engineering (M) Sdn Bhd · QA/QC manual · Section 1.0 — Quality Policy
          </p>
        </div>

        {/* code list — the code books Freeskills owns */}
        <div className="mt-16 border-t border-white/15 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="label text-safety">Code list · codes we own</span>
            <span className="label text-bone/45">Reference standards &amp; statutes</span>
          </div>
          <h3 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)]">
            The code books <span className="text-safety">Freeskills works to</span>
          </h3>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CODE_BOOKS.map((c, i) => (
              <div
                key={c.file}
                className="flex w-full items-center gap-4 border border-white/12 bg-steel-800/50 px-5 py-4"
              >
                <span className="label tnum text-safety">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.15rem] uppercase leading-tight tracking-[0.02em] text-bone">
                    {c.title}
                  </span>
                  <span className="mt-1 block font-mono text-[0.7rem] uppercase leading-snug tracking-[0.1em] text-bone/50">
                    {c.tag}
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 text-bone/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <path d="M14 3v5h5" />
                </svg>
              </div>
            ))}
          </div>

          <p className="mt-5 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.12em] text-bone/45">
            Controlled copies held at the Menglembu workshop · reference copies available on request
          </p>
        </div>

        {showDemo && (
          <div
            id="qms-demo"
            role="region"
            aria-label="How a job runs in the Quality Management Center"
            className="mt-14 border-t border-white/15 pt-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="label text-safety">
                Demo — how a job runs in the system
              </span>
              <button
                type="button"
                onClick={() => setShowDemo(false)}
                className="label text-bone/55 transition-colors duration-200 hover:text-safety"
              >
                Close ×
              </button>
            </div>

            <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-stretch">
              {DEMO_STEPS.map(([n, title, body], i) => (
                <Fragment key={n}>
                  <article className="flex flex-1 flex-col rounded-[4px] border border-white/12 bg-steel-800/50 p-5 transition-colors duration-200 hover:border-oxide/60">
                    <span className="label tnum text-safety">{n}</span>
                    <h3 className="mt-3 font-display text-[1.25rem] uppercase leading-tight tracking-[0.02em] text-bone">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-[0.87rem] leading-[1.65] text-bone/75">{body}</p>
                  </article>
                  {i < DEMO_STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="flex shrink-0 items-center justify-center self-center font-mono text-[1.3rem] leading-none text-oxide"
                    >
                      <span className="lg:hidden">↓</span>
                      <span className="hidden lg:inline">→</span>
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SAFETY & HEALTH                                                   */
/* ================================================================== */
const SAFETY_FACTS: [string, string][] = [
  ["Standard", "OSHA 1994 (Act 514) & Factories & Machinery Act 1967"],
  ["Manual", "FSESB-SHM-002-26 · Safety Manual"],
  ["Leadership", "Designated OSH Coordinator · Safety Committee chaired by the Managing Director"],
  ["Assessment", "HIRARC — hazard identification, risk assessment and risk control — for every work activity"],
  ["Emergency", "ERP drills · first aiders · liaison with the client's emergency response team"],
];

const SAFETY_COMMITMENTS: [string, string, string][] = [
  [
    "01",
    "Procedures & PPE discipline",
    "Every worker follows the safe operating procedure for the task and wears mandatory PPE — 100% compliance, every shift, in the workshop and on site.",
  ],
  [
    "02",
    "Report unsafe conditions",
    "Any unsafe condition, equipment malfunction or near-miss is reported to the supervisor immediately, under a no-blame reporting culture.",
  ],
  [
    "03",
    "Stop work authority",
    "Every worker has the absolute right, without fear of retaliation, to stop work they believe poses an imminent hazard to life, health or structural integrity.",
  ],
];

const SAFE_SYSTEMS: [string, string][] = [
  [
    "Permit-to-work",
    "Hot work, confined space and working-at-height permits issued per job before any high-risk activity begins.",
  ],
  [
    "Confined space entry",
    "Atmospheric testing, continuous ventilation, a constant attendant and a standby rescue team for vessel and furnace entry.",
  ],
  [
    "Hot work control",
    "Atmospheric monitoring, fire watch, spark containment and flammable-zone clearance for welding and gouging.",
  ],
  [
    "Lifting & handling",
    "Certified riggers, lifting plans and craneage inspection under strict load management to prevent dropped objects and crush injuries.",
  ],
];

/* 1.0 Core Commitments — copied from the DOSH presentation's statement slide */
const CORE_COMMITMENTS: { key: string; title: string; items: ReactNode[] }[] = [
  {
    key: "a)",
    title: "Legal Compliance",
    items: [
      <>
        Adhere to <strong>Malaysian OSHA</strong> and <strong>Factories &amp; Machinery Act (FMA)</strong>
      </>,
      <>
        Comply with <strong>DOSH / JKKP regulations</strong>
      </>,
      <>
        Follow <strong>international standards</strong> (ASME, National Board codes)
      </>,
    ],
  },
  {
    key: "c)",
    title: "Safe Systems of Work",
    items: [
      <>
        <strong>Permit-To-Work (PTW)</strong> for high-risk activities
      </>,
      "Confined Space Entry (vessels / furnace)",
      "Hot Work (welding / gouging)",
      "Pressure Testing (hydrostatic / pneumatic)",
    ],
  },
  {
    key: "b)",
    title: "Risk Management (HIRARC)",
    items: [
      "Hazard Identification",
      "Risk Assessment",
      "Risk Control",
      <>
        Implement control measures <strong>before</strong> any work begins
      </>,
    ],
  },
  {
    key: "d)",
    title: "Competency & Training",
    items: [
      <>
        All personnel must be <strong>formally trained</strong>
      </>,
      <>
        <strong>DOSH-certified</strong> where required
      </>,
      <>
        <strong>Physically fit</strong> for designated tasks
      </>,
      "Includes: welders, confined space attendants, supervisors",
    ],
  },
];

const COMMITMENT_IMPROVEMENTS: ReactNode[] = [
  "Review safety performance regularly",
  "Monitor accident metrics",
  "Update engineering procedures",
  <>
    <strong>Elevate safety standards</strong> continuously
  </>,
];

const COMMITMENT_STATUTES: string[] = ["OSHA 1994", "FMA 1967", "DOSH / JKKP"];

export function Safety() {
  const [committeeOpen, setCommitteeOpen] = useState(false);

  return (
    <section id="safety" className="paper-rule scroll-mt-20 bg-paper text-ink">
      <div className="mx-auto w-full max-w-[86rem] px-5 py-24 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <StampedLabel index="05" tone="paper">
                Safety &amp; Health
              </StampedLabel>
              <button
                type="button"
                onClick={() => setCommitteeOpen(true)}
                aria-haspopup="dialog"
                className="group inline-flex items-center gap-2 border border-ink/25 px-3 py-1.5 font-mono text-[0.68rem] uppercase leading-none tracking-[0.14em] text-ink/70 transition-colors duration-200 hover:border-oxide hover:text-oxide"
              >
                Safety committee chart
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <h2 className="display mt-6 text-[clamp(2.25rem,6vw,4.8rem)]">
              Safety
              <br />
              <span className="text-oxide">above all</span>
            </h2>
            <p className="mt-7 max-w-[46ch] text-[1.02rem] leading-[1.72] text-ink/75">
              No task outranks the safety of people and plant. Our OSH policy — signed by the
              Managing Director — commits the company to no operation that risks injury to people,
              damage to plant or harm to the environment, managed under OSHA 1994 (Act 514) and the
              Factories &amp; Machinery Act 1967, and audited by DOSH.
            </p>

            <dl className="mt-9 border-t-2 border-ink/70">
              {SAFETY_FACTS.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-ink/15 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
                >
                  <dt className="label pt-1 text-ink/65">{k}</dt>
                  <dd className="text-[0.92rem] leading-[1.6] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <div className="grid grid-cols-1 border-b-2 border-ink/70 pb-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
              <div className="label text-ink/65">Commitment</div>
              <div className="label hidden text-ink/65 sm:block">What it means on the job</div>
            </div>
            {SAFETY_COMMITMENTS.map(([n, title, body], i) => (
              <Reveal key={n} delay={i * 0.05}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-ink/15 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
                  <div className="flex items-baseline gap-4">
                    <span className="label tnum text-oxide">{n}</span>
                    <h3 className="font-display text-[1.35rem] uppercase leading-[1.1] tracking-[0.015em]">
                      {title}
                    </h3>
                  </div>
                  <p className="max-w-[54ch] text-[0.92rem] leading-[1.7] text-ink/75">{body}</p>
                </div>
              </Reveal>
            ))}

            <h3 className="mt-10 font-display text-[1.7rem] uppercase leading-none tracking-[0.02em] text-ink">
              Safe systems of work
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {SAFE_SYSTEMS.map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-[4px] border border-ink/15 bg-[#f7f3ea] p-5 transition-colors duration-200 hover:border-ink/30"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-oxide"
                      aria-hidden="true"
                    />
                    <h4 className="font-display text-[1.2rem] uppercase leading-tight tracking-[0.02em] text-ink">
                      {title}
                    </h4>
                  </div>
                  <p className="mt-2.5 text-[0.9rem] leading-[1.65] text-ink/75">{body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 border-l-2 border-oxide bg-ink/[0.04] px-5 py-4 font-mono text-[0.72rem] leading-[1.9] tracking-[0.05em] text-ink/70">
              NOTE — DAILY PRE-TASK TOOLBOX TALKS, 100% MANDATORY PPE, A NO-BLAME NEAR-MISS REPORTING
              CULTURE AND STOP WORK AUTHORITY FOR EVERY WORKER. PRESSURE TESTING IS CONTROLLED AND
              WITNESSED BY A DOSH INSPECTING OFFICER OR DESIGNATED REPRESENTATIVE.
            </p>
          </div>
        </div>

        {/* ---- commitment statement (1.0 Core Commitments) ---- */}
        <div className="mt-16 border-t-2 border-ink/70 pt-9">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="display text-[clamp(1.7rem,3.6vw,2.6rem)]">
              Safety &amp; Health <span className="text-oxide">Commitment Statement</span>
            </h3>
            <div className="sm:text-right">
              <span className="label block text-ink/65">1.0 Core Commitments</span>
              <span className="label tnum mt-1.5 block text-oxide">
                Safety Manual No. FSESB-SHM-002-26
              </span>
            </div>
          </div>
          <p className="mt-3 max-w-[72ch] text-[0.98rem] leading-[1.7] text-ink/70">
            The standards we hold ourselves to on every boiler and pressure vessel job.
          </p>

          <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)]">
            {/* statement */}
            <div className="flex flex-col justify-between rounded-[4px] border border-oxide/35 bg-gradient-to-b from-[#f7f3ea] to-oxide/[0.06] p-6">
              <div>
                <p className="text-[1rem] leading-[1.72] text-ink/85">
                  <strong className="font-display text-[1.15rem] text-oxide">
                    Freeskills Engineering (M) Sdn. Bhd.
                  </strong>{" "}
                  is fully committed to providing and maintaining a safe, healthy, and compliant
                  working environment for all employees, contractors, clients, and visitors.
                </p>
                <p className="mt-4 text-[1rem] leading-[1.72] text-ink/85">
                  As a specialist in{" "}
                  <strong className="text-ink">Boiler and Pressure Vessel Repair</strong>, we
                  recognize that our operations involve high-risk tasks, including heavy fabrication,
                  high-pressure testing, hot work, and confined space entries. We treat safety not
                  merely as a regulatory requirement, but as a{" "}
                  <strong className="text-oxide">core value</strong> guiding every engineering
                  practice we undertake.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-ink/20 pt-4">
                {COMMITMENT_STATUTES.map((s) => (
                  <span
                    key={s}
                    className="label border border-ink/25 px-2.5 py-1.5 text-ink/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* core commitments requirements */}
            <div className="rounded-[4px] border border-ink/15 bg-[#f7f3ea] p-6">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-ink/20 pb-3">
                <span className="label text-oxide">1.0 Core Commitments</span>
                <span className="label text-ink/55">Safety &amp; Health Requirements</span>
              </div>

              <div className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {CORE_COMMITMENTS.map((g) => (
                  <div key={g.key}>
                    <div className="flex items-baseline gap-2">
                      <span className="label tnum text-oxide">{g.key}</span>
                      <h4 className="font-display text-[1.15rem] uppercase leading-tight tracking-[0.02em] text-ink">
                        {g.title}
                      </h4>
                    </div>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-6 text-[0.88rem] leading-[1.6] text-ink/75">
                      {g.items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-ink/20 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="label tnum text-oxide">e)</span>
                  <h4 className="font-display text-[1.15rem] uppercase leading-tight tracking-[0.02em] text-ink">
                    Continuous Improvement
                  </h4>
                </div>
                <div className="mt-2.5 grid gap-x-6 gap-y-2 pl-6 text-[0.88rem] leading-[1.6] text-ink/75 sm:grid-cols-2 lg:grid-cols-4">
                  {COMMITMENT_IMPROVEMENTS.map((it, i) => (
                    <span key={i}>{it}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SafetyCommitteeModal open={committeeOpen} onClose={() => setCommitteeOpen(false)} />
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
        <StampedLabel index="06">Job flow</StampedLabel>
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
        <StampedLabel index="07" tone="paper">
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
