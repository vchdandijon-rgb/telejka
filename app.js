/* ============================================================
   TELEJKA SEXI PORTALI — ilova mantig'i + admin panel
   Mehmon: faqat ko'radi. Admin: qo'shadi/tahrirlaydi/o'chiradi
   va yangilangan data.js faylini yuklab oladi.
   ============================================================ */
(function () {
  'use strict';

  const app   = document.getElementById('app');
  const live  = document.getElementById('live');
  const bar   = document.getElementById('adminbar');
  const foot  = document.getElementById('footbtn');
  const yearEl= document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Xavfsizlik: HTML ekranlash ---------- */
  const ESC = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' };
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, c => ESC[c]);

  /* ---------- Qidiruv normalizatsiyasi ---------- */
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/['\u2019\u2018\u02bb\u02bc`\u00b4]/g, '').trim();

  /* ---------- Xotira (localStorage yo'q bo'lsa ham qulamaydi) ---------- */
  const mem = {};
  const LS = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return (k in mem) ? mem[k] : null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { delete mem[k]; } },
  };
  const DRAFT_KEY = 'telejka:qoralama';
  const ADMIN_KEY = 'telejka:admin';

  /* ---------- Ma'lumotlar ombori ---------- */
  const arr = (v) => Array.isArray(v) ? JSON.parse(JSON.stringify(v)) : [];
  const store = {
    xodimlar:   arr(typeof XODIMLAR   !== 'undefined' ? XODIMLAR   : null),
    kutubxona:  arr(typeof KITOBLAR   !== 'undefined' ? KITOBLAR   : null),
    darsliklar: arr(typeof DARSLIKLAR !== 'undefined' ? DARSLIKLAR : null),
    testlar:    arr(typeof TESTLAR    !== 'undefined' ? TESTLAR    : null),
  };

  /* data.js dagi nashr etilgan ma'lumotning "barmoq izi".
     Qoralama shu izga bog'lanadi: data.js yangilansa, eski qoralama
     avtomatik bekor qilinadi va sayt yangi ma'lumotni ko'rsatadi. */
  function fingerprint() {
    const s = JSON.stringify([store.xodimlar, store.kutubxona, store.darsliklar, store.testlar]);
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return s.length + ':' + h.toString(36);
  }
  const NASHR = fingerprint();

  let hasDraft = false;
  let draftEskirdi = false;

  (function loadDraft() {
    const raw = LS.get(DRAFT_KEY);
    if (!raw) return;
    let d;
    try { d = JSON.parse(raw); } catch (e) { LS.del(DRAFT_KEY); return; }

    // Eski format yoki boshqa nashrga tegishli qoralama -> bekor qilamiz
    if (!d || d.nashr !== NASHR) {
      LS.del(DRAFT_KEY);
      draftEskirdi = true;
      return;
    }
    ['xodimlar','kutubxona','darsliklar','testlar'].forEach(k => {
      if (Array.isArray(d[k])) store[k] = d[k];
    });
    hasDraft = true;
  })();

  const saveDraft = () => {
    LS.set(DRAFT_KEY, JSON.stringify({
      nashr: NASHR,
      xodimlar: store.xodimlar, kutubxona: store.kutubxona,
      darsliklar: store.darsliklar, testlar: store.testlar,
    }));
    hasDraft = true;
    renderBar();
  };

  function tashlaQoralama() {
    LS.del(DRAFT_KEY);
    location.reload();
  }

  const validTests = () => store.testlar.filter(t => t && Array.isArray(t.savollar) && t.savollar.length);

  /* ---------- Bo'limlar ---------- */
  const SECTIONS = {
    xodimlar:   { title:'Xodimlar',   icon:'\u{1F477}', unit:'xodim',   yangi:'Yangi xodim' },
    kutubxona:  { title:'Kutubxona',  icon:'\u{1F4DA}', unit:'kitob',   yangi:'Yangi kitob' },
    darsliklar: { title:'Darsliklar', icon:'\u{1F393}', unit:'darslik', yangi:'Yangi darslik' },
    testlar:    { title:'Testlar',    icon:'\u{1F4DD}', unit:'test',    yangi:'Yangi test' },
  };

  const FIELDS = {
    xodimlar: [
      { k:'ism',     label:'Ism-familiya', req:true },
      { k:'lavozim', label:'Lavozim',      req:true },
      { k:'toifa',   label:'Toifa',        hint:'masalan: 1-toifa, Oliy toifa' },
    ],
    kutubxona: [
      { k:'nom',     label:'Kitob nomi',    req:true },
      { k:'muallif', label:'Muallif' },
      { k:'format',  label:'Format/hajm',   hint:'masalan: PDF \u00b7 4.2 MB' },
      { k:'mavzu',   label:'Mavzu',         hint:'kartada yorliq bo\u2018lib chiqadi' },
      { k:'havola',  label:'Fayl havolasi', hint:'masalan: kitoblar/payvandlash.pdf' },
    ],
    darsliklar: [
      { k:'nom',         label:'Darslik nomi',  req:true },
      { k:'davomiyligi', label:'Davomiyligi',   hint:'masalan: 45 daq' },
      { k:'daraja',      label:'Daraja',        hint:'Boshlang\u2018ich / O\u2018rta / Yuqori' },
      { k:'havola',      label:'Fayl havolasi' },
    ],
  };

  /* ---------- Admin holati ---------- */
  const PAROL_HASH = '2b57d2bcae2aa35a4921be488f3215130916387fca0c48602591ab4b26154088';
  let isAdmin = LS.get(ADMIN_KEY) === '1';

  async function sha256(text) {
    if (!(window.crypto && window.crypto.subtle)) return null;
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
    } catch (e) { return null; }
  }

  const announce = (m) => { if (live) live.textContent = m; };

  /* ================= ADMIN CHIZIG'I ================= */
  function renderBar() {
    if (bar) {
      if (!isAdmin) { bar.hidden = true; bar.innerHTML = ''; }
      else {
        bar.hidden = false;
        bar.innerHTML =
          '<div class="ab-left"><span class="ab-dot" aria-hidden="true"></span>' +
          '<span class="ab-label">Admin rejimi</span>' +
          (hasDraft ? '<span class="ab-warn">saqlanmagan o\u2018zgarish</span>' : '') +
          '</div><div class="ab-right">' +
          (hasDraft ? '<button class="ab-btn" data-act="discard">Qoralamani tashlash</button>' : '') +
          '<button class="ab-btn primary" data-act="export">data.js yuklab olish</button>' +
          '<button class="ab-btn" data-act="logout">Chiqish</button></div>';
      }
    }
    if (foot) {
      foot.innerHTML = isAdmin ? '' :
        '<button class="link-btn" data-act="login">Admin bo\u2018lib kirish</button>';
    }
  }

  /* ================= MARSHRUTLASH ================= */
  let quiz = null;

  function route() {
    const raw = decodeURIComponent(location.hash.replace(/^#/, ''));
    const tm = raw.match(/^test\/(\d+)$/);
    if (tm) {
      const ti = Number(tm[1]);
      if (!validTests()[ti]) { location.replace('#testlar'); return; }
      if (!quiz || quiz.ti !== ti) quiz = { ti:ti, qi:0, score:0, answered:false, wrong:[] };
      renderQuiz();
    } else if (SECTIONS[raw]) {
      quiz = null;
      if (raw === 'testlar') renderTests(); else renderList(raw);
    } else {
      quiz = null;
      renderDashboard();
    }
    const h = app.querySelector('h2, .panel');
    if (h) { h.setAttribute('tabindex','-1'); h.focus({ preventScroll:true }); }
  }
  window.addEventListener('hashchange', route);
  const go = (h) => { location.hash = h; };

  /* ================= BOSH SAHIFA ================= */
  function renderDashboard() {
    app.innerHTML = '<nav class="panel-grid" aria-label="Bo\u2018limlar">' +
      Object.keys(SECTIONS).map(function (key) {
        const s = SECTIONS[key];
        const n = key === 'testlar' ? validTests().length : store[key].length;
        return '<button class="panel" data-go="' + key + '">' +
          '<span class="p-bar" aria-hidden="true"></span>' +
          '<span class="icon" aria-hidden="true">' + s.icon + '</span>' +
          '<span class="p-title">' + esc(s.title) + '</span>' +
          '<span class="p-count mono">' + n + ' ta ' + esc(s.unit) + '</span></button>';
      }).join('') + '</nav>';
  }

  function head(title, count, backHash, backLabel) {
    return '<div class="section-head">' +
      '<button class="back-btn" data-go="' + esc(backHash) + '">\u2190 ' + esc(backLabel) + '</button>' +
      '<h2>' + esc(title) + '</h2>' +
      (count ? '<span class="count-pill">' + esc(count) + '</span>' : '<span class="head-spacer"></span>') +
      '</div>';
  }

  const addBtn = (key) => isAdmin
    ? '<button class="add-btn" data-add="' + key + '">+ ' + esc(SECTIONS[key].yangi) + '</button>' : '';

  const rowTools = (key, i) => isAdmin
    ? '<span class="tools">' +
      '<button class="tool" data-edit="' + key + '" data-i="' + i + '" aria-label="Tahrirlash">\u270E</button>' +
      '<button class="tool del" data-del="' + key + '" data-i="' + i + '" aria-label="O\u2018chirish">\u2715</button>' +
      '</span>' : '';

  /* ================= RO'YXATLAR ================= */
  const ROW = {
    xodimlar: (i) => [i.ism, i.lavozim || '', i.toifa, null, 'role'],
    kutubxona: (i) => [i.nom, (i.muallif||'') + (i.format ? ' \u00b7 ' + i.format : ''), i.mavzu, i.havola],
    darsliklar: (i) => [i.nom, i.davomiyligi ? 'Davomiyligi: ' + i.davomiyligi : '', i.daraja, i.havola],
  };
  const KEYS = {
    xodimlar: (i) => [i.ism, i.lavozim, i.toifa],
    kutubxona: (i) => [i.nom, i.muallif, i.mavzu],
    darsliklar: (i) => [i.nom, i.daraja],
  };

  function cardHtml(key, item, idx) {
    const r = ROW[key](item);
    const main = r[0], sub = r[1], tag = r[2], href = r[3], subCls = r[4] || '';
    const inner = '<span class="c-body"><span class="main">' + esc(main) + '</span>' +
      (sub ? '<span class="sub ' + subCls + '">' + esc(sub) + '</span>' : '') + '</span>' +
      (tag ? '<span class="tag">' + esc(tag) + '</span>' : '') + rowTools(key, idx);
    if (!href || isAdmin) return '<div class="card">' + inner + '</div>';
    // PDF bo'lsa — saytning o'z ko'ruvchisida ochamiz (telefonda yuklab ketmasligi uchun)
    const dest = /\.pdf$/i.test(href)
      ? 'kitob.html?f=' + encodeURIComponent(href) + '&nom=' + encodeURIComponent(main)
      : href;
    return '<a class="card card-link" href="' + esc(dest) + '">' + inner + '</a>';
  }

  function renderList(key) {
    const s = SECTIONS[key];
    const items = store[key];
    app.innerHTML = head(s.title, items.length + ' ta', '', 'Bosh sahifa') + addBtn(key) +
      (items.length
        ? '<label class="sr-only" for="searchBox">' + esc(s.title) + ' ichidan qidirish</label>' +
          '<input class="search" id="searchBox" type="search" autocomplete="off" placeholder="Qidirish...">' +
          '<div class="card-list" id="listBox"></div>'
        : '<div class="empty-state">Bu bo\u2018limda hozircha ma\u2019lumot yo\u2018q.' +
          (isAdmin ? '' : '<br><span class="hint-sm">Admin bo\u2018lib kirib qo\u2018shishingiz mumkin.</span>') +
          '</div>');

    if (!items.length) return;
    const listBox = document.getElementById('listBox');
    const box = document.getElementById('searchBox');

    function draw(q) {
      const f = norm(q);
      const rows = items.map((it, i) => [it, i])
        .filter(p => !f || KEYS[key](p[0]).some(k => norm(k).indexOf(f) !== -1));
      listBox.innerHTML = rows.length
        ? rows.map(p => cardHtml(key, p[0], p[1])).join('')
        : '<div class="empty-state">"' + esc(q) + '" bo\u2018yicha hech narsa topilmadi.</div>';
      if (f) announce(rows.length + ' ta natija');
    }
    let t;
    box.addEventListener('input', function (e) {
      clearTimeout(t); const v = e.target.value; t = setTimeout(() => draw(v), 120);
    });
    draw('');
  }

  /* ================= TESTLAR ================= */
  function renderTests() {
    const tests = validTests();
    app.innerHTML = head('Testlar', tests.length + ' ta', '', 'Bosh sahifa') + addBtn('testlar') +
      (store.testlar.length
        ? store.testlar.map(function (t, i) {
            const n = (t.savollar || []).length;
            return '<div class="test-row">' +
              '<button class="test-pick" data-go="test/' + i + '"' + (n ? '' : ' disabled') + '>' +
              '<span class="c-body"><span class="main">' + esc(t.nom || '(nomsiz test)') + '</span>' +
              '<span class="sub">' + n + ' ta savol</span></span>' +
              '<span class="go" aria-hidden="true">BOSHLASH \u2192</span></button>' +
              rowTools('testlar', i) + '</div>';
          }).join('')
        : '<div class="empty-state">Hozircha test qo\u2018shilmagan.</div>');
  }

  function renderQuiz() {
    const test = validTests()[quiz.ti];
    const q = test.savollar[quiz.qi];
    const total = test.savollar.length;

    app.innerHTML = head(test.nom, '', 'testlar', 'Testlar') +
      '<div class="quiz-box"><div class="quiz-meta">' +
      '<span>Savol ' + (quiz.qi+1) + ' / ' + total + '</span>' +
      '<span>To\u2018g\u2018ri: ' + quiz.score + '</span></div>' +
      '<div class="progress" aria-hidden="true"><i style="width:' + ((quiz.qi/total)*100) + '%"></i></div>' +
      '<div class="quiz-q">' + esc(q.savol) + '</div>' +
      '<div id="opts" role="group" aria-label="Javob variantlari"></div>' +
      '<button class="next-btn" id="nextBtn" disabled>' +
      (quiz.qi+1 < total ? 'Keyingi savol' : 'Natijani ko\u2018rish') + '</button></div>';

    const opts = document.getElementById('opts');
    const next = document.getElementById('nextBtn');

    (q.variantlar || []).forEach(function (text, i) {
      const b = document.createElement('button');
      b.className = 'opt'; b.type = 'button'; b.textContent = text;
      b.addEventListener('click', function () {
        if (quiz.answered) return;
        quiz.answered = true;
        const ok = i === q.togri;
        if (ok) quiz.score++;
        else quiz.wrong.push({ savol:q.savol, berilgan:text, togri:q.variantlar[q.togri] });
        Array.prototype.forEach.call(opts.children, function (el, bi) {
          el.disabled = true;
          if (bi === q.togri) el.classList.add('correct');
          else if (bi === i) el.classList.add('wrong');
        });
        announce(ok ? 'To\u2018g\u2018ri javob' : 'Xato. To\u2018g\u2018ri javob belgilandi.');
        next.disabled = false; next.focus();
      });
      opts.appendChild(b);
    });

    next.addEventListener('click', function () {
      quiz.answered = false;
      if (quiz.qi + 1 < total) { quiz.qi++; renderQuiz(); }
      else renderResult();
    });
  }

  function renderResult() {
    const test = validTests()[quiz.ti];
    const total = test.savollar.length, score = quiz.score;
    const pct = Math.round((score/total)*100);
    const label = pct>=80 ? 'A\u2019lo natija' : pct>=50 ? 'Qoniqarli' : 'Qayta o\u2018rganish tavsiya etiladi';
    const review = quiz.wrong.length
      ? '<div class="review"><h3>Xato javoblar</h3>' + quiz.wrong.map(w =>
          '<div class="review-item"><div class="main">' + esc(w.savol) + '</div>' +
          '<div class="sub bad">Sizning javobingiz: ' + esc(w.berilgan) + '</div>' +
          '<div class="sub good">To\u2018g\u2018ri javob: ' + esc(w.togri) + '</div></div>').join('') + '</div>'
      : '';

    app.innerHTML = head(test.nom, '', 'testlar', 'Testlar') +
      '<div class="quiz-box"><div class="result-score">' + score + ' / ' + total + '</div>' +
      '<div class="result-label">' + esc(label) + ' \u00b7 ' + pct + '%</div>' +
      '<button class="next-btn wide" data-retry="1">Testni qayta ishlash</button>' +
      '<button class="ghost-btn wide" data-go="testlar">Testlar ro\u2018yxati</button>' +
      review + '</div>';
    announce('Test yakunlandi. Natija: ' + score + ' dan ' + total + '.');
  }

  /* ================= MODAL ================= */
  let modalEl = null;
  const escClose = (e) => { if (e.key === 'Escape') closeModal(); };

  function openModal(title, bodyHtml, onSave) {
    closeModal();
    modalEl = document.createElement('div');
    modalEl.className = 'modal-back';
    modalEl.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
      '<div class="modal-head"><h3>' + esc(title) + '</h3>' +
      '<button class="tool" data-mclose="1" aria-label="Yopish">\u2715</button></div>' +
      '<div class="modal-body">' + bodyHtml + '</div>' +
      '<div class="modal-foot"><button class="ghost-btn" data-mclose="1">Bekor qilish</button>' +
      '<button class="next-btn" data-msave="1">Saqlash</button></div></div>';
    document.body.appendChild(modalEl);
    document.body.classList.add('noscroll');
    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl || e.target.closest('[data-mclose]')) closeModal();
      else if (e.target.closest('[data-msave]')) { if (onSave(modalEl) !== false) closeModal(); }
    });
    const first = modalEl.querySelector('input, textarea, select');
    if (first) first.focus();
    document.addEventListener('keydown', escClose);
  }
  function closeModal() {
    if (modalEl) { modalEl.remove(); modalEl = null; }
    document.body.classList.remove('noscroll');
    document.removeEventListener('keydown', escClose);
  }

  /* ================= ADMIN: YOZUV FORMASI ================= */
  function fieldForm(key, item) {
    return FIELDS[key].map(f =>
      '<label class="f-lab">' + esc(f.label) + (f.req ? ' <span class="req">*</span>' : '') +
      '<input class="f-in" data-k="' + f.k + '" value="' + esc(item ? item[f.k] : '') + '">' +
      (f.hint ? '<span class="f-hint">' + esc(f.hint) + '</span>' : '') + '</label>').join('');
  }

  function editRecord(key, idx) {
    const isNew = idx == null;
    const item = isNew ? {} : store[key][idx];
    openModal(isNew ? SECTIONS[key].yangi : 'Tahrirlash', fieldForm(key, item), function (root) {
      const out = {};
      let bad = null;
      FIELDS[key].forEach(function (f) {
        const el = root.querySelector('[data-k="' + f.k + '"]');
        el.classList.remove('invalid');
        const v = el.value.trim();
        if (f.req && !v && !bad) bad = el;
        out[f.k] = v;
      });
      if (bad) { bad.classList.add('invalid'); bad.focus(); return false; }
      if (isNew) store[key].push(out); else store[key][idx] = out;
      saveDraft(); route();
      announce(isNew ? 'Qo\u2018shildi' : 'Saqlandi');
    });
  }

  /* ================= ADMIN: TEST TAHRIRLASH ================= */
  function qBlock(q, n) {
    const vs = (q && q.variantlar) ? q.variantlar : ['', '', '', ''];
    return '<div class="q-block" data-q>' +
      '<div class="q-head"><span>Savol ' + n + '</span>' +
      '<button class="tool del" data-qdel="1" aria-label="Savolni o\u2018chirish">\u2715</button></div>' +
      '<label class="f-lab">Savol matni <span class="req">*</span>' +
      '<textarea class="f-in" data-qs rows="2">' + esc(q ? q.savol : '') + '</textarea></label>' +
      '<label class="f-lab">Variantlar \u2014 har birini yangi qatordan yozing <span class="req">*</span>' +
      '<textarea class="f-in" data-qv rows="4">' + esc(vs.join('\n')) + '</textarea>' +
      '<span class="f-hint">Kamida 2 ta variant kerak</span></label>' +
      '<label class="f-lab">To\u2018g\u2018ri javob raqami <span class="req">*</span>' +
      '<input class="f-in" data-qt type="number" min="1" value="' + (q ? (q.togri|0)+1 : 1) + '">' +
      '<span class="f-hint">Tartib raqami: 1 = birinchi qator</span></label></div>';
  }

  function editTest(idx) {
    const isNew = idx == null;
    const t = isNew ? { nom:'', savollar:[] } : store.testlar[idx];
    const body =
      '<label class="f-lab">Test nomi <span class="req">*</span>' +
      '<input class="f-in" data-tname value="' + esc(t.nom || '') + '"></label>' +
      '<div id="qlist">' + ((t.savollar || []).map((q,i) => qBlock(q, i+1)).join('') || qBlock(null,1)) + '</div>' +
      '<button class="add-btn small" data-qadd="1">+ Savol qo\u2018shish</button>';

    openModal(isNew ? 'Yangi test' : 'Testni tahrirlash', body, function (root) {
      const nameEl = root.querySelector('[data-tname]');
      nameEl.classList.remove('invalid');
      const nom = nameEl.value.trim();
      if (!nom) { nameEl.classList.add('invalid'); nameEl.focus(); return false; }

      const savollar = [];
      const blocks = Array.prototype.slice.call(root.querySelectorAll('[data-q]'));
      for (let bi = 0; bi < blocks.length; bi++) {
        const b = blocks[bi];
        const sEl = b.querySelector('[data-qs]'), vEl = b.querySelector('[data-qv]'), tEl = b.querySelector('[data-qt]');
        sEl.classList.remove('invalid'); vEl.classList.remove('invalid'); tEl.classList.remove('invalid');
        const savol = sEl.value.trim();
        const variantlar = vEl.value.split('\n').map(x => x.trim()).filter(Boolean);
        const togri = parseInt(tEl.value, 10) - 1;
        if (!savol) { sEl.classList.add('invalid'); sEl.focus(); return false; }
        if (variantlar.length < 2) { vEl.classList.add('invalid'); vEl.focus(); return false; }
        if (!(togri >= 0 && togri < variantlar.length)) { tEl.classList.add('invalid'); tEl.focus(); return false; }
        savollar.push({ savol:savol, variantlar:variantlar, togri:togri });
      }
      if (!savollar.length) return false;

      const out = { nom:nom, savollar:savollar };
      if (isNew) store.testlar.push(out); else store.testlar[idx] = out;
      saveDraft(); route();
      announce(isNew ? 'Test qo\u2018shildi' : 'Test saqlandi');
    });

    modalEl.addEventListener('click', function (e) {
      if (e.target.closest('[data-qadd]')) {
        const list = modalEl.querySelector('#qlist');
        list.insertAdjacentHTML('beforeend', qBlock(null, list.children.length + 1));
        list.lastElementChild.querySelector('textarea').focus();
      } else if (e.target.closest('[data-qdel]')) {
        const list = modalEl.querySelector('#qlist');
        if (list.children.length > 1) {
          e.target.closest('[data-q]').remove();
          Array.prototype.forEach.call(list.children, function (b, i) {
            b.querySelector('.q-head span').textContent = 'Savol ' + (i+1);
          });
        }
      }
    });
  }

  /* ================= ADMIN: KIRISH ================= */
  function loginModal() {
    openModal('Admin bo\u2018lib kirish',
      '<label class="f-lab">Admin kodi' +
      '<input class="f-in" data-code type="password" autocomplete="current-password"></label>' +
      '<div class="f-err" data-cerr></div>' +
      '<p class="f-hint">Eslatma: bu kod qulaylik uchun, himoya vositasi emas. ' +
      'Saytga maxfiy ma\u2019lumot joylamang.</p>',
      function () { return false; });

    const input = modalEl.querySelector('[data-code]');
    const err = modalEl.querySelector('[data-cerr]');
    const saveBtn = modalEl.querySelector('[data-msave]');
    saveBtn.textContent = 'Kirish';

    const attempt = async function () {
      const h = await sha256(input.value);
      const ok = h ? (h === PAROL_HASH) : (input.value === 'vchd5admin');
      if (ok) {
        isAdmin = true; LS.set(ADMIN_KEY, '1');
        closeModal(); renderBar(); route();
        announce('Admin rejimi yoqildi');
      } else {
        err.textContent = 'Kod noto\u2018g\u2018ri.';
        input.value = ''; input.focus();
      }
    };
    saveBtn.addEventListener('click', attempt);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') attempt(); });
  }

  /* ================= ADMIN: data.js EKSPORTI ================= */
  function buildDataJs() {
    const block = (name, list, comment) => {
      const rows = list.map(o => '  ' + JSON.stringify(o)).join(',\n');
      return '/* ' + comment + ' */\nconst ' + name + ' = [\n' + rows + (rows ? ',' : '') + '\n];\n';
    };
    const testRows = store.testlar.map(t =>
      '  {\n    nom: ' + JSON.stringify(t.nom) + ',\n    savollar: [\n' +
      (t.savollar || []).map(q => '      ' + JSON.stringify(q)).join(',\n') +
      '\n    ],\n  }').join(',\n');

    return '/* ============================================================\n' +
      '   TELEJKA TA\u2019MIRLASH SEXI \u2014 MA\u2019LUMOTLAR BAZASI\n' +
      '   Admin panel orqali yaratilgan: ' + new Date().toLocaleString('uz-UZ') + '\n' +
      '   GitHub repositorydagi eski data.js o\u2018rniga shuni yuklang.\n' +
      '   ============================================================ */\n\n' +
      block('XODIMLAR', store.xodimlar, '1) XODIMLAR \u2014 sex shtati') + '\n' +
      block('KITOBLAR', store.kutubxona, '2) KUTUBXONA \u2014 elektron kitoblar') + '\n' +
      block('DARSLIKLAR', store.darsliklar, '3) DARSLIKLAR \u2014 o\u2018quv materiallari') + '\n' +
      '/* 4) TESTLAR \u2014 "togri" to\u2018g\u2018ri javob indeksi (0 dan boshlanadi) */\n' +
      'const TESTLAR = [\n' + testRows + (testRows ? ',' : '') + '\n];\n';
  }

  function exportDataJs() {
    const blob = new Blob([buildDataJs()], { type:'text/javascript;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    hasDraft = false; LS.del(DRAFT_KEY); renderBar();
    announce('data.js yuklab olindi');

    openModal('Keyingi qadam',
      '<p class="f-hint" style="font-size:14px;line-height:1.6"><b>data.js</b> fayli yuklab olindi. Endi:</p>' +
      '<ol class="steps"><li>GitHub\u2019da repositoryni oching</li>' +
      '<li>Eski <code>data.js</code> faylini bosing \u2192 o\u2018chirish belgisi bilan o\u2018chiring</li>' +
      '<li><b>Add file \u2192 Upload files</b> orqali yangi <code>data.js</code> ni yuklang</li>' +
      '<li><b>Commit changes</b> bosing</li></ol>' +
      '<p class="f-hint">1\u20132 daqiqadan so\u2018ng sayt barcha xodimlar uchun yangilanadi.</p>',
      function () { return true; });
    modalEl.querySelector('[data-msave]').textContent = 'Tushunarli';
    const cancel = modalEl.querySelector('.modal-foot .ghost-btn');
    if (cancel) cancel.remove();
  }

  /* ================= HODISALAR ================= */
  document.addEventListener('click', function (e) {
    const t = e.target;
    if (modalEl && modalEl.contains(t)) return;

    const goEl = t.closest('[data-go]');
    if (goEl && !goEl.disabled) { go(goEl.getAttribute('data-go')); return; }
    if (t.closest('[data-retry]')) {
      quiz = { ti:quiz.ti, qi:0, score:0, answered:false, wrong:[] };
      renderQuiz(); return;
    }

    const act = t.closest('[data-act]');
    if (act) {
      const a = act.getAttribute('data-act');
      if (a === 'login') loginModal();
      else if (a === 'export') exportDataJs();
      else if (a === 'discard') {
        if (window.confirm('Saqlanmagan o\u2018zgarishlar o\u2018chiriladi va sayt data.js dagi ma\u2019lumotga qaytadi. Davom etamizmi?')) tashlaQoralama();
      }
      else if (a === 'logout') {
        isAdmin = false; LS.del(ADMIN_KEY);
        renderBar(); route(); announce('Admin rejimidan chiqildi');
      }
      return;
    }
    if (!isAdmin) return;

    const add = t.closest('[data-add]');
    if (add) {
      const k = add.getAttribute('data-add');
      if (k === 'testlar') editTest(null); else editRecord(k, null);
      return;
    }
    const ed = t.closest('[data-edit]');
    if (ed) {
      const k = ed.getAttribute('data-edit'), i = +ed.getAttribute('data-i');
      if (k === 'testlar') editTest(i); else editRecord(k, i);
      return;
    }
    const del = t.closest('[data-del]');
    if (del) {
      const k = del.getAttribute('data-del'), i = +del.getAttribute('data-i');
      const rec = store[k][i];
      const nomi = k === 'testlar' ? rec.nom : (rec.ism || rec.nom);
      if (window.confirm('"' + nomi + '" o\u2018chirilsinmi?')) {
        store[k].splice(i, 1); saveDraft(); route(); announce('O\u2018chirildi');
      }
    }
  });

  /* ================= ISHGA TUSHIRISH ================= */
  try {
    renderBar(); route();
    if (draftEskirdi) announce('Sayt ma\u2019lumoti yangilangan, eski qoralama bekor qilindi.');
  }
  catch (err) {
    app.innerHTML = '<div class="empty-state">Ma\u2019lumotlarni yuklashda xatolik.<br>' +
      '<span class="hint-sm">data.js faylini tekshiring.</span></div>';
    console.error(err);
  }
})();
