/* One-off generator: builds the marketing/company deck from the website content.
   Run from the project root:  bun tools/make-deck.mjs
   Output: public/Freeskills-Engineering-Deck.pptx  (served by the preview)   */

import pptxgen from "pptxgenjs";

/* ---------- palette (matches src/index.css) ---------- */
const C = {
  steel900: "14181C",
  steel800: "1D242B",
  steel700: "2A333B",
  paper: "EDE9E1",
  paperAlt: "F7F3EA",
  ink: "22262A",
  oxide: "C4441F",
  oxideLight: "A31C0D",
  safety: "F2B705",
  bone: "E7E2D8",
  bone70: "A9A69E",
  bone45: "7C8480",
};

const DISPLAY = "Arial Narrow";
const BODY = "Arial";
const MONO = "Consolas";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9"; // 10 x 5.625 in
pptx.author = "Freeskills Engineering (M) Sdn Bhd";
pptx.company = "Freeskills Engineering (M) Sdn Bhd";
pptx.title = "Freeskills Engineering — Website & QMS Overview";

const FOOT = "FREESKILLS ENGINEERING (M) SDN BHD  ·  REG 1502941-H  ·  MENGLEMBU · IPOH · PERAK";

pptx.defineSlideMaster({
  title: "DARK",
  background: { color: C.steel900 },
  objects: [
    { rect: { x: 0, y: 5.36, w: 10, h: 0.265, fill: { color: C.steel800 } } },
    {
      text: {
        text: FOOT,
        options: { x: 0.55, y: 5.36, w: 7.6, h: 0.265, fontFace: MONO, fontSize: 7, color: C.bone45, charSpacing: 1, valign: "middle" },
      },
    },
    {
      text: {
        text: "qmc.freeskillengineering.com",
        options: { x: 7.4, y: 5.36, w: 1.85, h: 0.265, fontFace: MONO, fontSize: 7, color: C.bone45, align: "right", valign: "middle" },
      },
    },
    { slideNumber: { x: 9.35, y: 5.36, w: 0.4, h: 0.265, color: C.safety, fontFace: MONO, fontSize: 8, align: "right", valign: "middle" } },
  ],
});

pptx.defineSlideMaster({
  title: "LIGHT",
  background: { color: C.paper },
  objects: [
    { rect: { x: 0, y: 5.36, w: 10, h: 0.265, fill: { color: "E1DACD" } } },
    {
      text: {
        text: FOOT,
        options: { x: 0.55, y: 5.36, w: 7.6, h: 0.265, fontFace: MONO, fontSize: 7, color: "6E7479", charSpacing: 1, valign: "middle" },
      },
    },
    {
      text: {
        text: "freeskillengineering.com",
        options: { x: 7.4, y: 5.36, w: 1.85, h: 0.265, fontFace: MONO, fontSize: 7, color: "6E7479", align: "right", valign: "middle" },
      },
    },
    { slideNumber: { x: 9.35, y: 5.36, w: 0.4, h: 0.265, color: C.oxide, fontFace: MONO, fontSize: 8, align: "right", valign: "middle" } },
  ],
});

/* ---------- helpers ---------- */
const dark = { masterName: "DARK" };
const light = { masterName: "LIGHT" };

function kicker(s, text, darkTheme = true) {
  s.addText(text.toUpperCase(), {
    x: 0.55, y: 0.34, w: 8.9, h: 0.26, fontFace: MONO, fontSize: 9, charSpacing: 2.5,
    color: darkTheme ? C.safety : C.oxide, bold: true,
  });
  s.addShape(pptx.ShapeType.line, {
    x: 0.55, y: 0.66, w: 1.4, h: 0, line: { color: darkTheme ? C.safety : C.oxide, width: 2 },
  });
}

function titleRuns(s, runs, { y = 0.82, size = 30, h = 1.0, darkTheme = true } = {}) {
  s.addText(
    runs.map((r) => ({ text: r.t, options: { color: r.c || (darkTheme ? C.bone : C.ink), breakLine: r.br || false } })),
    { x: 0.5, y, w: 9, h, fontFace: DISPLAY, fontSize: size, bold: true, valign: "top", lineSpacingMultiple: 0.95 },
  );
}

function box(s, { x, y, w, h, fill, line, round = true }) {
  s.addShape(round ? pptx.ShapeType.roundRect : pptx.ShapeType.rect, {
    x, y, w, h,
    fill: fill ? { color: fill } : { type: "none" },
    line: line ? { color: line.color, width: line.width || 1 } : { color: "FFFFFF", width: 0, transparency: 100 },
    rectRadius: 0.04,
  });
}

/* card with heading + body text */
function card(s, { x, y, w, h, idx, title, body, accent = C.safety, fill = C.steel800, darkTheme = true, titleSize = 12.5, bodySize = 9.5 }) {
  box(s, { x, y, w, h, fill, line: { color: darkTheme ? "3A444D" : "C9C2B4" } });
  let ty = y + 0.14;
  if (idx) {
    s.addText(idx, { x: x + 0.16, y: ty, w: 0.6, h: 0.22, fontFace: MONO, fontSize: 8.5, bold: true, color: accent });
    ty += 0.24;
  }
  s.addText(title, {
    x: x + 0.16, y: ty, w: w - 0.32, h: 0.5, fontFace: DISPLAY, fontSize: titleSize, bold: true,
    color: darkTheme ? C.bone : C.ink, valign: "top", lineSpacingMultiple: 0.98,
  });
  const lines = Math.ceil(title.length / Math.max(8, Math.floor((w - 0.32) / (titleSize * 0.0079))));
  ty += Math.min(0.5, 0.24 * lines + 0.04);
  if (body) {
    s.addText(body, {
      x: x + 0.16, y: ty, w: w - 0.32, h: y + h - ty - 0.12, fontFace: BODY, fontSize: bodySize,
      color: darkTheme ? C.bone70 : "55595E", valign: "top", lineSpacingMultiple: 1.12,
    });
  }
}

