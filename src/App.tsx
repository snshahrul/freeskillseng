import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Capability,
  Compliance,
  Contact,
  Flow,
  Hero,
  Works,
} from "./components/sections";

const NAV: [string, string][] = [
  ["Capability", "#capability"],
  ["Works", "#works"],
  ["Compliance", "#compliance"],
  ["Job flow", "#flow"],
  ["Contact", "#contact"],
];

/* ---------------- fixed left spec rail (desktop) ---------------- */
function SpecRail() {
  return (
    <aside
      aria-hidden="true"
      className="fixed inset-y-0 left-0 z-40 hidden w-16 flex-col items-center justify-between border-r border-white/10 bg-steel-800 py-6 lg:flex"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="rivet h-2.5 w-2.5 rounded-full" />
        <span className="h-10 w-px bg-white/15" />
        <span className="rivet h-2.5 w-2.5 rounded-full" />
      </div>

      <div className="vlabel label whitespace-nowrap text-bone/60">
        REG. 1502941-H &nbsp;·&nbsp; MENGLEMBU · IPOH · PERAK
      </div>

      <div className="flex flex-col items-center gap-5">
        <span className="rivet h-2.5 w-2.5 rounded-full" />
        <span className="h-10 w-px bg-white/15" />
        <span className="rivet h-2.5 w-2.5 rounded-full" />
      </div>
    </aside>
  );
}

/* ---------------- header ---------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const reduce = useReducedMotion();

  /* scroll state + active section (scroll spy) */
  useEffect(() => {
    const targets = NAV.map(([, href]) => document.getElementById(href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );

    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const el of targets) {
        if (el.getBoundingClientRect().top + window.scrollY <= probe) current = el.id;
      }
      setActive(current);
    };

    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* mobile menu: lock scroll, close on Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-white/10 bg-steel-900/95 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.9)]"
          : "border-white/5 bg-steel-900/70"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[86rem] items-center justify-between gap-5 px-5 sm:px-8 lg:h-[4.75rem]">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <img
            src="images/logo.png"
            alt=""
            width={70}
            height={41}
            className="h-9 w-auto sm:h-10"
          />
          <span className="leading-none">
            <span className="block font-display text-[1.15rem] uppercase leading-none tracking-[0.06em] text-bone sm:text-[1.25rem] lg:text-[1.35rem]">
              <span className="text-oxide-light">Freeskills</span> Engineering
            </span>
            <span className="mt-1.5 block font-mono text-[0.62rem] uppercase leading-none tracking-[0.14em] text-bone/55 lg:text-[0.66rem]">
              (M) Sdn Bhd · 1502941-H
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {NAV.map(([label, href]) => {
            const on = active === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                aria-current={on ? "true" : undefined}
                className={`label relative py-2 transition-colors duration-200 ${
                  on ? "text-bone" : "text-bone/55 hover:text-safety"
                }`}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-oxide transition-transform duration-300 ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <a
            href="#contact"
            className="hidden items-center justify-center bg-oxide px-5 py-2.5 font-display text-[1.05rem] uppercase leading-none tracking-[0.07em] text-paper transition-colors duration-200 hover:bg-oxide-light sm:inline-flex"
          >
            Get a quote
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-bone transition-colors duration-200 hover:border-safety hover:text-safety xl:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile / tablet menu */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="site-menu"
            key="site-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-steel-800 xl:hidden"
          >
            <nav
              className="mx-auto flex w-full max-w-[86rem] flex-col px-5 pb-7 pt-2 sm:px-8"
              aria-label="Menu"
            >
              {NAV.map(([label, href], i) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-white/10 py-4 font-display text-[1.45rem] uppercase leading-none tracking-[0.04em] text-bone transition-colors duration-200 hover:text-safety"
                >
                  {label}
                  <span className="label tnum text-bone/40 transition-colors group-hover:text-safety/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              ))}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+60164100464"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3.5 font-display text-[1.1rem] uppercase leading-none tracking-[0.06em] text-bone transition-colors duration-200 hover:border-safety hover:text-safety"
                >
                  Call +60 16 410 0464
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-oxide px-6 py-3.5 font-display text-[1.1rem] uppercase leading-none tracking-[0.06em] text-paper transition-colors duration-200 hover:bg-oxide-light"
                >
                  Get a written quote
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------- footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-steel-800 text-bone">
      <div className="mx-auto w-full max-w-[86rem] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="images/logo.png"
                alt=""
                width={70}
                height={41}
                className="h-11 w-auto"
              />
              <div>
                <div className="font-display text-[1.45rem] uppercase leading-none tracking-[0.07em]">
                  <span className="text-oxide-light">Freeskills</span> Engineering
                </div>
                <div className="label mt-1.5 text-bone/50">(M) Sdn Bhd · 1502941-H</div>
              </div>
            </div>
            <p className="mt-6 max-w-[42ch] text-[1.02rem] leading-[1.72] text-bone/65">
              Boiler and pressure vessel repairer and general fabrication of steel structures.
              Workshop and on-site service from Menglembu, Ipoh, Perak.
            </p>
          </div>

          <div>
            <div className="label text-safety">Sections</div>
            <ul className="mt-4 space-y-2.5">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[0.95rem] text-bone/70 transition-colors duration-200 hover:text-safety"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label text-safety">Works address</div>
            <address className="mt-4 whitespace-pre-line font-mono text-[0.86rem] not-italic leading-[1.85] tracking-[0.04em] text-bone/70">
              {"Lot 01 & 02, Hala Perusahaan Kledang Utara 6,\nMenglembu, 31450 Ipoh,\nPerak Darul Ridzuan, Malaysia"}
            </address>
          </div>

          <div>
            <div className="label text-safety">Contact</div>
            <ul className="mt-4 space-y-2 font-mono text-[0.86rem] tracking-[0.04em] text-bone/70">
              <li>
                <a
                  href="tel:+60164100464"
                  className="transition-colors duration-200 hover:text-safety"
                >
                  +60 16 410 0464
                </a>
              </li>
              <li>
                <a
                  href="mailto:freeskillseng@gmail.com"
                  className="transition-colors duration-200 hover:text-safety"
                >
                  freeskillseng@gmail.com
                </a>
              </li>
              <li className="pt-4 text-bone/50">Mon – Sat · 8:30 am – 6:00 pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-bone/55">
            © {new Date().getFullYear()} Freeskills Engineering (M) Sdn Bhd. All rights reserved.
          </p>
          <p className="label text-bone/55">
            Boiler &amp; Pressure Vessel Repairer · Steel Structure Fabrication
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div id="top" className="relative min-h-screen bg-steel-900 font-body text-bone lg:pl-16">
      <SpecRail />
      <Header />
      <main>
        <Hero />
        <Capability />
        <Works />
        <Compliance />
        <Flow />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
