// One-off: strip the opaque white background from logo.png -> public/images/logo.png
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { deflateSync, inflateSync } from "node:zlib";

const SRC = "logo.png";
const OUT = "public/images/logo.png";

/* ---------- PNG decode (RGBA8, non-interlaced) ---------- */
function decodePNG(path) {
  const b = readFileSync(path);
  let o = 8, w = 0, h = 0, bitDepth = 0, colorType = 0;
  const idat = [];
  while (o < b.length) {
    const len = b.readUInt32BE(o);
    const type = b.toString("ascii", o + 4, o + 8);
    const data = b.subarray(o + 8, o + 8 + len);
    if (type === "IHDR") {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9];
      if (data[12] !== 0) throw new Error("interlaced PNG unsupported");
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    o += 12 + len;
  }
  if (bitDepth !== 8 || colorType !== 6) throw new Error(`expected RGBA8, got depth=${bitDepth} type=${colorType}`);

  const raw = inflateSync(Buffer.concat(idat));
  const bpp = 4, stride = w * bpp;
  const out = Buffer.alloc(w * h * 4);
  let prev = Buffer.alloc(stride), pos = 0;
  for (let y = 0; y < h; y++) {
    const f = raw[pos++];
    const line = raw.subarray(pos, pos + stride);
    pos += stride;
    const cur = Buffer.alloc(stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0;
      const up = prev[i];
      const ul = i >= bpp ? prev[i - bpp] : 0;
      let v = line[i];
      if (f === 1) v += a;
      else if (f === 2) v += up;
      else if (f === 3) v += Math.floor((a + up) / 2);
      else if (f === 4) {
        const p = a + up - ul, pa = Math.abs(p - a), pb = Math.abs(p - up), pc = Math.abs(p - ul);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? up : ul;
      }
      cur[i] = v & 255;
    }
    out.set(cur, y * stride);
    prev = cur;
  }
  return { w, h, data: out };
}

/* ---------- PNG encode (RGBA8, filter 0) ---------- */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function encodePNG(w, h, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const stride = w * 4;
  const raw = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- background removal ---------- */
const { w: W, h: H, data } = decodePNG(SRC);
const px = (x, y) => (y * W + x) * 4;
const minC = (i) => Math.min(data[i], data[i + 1], data[i + 2]);

// 1. content bounding box (anything not near-white)
let minX = W, minY = H, maxX = -1, maxY = -1;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++)
    if (minC(px(x, y)) < 235) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

// 2. STRICT background: flood fill from the edges, but only through near-white
//    pixels. A loose threshold leaks into the logo's silver gradient and
//    hollows the bars out on a dark background.
const BG_FLOOR = 235;
const bg = new Uint8Array(W * H);
const stack = [];
const seed = (x, y) => {
  const p = y * W + x;
  if (!bg[p] && minC(px(x, y)) >= BG_FLOOR) { bg[p] = 1; stack.push(p); }
};
for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
for (let y = 0; y < H; y++) { seed(0, y); seed(W - 1, y); }
while (stack.length) {
  const p = stack.pop();
  const x = p % W, y = (p / W) | 0;
  if (x > 0) seed(x - 1, y);
  if (x < W - 1) seed(x + 1, y);
  if (y > 0) seed(x, y - 1);
  if (y < H - 1) seed(x, y + 1);
}

// 3. one-pixel ring around the background — that is where the antialiasing lives
const ring = new Uint8Array(W * H);
let ringCount = 0;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (bg[p]) continue;
    const touches =
      (x > 0 && bg[p - 1]) || (x < W - 1 && bg[p + 1]) ||
      (y > 0 && bg[p - W]) || (y < H - 1 && bg[p + W]);
    if (touches) { ring[p] = 1; ringCount++; }
  }

// 4. alpha: background -> 0, ring -> ramp by distance-from-white, rest -> opaque.
//    Unpremultiply the ring so its edges don't leave a pale fringe on dark.
const AA_SPAN = 145; // 255 minus ~110, the lightest solid colour in the mark
let bgCount = 0, unpremul = 0;
for (let p = 0; p < W * H; p++) {
  const i = p * 4;
  let a = 255;
  if (bg[p]) {
    bgCount++;
    a = 0;
  } else if (ring[p]) {
    a = Math.max(0, Math.min(255, Math.round(((255 - minC(i)) * 255) / AA_SPAN)));
    if (a >= 40 && a < 255) {
      const af = a / 255;
      for (let c = 0; c < 3; c++) {
        const f = (data[i + c] - (1 - af) * 255) / af;
        data[i + c] = Math.max(0, Math.min(255, Math.round(f)));
      }
      unpremul++;
    }
  }
  data[i + 3] = a;
}

mkdirSync("public/images", { recursive: true });
writeFileSync(OUT, encodePNG(W, H, data));

console.log(`source            : ${W}x${H}`);
console.log(`content bbox      : x ${minX}..${maxX}  y ${minY}..${maxY}  (${maxX - minX + 1}x${maxY - minY + 1})`);
console.log(`background pixels : ${bgCount} (${((100 * bgCount) / (W * H)).toFixed(1)}%)`);
console.log(`antialias ring    : ${ringCount}`);
console.log(`unpremultiplied   : ${unpremul}`);
console.log(`wrote             : ${OUT}`);