function noteBox(s, { x, y, w, h, text, darkTheme = true }) {
  s.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color: darkTheme ? C.steel800 : "E6E0D3", transparency: darkTheme ? 40 : 0 },
    line: { color: darkTheme ? C.safety : C.oxide, width: 0 },
  });
  s.addShape(pptx.ShapeType.rect, { x, y, w: 0.05, h, fill: { color: darkTheme ? C.safety : C.oxide }, line: { width: 0 } });
  s.addText(text, {
    x: x + 0.18, y: y + 0.08, w: w - 0.34, h: h - 0.16, fontFace: MONO, fontSize: 8,
    color: darkTheme ? C.bone70 : "55595E", valign: "middle", lineSpacingMultiple: 1.25, charSpacing: 0.4,
  });
}

function numberedRow(s, { x, y, w, n, head, body, darkTheme = true, headW = 0.55, headSize = 11.5, bodySize = 9.5, h = 0.62 }) {
  s.addText(n, { x, y, w: headW, h: 0.3, fontFace: MONO, fontSize: 9, bold: true, color: darkTheme ? C.safety : C.oxide });
  s.addText(head, {
    x: x + headW, y: y - 0.02, w: 3.3, h: h, fontFace: DISPLAY, fontSize: headSize, bold: true,
    color: darkTheme ? C.bone : C.ink, valign: "top", lineSpacingMultiple: 1.0,
  });
  s.addText(body, {
    x: x + headW + 3.4, y: y - 0.02, w: w - headW - 3.4, h: h, fontFace: BODY, fontSize: bodySize,
    color: darkTheme ? C.bone70 : "55595E", valign: "top", lineSpacingMultiple: 1.08,
  });
  s.addShape(pptx.ShapeType.line, {
    x, y: y + h - 0.06, w, h: 0, line: { color: darkTheme ? "333C44" : "D3CCBE", width: 0.75 },
  });
}

function bullets(s, { x, y, w, h, items, darkTheme = true, size = 10, color }) {
  s.addText(
    items.map((t) => ({ text: t, options: { bullet: { characterCode: "25AA" }, color: color || (darkTheme ? C.bone : C.ink), breakLine: true } })),
    {
      x, y, w, h, fontFace: BODY, fontSize: size, valign: "top",
      lineSpacingMultiple: 1.1, paraSpaceAfter: 6,
    },
  );
}

/* ================================================================== */
/*  SLIDE 1 — TITLE                                                    */
/* ================================================================== */
{
  const s = pptx.addSlide({ masterName: "DARK" });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.16, h: 5.625, fill: { color: C.oxide } });
  s.addImage({ path: "public/images/logo.png", x: 0.6, y: 0.55, w: 1.5, h: 0.88 });
  s.addText("WEBSITE & SYSTEM PRESENTATION", {
    x: 0.62, y: 1.7, w: 8.8, h: 0.3, fontFace: MONO, fontSize: 10.5, charSpacing: 3, color: C.safety, bold: true,
  });
  s.addText(
    [
      { text: "FREESKILLS", options: { color: C.oxide, breakLine: true } },
      { text: "ENGINEERING (M) SDN BHD", options: { color: C.bone } },
    ],
    { x: 0.55, y: 2.1, w: 9, h: 1.7, fontFace: DISPLAY, fontSize: 52, bold: true, lineSpacingMultiple: 0.92, valign: "top" },
  );
  s.addText("Boiler & Pressure Vessel Repairer  ·  General Steel Fabrication", {
    x: 0.62, y: 3.85, w: 8.8, h: 0.4, fontFace: DISPLAY, fontSize: 19, bold: true, color: C.bone70,
  });
  s.addShape(pptx.ShapeType.line, { x: 0.62, y: 4.4, w: 3.2, h: 0, line: { color: "3A444D", width: 1 } });
  s.addText("Website structure · Quality Management Center · job processes  —  a guided walk-through of the public site and the cloud system behind it.", {
    x: 0.62, y: 4.55, w: 8.4, h: 0.6, fontFace: BODY, fontSize: 11.5, color: C.bone70, lineSpacingMultiple: 1.2,
  });
}

/* ================================================================== */
/*  SLIDE 2 — COMPANY DATA PLATE                                       */
/* ================================================================== */
{
  const s = pptx.addSlide(dark);
  kicker(s, "00 · Company data plate");
  titleRuns(s, [{ t: "THE COMPANY, " }, { t: "AT A GLANCE", c: C.oxide }], { size: 30 });

  const rows = [
    ["COMPANY", "Freeskills Engineering (M) Sdn Bhd"],
    ["REG. NO.", "1502941-H"],
    ["FAC. REG. NO.", "JKKP/PK/2026/265610"],
    ["CLASS", "Boiler & Pressure Vessel Repairer"],
    ["WORKS", "Lot 01 & 02, Hala Perusahaan Kledang Utara 6"],
    ["DISTRICT", "Menglembu 31450 · Ipoh · Perak Darul Ridzuan"],
    ["TELEPHONE", "+60 16 410 0464"],
    ["EMAIL", "freeskillseng@gmail.com"],
    ["HOURS", "Monday – Saturday, 8:30 am – 6:00 pm"],
  ];
  let y = 1.9;
  for (const [k, v] of rows) {
    s.addText(k, { x: 0.55, y, w: 1.9, h: 0.3, fontFace: MONO, fontSize: 9, charSpacing: 1.5, color: C.safety, valign: "middle" });
    s.addText(v, { x: 2.5, y, w: 4.4, h: 0.3, fontFace: BODY, fontSize: 11, color: C.bone, valign: "middle" });
    s.addShape(pptx.ShapeType.line, { x: 0.55, y: y + 0.32, w: 6.35, h: 0, line: { color: "333C44", width: 0.75 } });
    y += 0.36;
  }
  box(s, { x: 7.25, y: 1.9, w: 2.2, h: 2.5, fill: C.steel800, line: { color: "3A444D" } });
  s.addText("SCOPE", { x: 7.45, y: 2.08, w: 1.8, h: 0.25, fontFace: MONO, fontSize: 9, charSpacing: 2, color: C.safety });
  s.addText("Alteration · Repair · Overhaul\nGeneral fabrication\nHydrostatic testing\nOn-site welding\n\nStatute: Factories & Machinery Act 1967", {
    x: 7.45, y: 2.4, w: 1.8, h: 1.9, fontFace: BODY, fontSize: 10, color: C.bone70, lineSpacingMultiple: 1.25, valign: "top",
  });
  s.addText("Data plate values shown on the website hero, taken from the company registration and factory registration records.", {
    x: 0.55, y: 5.0, w: 6.4, h: 0.3, fontFace: BODY, fontSize: 9, italic: true, color: C.bone45,
  });
}

