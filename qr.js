/* ============================================================
   QRGen — mustaqil QR kod generatori (tashqi xizmatsiz, offline)
   Byte rejimi, 1–10 versiyalar, ECC darajalari L/M/Q/H.
   Foydalanish: QRGen.generate("https://...", "M") -> {size, modules}
   ============================================================ */
(function (global) {
  'use strict';

  /* ---- GF(256) maydoni ---- */
  const EXP = new Uint8Array(512), LOG = new Uint8Array(256);
  (function () {
    let x = 1;
    for (let i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 0x100) x ^= 0x11D; }
    for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  })();
  const mul = (a, b) => (a === 0 || b === 0) ? 0 : EXP[LOG[a] + LOG[b]];

  /* ---- Reed-Solomon ---- */
  function rsGenPoly(deg) {
    let poly = [1];
    for (let i = 0; i < deg; i++) {
      const np = new Array(poly.length + 1).fill(0);
      for (let j = 0; j < poly.length; j++) {
        np[j] ^= poly[j];
        np[j + 1] ^= mul(poly[j], EXP[i]);
      }
      poly = np;
    }
    return poly;
  }
  function rsEncode(data, ecLen) {
    const gen = rsGenPoly(ecLen);
    const res = new Array(ecLen).fill(0);
    for (let d = 0; d < data.length; d++) {
      const factor = data[d] ^ res[0];
      res.shift(); res.push(0);
      for (let i = 0; i < ecLen; i++) res[i] ^= mul(gen[i + 1], factor);
    }
    return res;
  }

  /* ---- Versiya jadvallari (1..10) ---- */
  const TOTAL_CW = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346];
  // [ecPerBlock, numBlocks] har bir versiya uchun
  const ECC = {
    L: [null, [7,1],[10,1],[15,1],[20,1],[26,1],[18,2],[20,2],[24,2],[30,2],[18,4]],
    M: [null, [10,1],[16,1],[26,1],[18,2],[24,2],[16,4],[18,4],[22,4],[22,5],[26,5]],
    Q: [null, [13,1],[22,1],[18,2],[26,2],[18,4],[24,4],[18,6],[22,6],[20,8],[24,8]],
    H: [null, [17,1],[28,1],[22,2],[16,4],[22,4],[28,4],[26,5],[26,6],[24,8],[28,8]],
  };
  const ALIGN = [null, [], [6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50]];
  const ECC_BITS = { L: 1, M: 0, Q: 3, H: 2 };

  const dataCapacity = (ver, ecl) => TOTAL_CW[ver] - ECC[ecl][ver][0] * ECC[ecl][ver][1];

  /* ---- UTF-8 baytlarga o'girish ---- */
  function toBytes(str) {
    const out = [];
    for (const ch of str) {
      let cp = ch.codePointAt(0);
      if (cp < 0x80) out.push(cp);
      else if (cp < 0x800) out.push(0xC0 | cp >> 6, 0x80 | cp & 63);
      else if (cp < 0x10000) out.push(0xE0 | cp >> 12, 0x80 | (cp >> 6) & 63, 0x80 | cp & 63);
      else out.push(0xF0 | cp >> 18, 0x80 | (cp >> 12) & 63, 0x80 | (cp >> 6) & 63, 0x80 | cp & 63);
    }
    return out;
  }

  /* ---- Bit oqimi ---- */
  function BitBuf() { this.bits = []; }
  BitBuf.prototype.put = function (val, len) {
    for (let i = len - 1; i >= 0; i--) this.bits.push((val >>> i) & 1);
  };

  /* ---- Ma'lumot kodli so'zlarini tayyorlash ---- */
  function makeDataCodewords(bytes, ver, ecl) {
    const cap = dataCapacity(ver, ecl);
    const bb = new BitBuf();
    bb.put(0b0100, 4);                       // byte rejimi
    bb.put(bytes.length, ver <= 9 ? 8 : 16); // uzunlik
    for (const b of bytes) bb.put(b, 8);
    const capBits = cap * 8;
    for (let i = 0; i < 4 && bb.bits.length < capBits; i++) bb.bits.push(0); // terminator
    while (bb.bits.length % 8 !== 0) bb.bits.push(0);
    const cw = [];
    for (let i = 0; i < bb.bits.length; i += 8) {
      let v = 0; for (let j = 0; j < 8; j++) v = (v << 1) | bb.bits[i + j];
      cw.push(v);
    }
    const PAD = [0xEC, 0x11];
    for (let i = 0; cw.length < cap; i++) cw.push(PAD[i % 2]);
    return cw;
  }

  /* ---- Bloklarga bo'lish, ECC va interleaving ---- */
  function interleave(dataCw, ver, ecl) {
    const [ecLen, numBlocks] = ECC[ecl][ver];
    const total = dataCw.length;
    const shortLen = Math.floor(total / numBlocks);
    const numLong = total % numBlocks;

    const dBlocks = [], eBlocks = [];
    let pos = 0;
    for (let b = 0; b < numBlocks; b++) {
      const len = shortLen + (b >= numBlocks - numLong ? 1 : 0);
      const chunk = dataCw.slice(pos, pos + len); pos += len;
      dBlocks.push(chunk);
      eBlocks.push(rsEncode(chunk, ecLen));
    }
    const out = [];
    const maxD = shortLen + (numLong > 0 ? 1 : 0);
    for (let i = 0; i < maxD; i++)
      for (let b = 0; b < numBlocks; b++)
        if (i < dBlocks[b].length) out.push(dBlocks[b][i]);
    for (let i = 0; i < ecLen; i++)
      for (let b = 0; b < numBlocks; b++) out.push(eBlocks[b][i]);
    return out;
  }

  /* ---- Matritsa qurish ---- */
  function buildMatrix(ver, ecl, codewords, mask) {
    const size = ver * 4 + 17;
    const m = Array.from({ length: size }, () => new Array(size).fill(0));
    const fn = Array.from({ length: size }, () => new Array(size).fill(false));
    const set = (r, c, v) => { m[r][c] = v; fn[r][c] = true; };

    // Finder + separator
    function finder(r0, c0) {
      for (let r = -1; r <= 7; r++) for (let c = -1; c <= 7; c++) {
        const rr = r0 + r, cc = c0 + c;
        if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
        const inner = (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
                      (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
                      (r >= 2 && r <= 4 && c >= 2 && c <= 4);
        set(rr, cc, inner ? 1 : 0);
      }
    }
    finder(0, 0); finder(0, size - 7); finder(size - 7, 0);

    // Timing
    for (let i = 8; i < size - 8; i++) { set(6, i, i % 2 === 0 ? 1 : 0); set(i, 6, i % 2 === 0 ? 1 : 0); }

    // Alignment
    const ac = ALIGN[ver];
    for (const r0 of ac) for (const c0 of ac) {
      if ((r0 <= 8 && c0 <= 8) || (r0 <= 8 && c0 >= size - 9) || (r0 >= size - 9 && c0 <= 8)) continue;
      for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++)
        set(r0 + r, c0 + c, (Math.max(Math.abs(r), Math.abs(c)) !== 1) ? 1 : 0);
    }

    // Format maydoni band qilish + dark module
    for (let i = 0; i < 9; i++) { if (!fn[8][i]) set(8, i, 0); if (!fn[i][8]) set(i, 8, 0); }
    for (let i = 0; i < 8; i++) { set(8, size - 1 - i, 0); set(size - 1 - i, 8, 0); }
    set(size - 8, 8, 1);

    // Versiya ma'lumoti (v>=7)
    if (ver >= 7) {
      let rem = ver;
      for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
      const vbits = (ver << 12) | rem;
      for (let i = 0; i < 18; i++) {
        const bit = (vbits >>> i) & 1;
        set(Math.floor(i / 3), size - 11 + (i % 3), bit);
        set(size - 11 + (i % 3), Math.floor(i / 3), bit);
      }
    }

    // Ma'lumotni zigzag bo'yicha joylash
    let bitIdx = 0;
    const totalBits = codewords.length * 8;
    const getBit = (i) => i < totalBits ? (codewords[i >> 3] >>> (7 - (i & 7))) & 1 : 0;
    let upward = true;
    for (let col = size - 1; col >= 1; col -= 2) {
      if (col === 6) col--;
      for (let i = 0; i < size; i++) {
        const row = upward ? size - 1 - i : i;
        for (let k = 0; k < 2; k++) {
          const c = col - k;
          if (fn[row][c]) continue;
          let bit = getBit(bitIdx++);
          if (maskFn(mask, row, c)) bit ^= 1;
          m[row][c] = bit;
        }
      }
      upward = !upward;
    }

    // Format ma'lumoti
    const fbits = formatBits(ecl, mask);
    // 1-nusxa: chap-yuqori burchak (ustun 8 vertikal, keyin satr 8 gorizontal)
    for (let i = 0; i <= 5; i++) m[i][8] = (fbits >>> i) & 1;
    m[7][8] = (fbits >>> 6) & 1;
    m[8][8] = (fbits >>> 7) & 1;
    m[8][7] = (fbits >>> 8) & 1;
    for (let i = 9; i < 15; i++) m[8][14 - i] = (fbits >>> i) & 1;
    // 2-nusxa: bitlar 0–7 -> o'ng-yuqori (satr 8), bitlar 8–14 -> pastki-chap (ustun 8)
    for (let i = 0; i < 8; i++) m[8][size - 1 - i] = (fbits >>> i) & 1;
    for (let i = 8; i < 15; i++) m[size - 15 + i][8] = (fbits >>> i) & 1;
    m[size - 8][8] = 1;

    return { size, modules: m, fn };
  }

  function formatBits(ecl, mask) {
    const data = (ECC_BITS[ecl] << 3) | mask;
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    return ((data << 10) | rem) ^ 0x5412;
  }

  function maskFn(mask, r, c) {
    switch (mask) {
      case 0: return (r + c) % 2 === 0;
      case 1: return r % 2 === 0;
      case 2: return c % 3 === 0;
      case 3: return (r + c) % 3 === 0;
      case 4: return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
      case 5: return (r * c) % 2 + (r * c) % 3 === 0;
      case 6: return ((r * c) % 2 + (r * c) % 3) % 2 === 0;
      case 7: return ((r + c) % 2 + (r * c) % 3) % 2 === 0;
    }
  }

  /* ---- Maska jarimasi (ISO/IEC 18004 bo'yicha 4 qoida) ---- */
  const N1 = 3, N2 = 3, N3 = 40, N4 = 10;

  function penalty(m, size) {
    let p = 0;

    // Yordamchi: 1:1:3:1:1 nisbatli shablonlarni sanash (kattalashtirilgan
    // variantlari ham hisobga olinadi, atrofida 4x yorug' zona bo'lishi shart)
    const addHist = (runLen, hist) => {
      if (hist[0] === 0) runLen += size;      // boshidagi virtual yorug' chegara
      hist.copyWithin(1, 0, 6);
      hist[0] = runLen;
    };
    const countPatterns = (h) => {
      const n = h[1];
      const core = n > 0 && h[2] === n && h[3] === n * 3 && h[4] === n && h[5] === n;
      return (core && h[0] >= n * 4 && h[6] >= n ? 1 : 0) +
             (core && h[6] >= n * 4 && h[0] >= n ? 1 : 0);
    };

    // 1- va 3-qoida: satrlar va ustunlar bo'ylab
    for (const vertical of [false, true]) {
      for (let i = 0; i < size; i++) {
        const hist = new Int32Array(7);
        let runColor = 0, runLen = 0;
        for (let j = 0; j < size; j++) {
          const v = vertical ? m[j][i] : m[i][j];
          if (v === runColor) {
            runLen++;
            if (runLen === 5) p += N1;
            else if (runLen > 5) p++;
          } else {
            addHist(runLen, hist);
            if (runColor === 0) p += countPatterns(hist) * N3;
            runColor = v;
            runLen = 1;
          }
        }
        // qatorni yakunlash + oxiridagi virtual yorug' chegara
        if (runColor === 1) { addHist(runLen, hist); runLen = 0; }
        addHist(runLen + size, hist);
        p += countPatterns(hist) * N3;
      }
    }

    // 2-qoida: 2x2 bir xil rangli bloklar
    for (let r = 0; r < size - 1; r++) for (let c = 0; c < size - 1; c++) {
      const v = m[r][c];
      if (v === m[r][c + 1] && v === m[r + 1][c] && v === m[r + 1][c + 1]) p += N2;
    }

    // 4-qoida: qora modullar nisbatining 50% dan chetlanishi
    let dark = 0;
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) dark += m[r][c];
    const total = size * size;
    const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
    p += k * N4;

    return p;
  }

  /* ---- Asosiy funksiya ---- */
  function generate(text, ecl, forceMask) {
    ecl = ecl || 'M';
    if (!ECC[ecl]) throw new Error('Noto\'g\'ri ECC darajasi: ' + ecl);
    const bytes = toBytes(String(text));
    let ver = 0;
    for (let v = 1; v <= 10; v++) {
      const headerBits = 4 + (v <= 9 ? 8 : 16);
      if (dataCapacity(v, ecl) * 8 >= headerBits + bytes.length * 8) { ver = v; break; }
    }
    if (!ver) throw new Error('Matn juda uzun (maksimum ~' + dataCapacity(10, ecl) + ' bayt)');

    const cw = interleave(makeDataCodewords(bytes, ver, ecl), ver, ecl);
    let best = null, bestScore = Infinity;
    if (forceMask != null) return Object.assign(buildMatrix(ver, ecl, cw, forceMask), { version: ver, ecLevel: ecl });
    for (let mask = 0; mask < 8; mask++) {
      const cand = buildMatrix(ver, ecl, cw, mask);
      const sc = penalty(cand.modules, cand.size);
      if (sc < bestScore) { bestScore = sc; best = cand; }
    }
    return { size: best.size, modules: best.modules, version: ver, ecLevel: ecl };
  }

  /* ---- SVG chiqarish ---- */
  function toSVG(qr, opts) {
    opts = opts || {};
    const quiet = opts.quiet != null ? opts.quiet : 4;
    const dark = opts.dark || '#000000';
    const light = opts.light || '#ffffff';
    const dim = qr.size + quiet * 2;
    let path = '';
    for (let r = 0; r < qr.size; r++) for (let c = 0; c < qr.size; c++)
      if (qr.modules[r][c]) path += `M${c + quiet} ${r + quiet}h1v1h-1z`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" shape-rendering="crispEdges" role="img" aria-label="QR kod">` +
      `<rect width="${dim}" height="${dim}" fill="${light}"/>` +
      `<path d="${path}" fill="${dark}"/></svg>`;
  }

  global.QRGen = { generate, toSVG };
})(typeof window !== 'undefined' ? window : globalThis);
