import {
  Capability,
  Compliance,
  Contact,
  Flow,
  Hero,
  Works,
} from "./components/sections";

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
const NAV = [
  ["Capability", "#capability"],
  ["Works", "#works"],
  ["Compliance", "#compliance"],
  ["Job flow", "#flow"],
  ["Contact", "#contact"],
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-steel-900/92 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[86rem] items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img
            src="images/logo.png"
            alt=""
            width={80}
            height={51}
            className="h-9 w-auto"
          />
          <span className="leading-none">
            <span className="block font-display text-[1.02rem] uppercase leading-none tracking-[0.07em] text-bone sm:text-[1.18rem] sm:tracking-[0.09em]">
              <span className="text-oxide-light">Freeskills</span> Engineering
            </span>
            <span className="label mt-1.5 block text-bone/60">
              (M) Sdn Bhd · 1502941-H
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="label text-bone/60 transition-colors duration-200 hover:text-safety"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+60164100464"
          className="flex items-center gap-2 bg-oxide px-4 py-2.5 font-mono text-[0.78rem] tracking-[0.06em] text-paper transition-colors duration-200 hover:bg-oxide-light sm:px-5"
        >
          <span className="label opacity-80">Tel</span>
          <span className="tnum hidden sm:inline">+60 16 410 0464</span>
          <span className="font-display text-[1.05rem] uppercase tracking-[0.08em] sm:hidden">
            Call
          </span>
        </a>
      </div>
    </header>
  );
}

/* ---------------- footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-steel-800 text-bone">
      <div className="mx-auto w-full max-w-[86rem] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="images/logo.png"
                alt=""
                width={80}
                height={51}
                className="h-11 w-auto"
              />
              <div>
                <div className="font-display text-[1.5rem] uppercase leading-none tracking-[0.07em]">
                  <span className="text-oxide-light">Freeskills</span> Engineering
                </div>
                <div className="label mt-1.5 text-bone/50">(M) Sdn Bhd · 1502941-H</div>
              </div>
            </div>
            <p className="mt-6 max-w-[42ch] text-[0.95rem] leading-[1.72] text-bone/65">
              Boiler and pressure vessel repairer and general fabrication of steel structures.
              Workshop and on-site service from Menglembu, Ipoh, Perak.
            </p>
          </div>

          <div>
            <div className="label text-safety">Works address</div>
            <address className="mt-4 whitespace-pre-line font-mono text-[0.78rem] not-italic leading-[1.85] tracking-[0.05em] text-bone/70">
              {"Lot 01 & 02, Hala Perusahaan Kledang Utara 6,\nMenglembu, 31450 Ipoh,\nPerak Darul Ridzuan, Malaysia"}
            </address>
          </div>

          <div>
            <div className="label text-safety">Contact</div>
            <ul className="mt-4 space-y-2 font-mono text-[0.78rem] tracking-[0.05em] text-bone/70">
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