/* ================================================================== */
/*  SLIDE 3 — WHAT'S ON THE WEBSITE (section map)                      */
/* ================================================================== */
{
  const s = pptx.addSlide(light);
  kicker(s, "01 · Website structure", false);
  titleRuns(s, [{ t: "WHAT'S ON " }, { t: "THE WEBSITE", c: C.oxide }], { size: 30, darkTheme: false });

  const head = [
    { text: "SEC", options: { fill: { color: C.ink }, color: C.paper, bold: true, fontFace: MONO, fontSize: 9 } },
    { text: "SECTION", options: { fill: { color: C.ink }, color: C.paper, bold: true, fontFace: MONO, fontSize: 9 } },
    { text: "DETAILS LISTED", options: { fill: { color: C.ink }, color: C.paper, bold: true, fontFace: MONO, fontSize: 9 } },
  ];
  const rows = [
    ["00", "Hero / Home", "Positioning, quote CTA, phone, riveted data plate with the organisation-chart button"],
    ["01", "Capability", "Six service lines (BPV-01…OS-06) + Infrastructure & Facilities panel (6 plant items, Lot 02 photo)"],
    ["02", "Works executed", "Everyday repair scope in 3 trade groups: boiler & pressure equipment, structural steel, piping & site works"],
    ["03", "Compliance & safety", "9 statutory instruments — FMA 1967, 1970 Regulations, Certificate of Fitness, Sec. 29A, ASME PCC-2, NBIC, tests, Reg. 82"],
    ["04", "Quality Management System", "4 control points + in-page 5-step demo of a job running in the Quality Management Center (link to the live app)"],
    ["05", "Safety & health", "OSH policy, 4 safety facts, 3 commitments, 4 safe systems of work, toolbox/PPE note"],
    ["06", "Job flow", "5 steps from defect list to signed-off handover"],
    ["07", "Contact & works address", "Company details, call/email CTAs, interactive OpenStreetMap, access note"],
  ];
  s.addTable(
    [head, ...rows.map(([a, b, c]) => [
      { text: a, options: { fontFace: MONO, fontSize: 9.5, bold: true, color: C.oxide, valign: "middle" } },
      { text: b, options: { fontFace: DISPLAY, fontSize: 11.5, bold: true, color: C.ink, valign: "middle" } },
      { text: c, options: { fontFace: BODY, fontSize: 9.5, color: "55595E", valign: "middle" } },
    ])],
    {
      x: 0.55, y: 1.7, w: 8.9, colW: [0.6, 2.1, 6.2],
      border: { type: "solid", color: "D3CCBE", pt: 0.75 },
      rowH: 0.4, margin: 0.08, valign: "middle", autoPage: false,
    },
  );
}

/* ================================================================== */
/*  SLIDE 4 — CAPABILITY SCHEDULE                                      */
/* ================================================================== */
{
  const s = pptx.addSlide(light);
  kicker(s, "02 · Capability schedule", false);
  titleRuns(s, [{ t: "SIX WORKING LINES, " }, { t: "ONE WORKSHOP", c: C.oxide }], { size: 28, darkTheme: false });

  const caps = [
    ["01", "BPV-01", "Boiler Repair & Overhaul", "Shell and furnace plate replacement, tube renewal, tube plate re-boring, refractory renewal, safety valve overhaul, hydraulic testing.", "Fire-tube · smoke-tube · water-tube"],
    ["02", "BPV-02", "Pressure Vessel Re-certification", "Defect rectification, nozzle and reinforcement pad replacement, dished end repair, hydrostatic certification, DOSH CoF coordination.", "Air receivers · heat exchangers · separators"],
    ["03", "SS-03", "Steel Structure Fabrication", "Platforms, mezzanines, staircases, handrails, machine bases, canopies and structural frames — cut, fitted, welded and painted in-house.", "Mild steel · galvanised · stainless"],
    ["04", "PP-04", "Pressure & Process Piping", "Steam, condensate, compressed air and process line fabrication, installation and repair, incl. supports, manifolds, expansion loops.", "Schedule 40 / 80 carbon steel"],
    ["05", "TF-05", "Tank, Chute & Ducting", "Storage and mixing tanks, hoppers, chutes, cyclones, jacketed vessels and ducting — plate rolling, forming and site erection.", "Plate rolling · forming · welding"],
    ["06", "OS-06", "On-site Welding & Shutdown Support", "Breakdown response and planned shutdown crews for cutting, fitting, welding, alignment, reinstatement and commissioning support.", "Perak · Kedah · Penang · Selangor"],
  ];
  const cw = 2.9, ch = 1.68, gx = 0.1, gy = 0.14, x0 = 0.55, y0 = 1.62;
  caps.forEach((c, i) => {
    const x = x0 + (i % 3) * (cw + gx);
    const y = y0 + Math.floor(i / 3) * (ch + gy);
    box(s, { x, y, w: cw, h: ch, fill: C.paperAlt, line: { color: "C9C2B4" } });
    s.addText(`${c[0]}  ·  ${c[1]}`, { x: x + 0.14, y: y + 0.1, w: cw - 0.28, h: 0.2, fontFace: MONO, fontSize: 8, color: C.oxide, bold: true });
    s.addText(c[2], { x: x + 0.14, y: y + 0.3, w: cw - 0.28, h: 0.44, fontFace: DISPLAY, fontSize: 12.5, bold: true, color: C.ink, lineSpacingMultiple: 0.98, valign: "top" });
    s.addText(c[3], { x: x + 0.14, y: y + 0.74, w: cw - 0.28, h: 0.66, fontFace: BODY, fontSize: 8, color: "55595E", lineSpacingMultiple: 1.08, valign: "top" });
    s.addText(`OUTPUT — ${c[4]}`, { x: x + 0.14, y: y + ch - 0.26, w: cw - 0.28, h: 0.2, fontFace: MONO, fontSize: 7, color: C.ink, charSpacing: 0.5 });
  });
}

/* ================================================================== */
/*  SLIDE 5 — INFRASTRUCTURE & FACILITIES                              */
/* ================================================================== */
{
  const s = pptx.addSlide(dark);
  kicker(s, "03 · Infrastructure & facilities");
  titleRuns(s, [{ t: "BUILT FOR " }, { t: "HEAVY REPAIR WORK", c: C.safety }], { size: 29 });
  s.addText("Dedicated repair workshop at Lot 01 & 02, Menglembu — high-tolerance heavy mechanical operations on boilers and pressure vessels, with an equipment register and calibration certificates on file.", {
    x: 0.55, y: 1.62, w: 5.6, h: 0.75, fontFace: BODY, fontSize: 10.5, color: C.bone70, lineSpacingMultiple: 1.18,
  });
  bullets(s, {
    x: 0.55, y: 2.4, w: 5.7, h: 2.7, size: 10.5, items: [
      "Three covered bays — plate & cylinder storage, materials handling, assembly & fit-up",
      "CNC laser cutting — MPS-D3 system in the dedicated Lot 02 facility",
      "Plate rolling to 12.7 mm — three-roll plate rolling machine (EQ-011)",
      "Machining in-house — precision lathe (EQ-007) and milling machine with DRO (EQ-008)",
      "Welding & cutting — SMAW, GTAW and GMAW per approved WPS · oxy-fuel and air-arc",
      "Calibrated inspection — thickness survey and flaw detection with reference blocks",
    ],
  });
  box(s, { x: 6.55, y: 1.62, w: 2.9, h: 3.5, fill: C.steel800, line: { color: "3A444D" } });
  s.addImage({ path: "public/images/facility-lot02.jpg", x: 6.7, y: 1.77, w: 2.6, h: 1.87 });
  s.addText("LOT 02 · FRONT VIEW FACILITY", { x: 6.7, y: 3.72, w: 2.6, h: 0.2, fontFace: MONO, fontSize: 7.5, charSpacing: 1.5, color: C.safety });
  s.addText("Hala Perusahaan Kledang Utara 6, Menglembu — equipment list & calibration certificates available for evaluation.", {
    x: 6.7, y: 3.98, w: 2.6, h: 1.0, fontFace: BODY, fontSize: 9, color: C.bone70, lineSpacingMultiple: 1.15,
  });
}

/* ================================================================== */
/*  SLIDE 6 — WORKS EXECUTED                                           */
/* ================================================================== */
{
  const s = pptx.addSlide(dark);
  kicker(s, "04 · Works executed");
  titleRuns(s, [{ t: "REPAIRS THAT KEEP " }, { t: "PLANTS RUNNING", c: C.safety }], { size: 29 });
  s.addText("Most work arrives as a defect list, a failed inspection item, or plant that has stopped the line — the everyday scope we take on:", {
    x: 0.55, y: 1.6, w: 8.9, h: 0.4, fontFace: BODY, fontSize: 10.5, color: C.bone70, lineSpacingMultiple: 1.15,
  });

  const groups = [
    ["01", "Boiler & pressure equipment", [
      "Boiler shell plate replacement & patching",
      "Fire-tube and water-tube renewal",
      "Tube plate re-boring and re-tubing",
      "Furnace & combustion chamber repair",
      "Refractory and insulation renewal",
      "Dished end and nozzle pad repair",
      "Hydrostatic pressure testing & certification",
      "Safety valve overhaul and setting",
    ]],
    ["02", "Structural steel & fabrication", [
      "Platforms, staircases and handrails",
      "Machine bases, frames and skirting",
      "Ducting, hopper and cyclone works",
    ]],
    ["03", "Piping & site works", [
      "Steam line and condensate piping repair",
      "On-site cutting, fitting and welding",
      "Shutdown and breakdown attendance",
    ]],
  ];
  const xs = [0.55, 3.6, 6.65];
  groups.forEach((g, i) => {
    const x = xs[i];
    s.addText(g[0], { x, y: 2.15, w: 0.5, h: 0.25, fontFace: MONO, fontSize: 9, bold: true, color: C.safety });
    s.addText(g[1].toUpperCase(), { x: x + 0.42, y: 2.13, w: 2.55, h: 0.5, fontFace: DISPLAY, fontSize: 12.5, bold: true, color: C.bone, valign: "top", lineSpacingMultiple: 0.98 });
    s.addShape(pptx.ShapeType.line, { x, y: 2.66, w: 2.85, h: 0, line: { color: "3A444D", width: 1 } });
    bullets(s, { x, y: 2.76, w: 2.85, h: 2.4, items: g[2], size: 9.5, color: C.bone });
  });
}

/* ================================================================== */
/*  SLIDE 7 — COMPLIANCE 1/2                                           */
/* ================================================================== */
{
  const s = pptx.addSlide(light);
  kicker(s, "05 · Compliance & safety — instruments", false);
  titleRuns(s, [{ t: "WORK THAT STANDS UP " }, { t: "TO INSPECTION", c: C.oxide }], { size: 27, darkTheme: false });
  s.addText("Boiler and pressure vessel work is statutory work, executed to the FMA 1967 and coordinated with the DOSH-appointed inspector.", {
    x: 0.55, y: 1.56, w: 8.9, h: 0.35, fontFace: BODY, fontSize: 10.5, color: "55595E",
  });
  const items = [
    ["01", "Factories and Machinery Act 1967 (Act 139)", "The statute governing steam boilers and unfired pressure vessels in Malaysia, and the basis on which prescribed machinery is registered and inspected."],
    ["02", "FMA (Steam Boiler & Unfired Pressure Vessel) Regulations 1970", "Requirements for manufacture, repair, authorised safe working pressure, safety valves and hydrostatic testing of boilers and vessels."],
    ["03", "Certificate of Fitness & Inspection Regulations 1970 — P.U.(A) 43/70", "Registration, inspection intervals and the Certificate of Fitness — Form A (steam boilers), Form B (unfired pressure vessels) — ordinarily valid fifteen calendar months."],
    ["04", "Section 29A, Act 139 — written authority", "No person shall manufacture, fabricate, test, install, maintain, dismantle or repair prescribed machinery without written authority from the Chief Inspector."],
    ["05", "ASME PCC-2 — Repair of Pressure Equipment & Piping", "Accepted guidelines for inspecting, evaluating and repairing pressure-containing components and industrial piping systems."],
  ];
  let y = 2.0;
  for (const [n, head, body] of items) {
    numberedRow(s, { x: 0.55, y, w: 8.9, n, head, body, darkTheme: false, headSize: 11.5, bodySize: 9, h: 0.66 });
    y += 0.68;
  }
}

/* ================================================================== */
/*  SLIDE 8 — COMPLIANCE 2/2                                           */
/* ================================================================== */
{
  const s = pptx.addSlide(light);
  kicker(s, "05 · Compliance & safety — tests & plates", false);
  titleRuns(s, [{ t: "TESTS, VALVES " }, { t: "& NUMBER PLATES", c: C.oxide }], { size: 27, darkTheme: false });
  const items = [
    ["06", "NBIC — National Board Inspection Code", "A systematic approach to inspecting, evaluating and repairing boilers and pressure vessels, recognised internationally for safe, compliant, extended service life."],
    ["07", "Hydrostatic test", "Required where a repair involves full-penetration welding or major replacement of pressure-retaining components; minor non-penetrating repairs are exempt under ASME PCC-2. Weld repairs after final PWHT require hydrostatic re-testing under ASME Section VIII, Division 1."],
    ["08", "Safety valve accumulation test", "With the stop valve closed and under full firing, pressure accumulation must not exceed ten per cent above the authorised safe working pressure."],
    ["09", "Registration number plate (Reg. 82)", "The registration number plate is provided, marked and maintained on every steam boiler and unfired pressure vessel held under certificate of fitness."],
  ];
  let y = 1.72;
  for (const [n, head, body] of items) {
    numberedRow(s, { x: 0.55, y, w: 8.9, n, head, body, darkTheme: false, headSize: 11.5, bodySize: 9, h: 0.78 });
    y += 0.8;
  }
  noteBox(s, {
    x: 0.55, y: 5.0 - 0.02, w: 8.9, h: 0.34, darkTheme: false,
    text: "NOTE — SCOPE IS CONFIRMED IN WRITING BEFORE ANY HOT WORK. METHOD STATEMENTS, WELDER QUALIFICATIONS AND TEST RECORDS COME WITH THE JOB FILE.",
  });
}

/* ================================================================== */
/*  SLIDE 9 — QMS OVERVIEW                                             */
/* ================================================================== */
{
  const s = pptx.addSlide(dark);
  kicker(s, "06 · Quality Management System");
  titleRuns(s, [{ t: "UNDER CONTROL, " }, { t: "WITHIN THE CODE", c: C.safety }], { size: 29 });
  s.addText("Every alteration, repair, inspection, testing and certification job runs through our Quality Management Center — one controlled online workspace shared by the workshop, our inspectors and your plant team.", {
    x: 0.55, y: 1.6, w: 8.9, h: 0.55, fontFace: BODY, fontSize: 10.5, color: C.bone70, lineSpacingMultiple: 1.18,
  });
  const pts = [
    ["01", "Controlled before work starts", "Scope confirmed in writing; defect assessment, thickness measurement, ITP, method statement and JSA raised — documents sent to DOSH as a 'repair notice' and approved before any hot work begins."],
    ["02", "Qualified welders & procedures", "WPS, PQR and welder qualification tests to ASME BPVC Section IX or ISO/BS EN 15614, with welder continuity tracked — only qualified welders weld on pressure parts."],
    ["03", "Answered in minutes, monitored live", "Inspection plans, procedures, acceptance criteria and decisions answered within minutes. Clients and inspectors monitor progress live via a link to the QMC and can comment inside the system."],
    ["04", "Certified, traceable close-out", "Numbered certificates, PDF test reports and job records cloud-synced to the job file, released after client acceptance — for maintenance records, insurer and appointed inspector."],
  ];
  const cw = 4.36, ch = 1.32, x0 = 0.55, y0 = 2.3;
  pts.forEach((p, i) => {
    const x = x0 + (i % 2) * (cw + 0.18);
    const y = y0 + Math.floor(i / 2) * (ch + 0.16);
    card(s, { x, y, w: cw, h: ch, idx: p[0], title: p[1], body: p[2], titleSize: 12, bodySize: 8.5 });
  });
}

/* ================================================================== */
/*  SLIDE 10 — APP PROCESS (5-step workflow in the QMC)                */
/* ================================================================== */
{
  const s = pptx.addSlide(dark);
  kicker(s, "07 · App process — Quality Management Center");
  titleRuns(s, [{ t: "HOW A JOB RUNS " }, { t: "IN THE SYSTEM", c: C.safety }], { size: 29 });
  s.addText("The website links into the live application at qmc.freeskillengineering.com — this is the process every job follows inside it:", {
    x: 0.55, y: 1.58, w: 8.9, h: 0.4, fontFace: BODY, fontSize: 10.5, color: C.bone70,
  });
  const steps = [
    ["01", "Raise the job", "The defect list is logged against the client and equipment record — history, drawings and certificates pulled up in one place."],
    ["02", "Plans & approvals", "ITP, method statement and JSA generated in-system; repair-notice documents sent to DOSH and approved before any hot work."],
    ["03", "Qualified execution", "WPS/PQR and welder qualifications matched to the job, with the workshop updating progress live as the repair runs."],
    ["04", "Test & decide", "Inspections recorded and acceptance criteria answered within minutes — results sent to the inspector or client without delay."],
    ["05", "Handover", "Numbered certificate, PDF test reports and the complete, ordered job file released after client acceptance."],
  ];
  const cw = 1.66, x0 = 0.55, y = 2.15, ch = 2.2;
  steps.forEach((st, i) => {
    const x = x0 + i * (cw + 0.2);
    box(s, { x, y, w: cw, h: ch, fill: C.steel800, line: { color: "3A444D" } });
    s.addText(st[0], { x: x + 0.12, y: y + 0.12, w: 0.7, h: 0.22, fontFace: MONO, fontSize: 9, bold: true, color: C.safety });
    s.addText(st[1], { x: x + 0.12, y: y + 0.36, w: cw - 0.24, h: 0.6, fontFace: DISPLAY, fontSize: 12, bold: true, color: C.bone, valign: "top", lineSpacingMultiple: 0.98 });
    s.addText(st[2], { x: x + 0.12, y: y + 0.92, w: cw - 0.24, h: 1.18, fontFace: BODY, fontSize: 8, color: C.bone70, valign: "top", lineSpacingMultiple: 1.1 });
    if (i < steps.length - 1) {
      s.addText("→", { x: x + cw + 0.01, y: y + ch / 2 - 0.18, w: 0.18, h: 0.36, fontFace: BODY, fontSize: 15, bold: true, color: C.oxide, align: "center", valign: "middle" });
    }
  });
  noteBox(s, {
    x: 0.55, y: 4.55, w: 8.9, h: 0.55,
    text: "THE QMC IS THE SINGLE SOURCE FOR CF EXPIRY DATES, PROJECT MONITORING, APPROVAL DOCUMENTS, INSPECTION PLANS, WELDER & WELDING RECORDS, PROCEDURES, TEST RESULTS AND CERTIFICATES — EVERY JOB FILE STAYS THERE, IN ORDER, FROM DEFECT LIST TO SIGNED-OFF HANDOVER.",
  });
}

/* ================================================================== */
/*  SLIDE 11 — INSIDE THE APP (modules)                                */
/* ================================================================== */
{
  const s = pptx.addSlide(dark);
  kicker(s, "08 · App process — inside the Quality Management Center");
  titleRuns(s, [{ t: "WHAT THE APPLICATION " }, { t: "HANDLES", c: C.safety }], { size: 28 });
  s.addText("qmc.freeskillengineering.com  ·  cloud sync & PDF reports", {
    x: 0.55, y: 1.56, w: 8.9, h: 0.3, fontFace: MONO, fontSize: 9.5, color: C.safety, charSpacing: 1,
  });
  const left = [
    "Inspection & Test Plans (ITP)",
    "Method Statements",
    "Job Safety Analysis (JSA)",
    "WPS / PQR / QW-301 documents",
    "Welder qualification — ASME IX & ISO/BS EN 15614",
    "Welder continuity records",
  ];
  const right = [
    "Defect assessments & thickness measurements",
    "Hydrostatic, bubble and thickness test reports",
    "Safety valve & inspection results",
    "Numbered certificates with client acceptance",
    "Cloud job files with PDF export",
    "Live progress link for clients & inspectors (comments in-system)",
  ];
  box(s, { x: 0.55, y: 1.98, w: 4.36, h: 3.1, fill: C.steel800, line: { color: "3A444D" } });
  box(s, { x: 5.09, y: 1.98, w: 4.36, h: 3.1, fill: C.steel800, line: { color: "3A444D" } });
  s.addText("PLANS & QUALIFICATIONS", { x: 0.75, y: 2.14, w: 4, h: 0.25, fontFace: MONO, fontSize: 9, charSpacing: 1.5, color: C.safety });
  s.addText("RECORDS, TESTS & CERTIFICATES", { x: 5.29, y: 2.14, w: 4, h: 0.25, fontFace: MONO, fontSize: 9, charSpacing: 1.5, color: C.safety });
  bullets(s, { x: 0.75, y: 2.48, w: 4, h: 2.5, items: left, size: 10.5 });
  bullets(s, { x: 5.29, y: 2.48, w: 4, h: 2.5, items: right, size: 10.5 });
  s.addText("Open from the website via “Open the live system” in the Quality section.", {
    x: 0.55, y: 5.05, w: 8.9, h: 0.25, fontFace: BODY, fontSize: 9, italic: true, color: C.bone45,
  });
}

/* ================================================================== */
/*  SLIDE 12 — JOB FLOW                                                */
/* ================================================================== */
{
  const s = pptx.addSlide(dark);
  kicker(s, "09 · Job flow");
  titleRuns(s, [{ t: "FROM DEFECT LIST TO " }, { t: "SIGNED-OFF HANDOVER", c: C.oxide }], { size: 27 });
  const flow = [
    ["01", "Survey & assessment", "Site attendance for defect assessments, thickness measurements and visual findings, aligned with the current Certificate of Fitness."],
    ["02", "Scope & quotation", "Written scope, material specification, method statement, inspection test plans and a schedule agreed with your plant team."],
    ["03", "Repair / fabrication", "Cutting, rolling, forming, fit-up and welding in the Menglembu workshop or on-site within your shutdown window."],
    ["04", "Test & inspection", "Hydrostatic testing, bubble testing, safety valve setting, weld inspection and coordination with the appointed inspector."],
    ["05", "Handover & records", "Reinstatement, test certificates and job records for your maintenance file, insurer and appointed inspector."],
  ];
  const cw = 1.7, x0 = 0.55, y = 1.85, ch = 3.0;
  flow.forEach((f, i) => {
    const x = x0 + i * (cw + 0.17);
    box(s, { x, y, w: cw, h: ch, fill: C.steel800, line: { color: "3A444D" } });
    s.addText(f[0], { x: x + 0.13, y: y + 0.14, w: 0.6, h: 0.3, fontFace: MONO, fontSize: 12, bold: true, color: C.safety });
    s.addShape(pptx.ShapeType.line, { x: x + 0.13, y: y + 0.52, w: cw - 0.26, h: 0, line: { color: C.oxide, width: 1.5 } });
    s.addText(f[1], { x: x + 0.13, y: y + 0.62, w: cw - 0.26, h: 0.75, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.bone, valign: "top", lineSpacingMultiple: 0.98 });
    s.addText(f[2], { x: x + 0.13, y: y + 1.34, w: cw - 0.26, h: 1.5, fontFace: BODY, fontSize: 8.5, color: C.bone70, valign: "top", lineSpacingMultiple: 1.12 });
  });
}

/* ================================================================== */
/*  SLIDE 13 — SAFETY & HEALTH                                         */
/* ================================================================== */
{
  const s = pptx.addSlide(light);
  kicker(s, "10 · Safety & health", false);
  titleRuns(s, [{ t: "SAFETY " }, { t: "ABOVE ALL", c: C.oxide }], { size: 30, darkTheme: false });
  s.addText("Our OSH policy — signed by the Managing Director — commits to no operation that risks injury to people, damage to plant or harm to the environment, managed under OSHA 1994 (Act 514) and the FMA 1967, and audited by DOSH.", {
    x: 0.55, y: 1.58, w: 4.1, h: 1.3, fontFace: BODY, fontSize: 10, color: "55595E", lineSpacingMultiple: 1.2,
  });
  const facts = [
    ["STANDARD", "OSHA 1994 (Act 514) & Factories & Machinery Act 1967"],
    ["LEADERSHIP", "Designated OSH Coordinator · Safety Committee chaired by the Managing Director"],
    ["ASSESSMENT", "HIRARC — hazard identification, risk assessment and risk control — for every activity"],
    ["EMERGENCY", "ERP drills · first aiders · liaison with the client's emergency response team"],
  ];
  let y = 2.95;
  for (const [k, v] of facts) {
    s.addText(k, { x: 0.55, y, w: 1.35, h: 0.4, fontFace: MONO, fontSize: 8, color: C.oxide, bold: true, valign: "top" });
    s.addText(v, { x: 1.95, y: y - 0.04, w: 2.7, h: 0.5, fontFace: BODY, fontSize: 9, color: C.ink, valign: "top", lineSpacingMultiple: 1.05 });
    s.addShape(pptx.ShapeType.line, { x: 0.55, y: y + 0.42, w: 4.1, h: 0, line: { color: "D3CCBE", width: 0.75 } });
    y += 0.5;
  }
  const commits = [
    ["01", "Procedures & PPE discipline", "Every worker follows the safe operating procedure for the task and wears mandatory PPE — 100% compliance, every shift, in the workshop and on site."],
    ["02", "Report unsafe conditions", "Any unsafe condition, equipment malfunction or near-miss is reported to the supervisor immediately, under a no-blame reporting culture."],
    ["03", "Stop work authority", "Every worker has the absolute right, without fear of retaliation, to stop work they believe poses an imminent hazard to life, health or structural integrity."],
  ];
  s.addText("COMMITMENTS", { x: 5.1, y: 1.62, w: 4.3, h: 0.25, fontFace: MONO, fontSize: 9, charSpacing: 2, color: C.ink, bold: true });
  let cy = 1.95;
  for (const [n, head, body] of commits) {
    numberedRow(s, { x: 5.1, y: cy, w: 4.35, n, head, body, darkTheme: false, headW: 0.4, headSize: 11, bodySize: 8.5, h: 1.05 });
    cy += 1.1;
  }
}

/* ================================================================== */
/*  SLIDE 14 — SAFE SYSTEMS OF WORK                                    */
/* ================================================================== */
{
  const s = pptx.addSlide(light);
  kicker(s, "10 · Safety & health — safe systems", false);
  titleRuns(s, [{ t: "SAFE SYSTEMS " }, { t: "OF WORK", c: C.oxide }], { size: 30, darkTheme: false });
  const systems = [
    ["Permit-to-work", "Hot work, confined space and working-at-height permits issued per job before any high-risk activity begins."],
    ["Confined space entry", "Atmospheric testing, continuous ventilation, a constant attendant and a standby rescue team for vessel and furnace entry."],
    ["Hot work control", "Atmospheric monitoring, fire watch, spark containment and flammable-zone clearance for welding and gouging."],
    ["Lifting & handling", "Certified riggers, lifting plans and craneage inspection under strict load management to prevent dropped objects and crush injuries."],
  ];
  const cw = 4.36, ch = 1.4, x0 = 0.55, y0 = 1.66;
  systems.forEach((sys, i) => {
    const x = x0 + (i % 2) * (cw + 0.18);
    const y = y0 + Math.floor(i / 2) * (ch + 0.16);
    box(s, { x, y, w: cw, h: ch, fill: C.paperAlt, line: { color: "C9C2B4" } });
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.16, y: y + 0.19, w: 0.1, h: 0.1, fill: { color: C.oxide }, line: { width: 0 } });
    s.addText(sys[0].toUpperCase(), { x: x + 0.36, y: y + 0.1, w: cw - 0.5, h: 0.3, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.ink });
    s.addText(sys[1], { x: x + 0.36, y: y + 0.44, w: cw - 0.55, h: 0.85, fontFace: BODY, fontSize: 9.5, color: "55595E", lineSpacingMultiple: 1.15, valign: "top" });
  });
  noteBox(s, {
    x: 0.55, y: 4.6, w: 8.9, h: 0.56, darkTheme: false,
    text: "DAILY PRE-TASK TOOLBOX TALKS · 100% MANDATORY PPE · NO-BLAME NEAR-MISS REPORTING · STOP WORK AUTHORITY FOR EVERY WORKER · PRESSURE TESTING WITNESSED BY A DOSH INSPECTING OFFICER.",
  });
}

/* ================================================================== */
/*  SLIDE 15 — ORGANISATION & TECHNICAL PERSONNEL                      */
/* ================================================================== */
{
  const s = pptx.addSlide(dark);
  kicker(s, "11 · Organisation chart (opened from the data plate)");
  titleRuns(s, [{ t: "LIST OF " }, { t: "TECHNICAL PERSON", c: C.safety }], { size: 29 });
  s.addText("Managing Director → key roles → support → site & workshop staff — shown in the website's organisation-chart popup:", {
    x: 0.55, y: 1.54, w: 8.9, h: 0.3, fontFace: BODY, fontSize: 10, color: C.bone70,
  });
  const head = ["NAME", "ROLE", "EXP.", "KEY QUALIFICATION"].map((t) => ({
    text: t, options: { fill: { color: C.steel800 }, color: C.safety, bold: true, fontFace: MONO, fontSize: 8.5 },
  }));
  const people = [
    ["Ahmad Nazwan Bin Mohd Sarbini", "Managing Director / Project Lead", "—", "Leads project & corporate operations · Safety Committee Chairman"],
    ["Shahrul Azmi Bin Salim Shah", "QAQC & Engineering Manager", "25+ yrs", "ASME Sec. VIII Div. 1 · IX · V · II · appointed DOSH contact person"],
    ["Mohd Yusof Bin Abdul Rahman", "Construction Manager", "10+ yrs", "Project coordination, fabrication, installation and site works"],
    ["Mohd Hafifi Bin Rahmat Ali", "Project Manager", "10+ yrs", "Method statements, ITPs, scheduling and supervision of teams"],
    ["Muhammad Tajhafizi Mohd Tajul Azmi", "OSH Coordinator", "8+ yrs", "OSH operations · HIRARC, inductions, ERP drills (OSHA 1994)"],
    ["Nur Mastura Aida Bt Mohd Tajul Azmi", "Executive Secretary", "—", "Corporate and management support"],
    ["Jayalaxmi A/P Sandirin", "Administrative Assistant", "—", "Office administration support"],
    ["Muhammad Lugman Yahaya", "Project Supervisor", "—", "Site work supervision and crew coordination"],
    ["Farikh Syahidan Mohd Rosly", "Project Supervisor", "—", "Site work supervision and crew coordination"],
    ["Rizwan", "Fitter / AESP", "—", "Structural and plate fitting"],
    ["Che Mohd Saidi Che Hassan", "Qualified Welder", "8+ yrs", "Coded weld qualification · 6G pipe welding, all positions"],
  ];
  s.addTable(
    [head, ...people.map((p) => [
      { text: p[0], options: { fontFace: BODY, fontSize: 8.5, bold: true, color: C.bone } },
      { text: p[1], options: { fontFace: BODY, fontSize: 8.5, color: C.safety } },
      { text: p[2], options: { fontFace: MONO, fontSize: 8.5, color: C.bone } },
      { text: p[3], options: { fontFace: BODY, fontSize: 8.5, color: C.bone70 } },
    ])],
    {
      x: 0.55, y: 1.95, w: 8.9, colW: [2.7, 2.2, 0.7, 3.3],
      border: { type: "solid", color: "333C44", pt: 0.75 },
      rowH: 0.28, margin: 0.05, valign: "middle", autoPage: false,
    },
  );
  s.addText("Experience as recorded on the organisation chart (Rev. 0, 19/07/2026); “—” where none stated.", {
    x: 0.55, y: 5.03, w: 8.9, h: 0.25, fontFace: BODY, fontSize: 8.5, italic: true, color: C.bone45,
  });
}

/* ================================================================== */
/*  SLIDE 16 — CONTACT / CLOSING                                       */
/* ================================================================== */
{
  const s = pptx.addSlide(light);
  kicker(s, "12 · Contact & works address", false);
  titleRuns(s, [{ t: "TALK TO THE " }, { t: "WORKSHOP DIRECTLY", c: C.oxide }], { size: 30, darkTheme: false });

  const rows = [
    ["COMPANY", "Freeskills Engineering (M) Sdn Bhd"],
    ["REGISTRATION", "1502941-H"],
    ["ADDRESS", "Lot 01 & 02, Hala Perusahaan Kledang Utara 6, Menglembu, 31450 Ipoh, Perak Darul Ridzuan, Malaysia"],
    ["TELEPHONE", "+60 16 410 0464"],
    ["EMAIL", "freeskillseng@gmail.com"],
    ["HOURS", "Monday – Saturday, 8:30 am – 6:00 pm"],
    ["WEBSITE", "freeskillengineering.com  ·  QMS app: qmc.freeskillengineering.com"],
  ];
  let y = 1.75;
  for (const [k, v] of rows) {
    s.addText(k, { x: 0.55, y, w: 1.6, h: 0.3, fontFace: MONO, fontSize: 8.5, color: C.oxide, bold: true, charSpacing: 1, valign: "top" });
    s.addText(v, { x: 2.25, y: y - 0.04, w: 5.6, h: 0.45, fontFace: BODY, fontSize: 10.5, color: C.ink, valign: "top", lineSpacingMultiple: 1.1 });
    s.addShape(pptx.ShapeType.line, { x: 0.55, y: y + 0.38, w: 7.3, h: 0, line: { color: "D3CCBE", width: 0.75 } });
    y += 0.46;
  }
  box(s, { x: 7.75, y: 1.75, w: 1.7, h: 2.2, fill: C.ink });
  s.addText("SEND US YOUR", { x: 7.9, y: 1.95, w: 1.4, h: 0.5, fontFace: DISPLAY, fontSize: 13, bold: true, color: C.paper, lineSpacingMultiple: 1.0 });
  s.addText("defect list, drawing or inspection report — we respond with a written scope.", {
    x: 7.9, y: 2.45, w: 1.4, h: 1.3, fontFace: BODY, fontSize: 9, color: C.bone70, lineSpacingMultiple: 1.2,
  });
  s.addText("Shutdown and breakdown attendance by arrangement. Workshop on Hala Perusahaan Kledang Utara 6, Menglembu — 4.5685° N, 101.0367° E.", {
    x: 0.55, y: 5.0, w: 8.9, h: 0.3, fontFace: MONO, fontSize: 8, color: "6E7479",
  });
}

/* ---------- write ---------- */
const OUT = "public/Freeskills-Engineering-Deck.pptx";
await pptx.writeFile({ fileName: OUT });
console.log(`wrote ${OUT} — ${pptx._slides?.length ?? "?"} slides`);
