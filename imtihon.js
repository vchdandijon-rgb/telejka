/* ============================================================
   IMTIHON TIZIMI — etaplar, reyting, natijalarni saqlash
   Andijon vagon deposi · telejka ta'mirlash sexi
   ============================================================
   Bu fayl app.js dan KEYIN ulanadi va «Testlar» bo'limini
   to'liq imtihon tizimiga aylantiradi.
   Ma'lumot brauzer xotirasida (localStorage) saqlanadi.
   ============================================================ */
(function () {
  'use strict';

  if (typeof ETAPLAR === 'undefined' || !Array.isArray(ETAPLAR) || !ETAPLAR.length) return;

  var K_USER   = 'telejka.imtihon.user';
  var K_SCORES = 'telejka.imtihon.scores';
  var OTISH    = 80;          // etapdan o'tish uchun kerakli foiz
  var app = document.getElementById('app') || document.querySelector('main');
  if (!app) return;

  /* ---------- yordamchi ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  }
  function load(k, d) {
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }
    catch (e) { return d; }
  }
  function save(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }

  /* ---------- holat ---------- */
  var user = load(K_USER, null);          // { ism, id }
  var scores = load(K_SCORES, {});        // { id: { ism, etap: {n: {togri, jami, sana}} } }
  var quiz = null;

  function myRec() {
    if (!user) return null;
    if (!scores[user.id]) scores[user.id] = { ism: user.ism, etap: {} };
    scores[user.id].ism = user.ism;
    return scores[user.id];
  }
  function etapNat(n) {
    var r = myRec(); if (!r) return null;
    return r.etap[n] || null;
  }
  function ochiqmi(n) {
    if (n === 0) return true;
    var p = etapNat(n - 1);
    return !!(p && pct(p.togri, p.jami) >= OTISH);
  }
  function jamiBall(rec) {
    var s = 0;
    for (var k in rec.etap) s += rec.etap[k].togri;
    return s;
  }
  function otganEtap(rec) {
    var c = 0;
    for (var k in rec.etap) if (pct(rec.etap[k].togri, rec.etap[k].jami) >= OTISH) c++;
    return c;
  }

  /* ---------- ekranlar ---------- */
  function head(title, meta, back, backLabel) {
    return '<div class="imt-head">' +
      '<button class="back-btn" data-imt="' + esc(back) + '">\u2190 ' + esc(backLabel) + '</button>' +
      '<h2 class="panel-title">' + esc(title) + '</h2>' +
      (meta ? '<span class="count-badge">' + esc(meta) + '</span>' : '<span></span>') +
      '</div>';
  }

  function renderLogin() {
    app.innerHTML = head('Imtihon', '', '', 'Bosh sahifa') +
      '<div class="imt-card imt-login">' +
      '<div class="imt-ico">\u{1F464}</div>' +
      '<h3>Ismingizni kiriting</h3>' +
      '<p class="imt-lead">Natijalaringiz shu qurilmada saqlanadi. Keyingi safar qayta kiritish shart emas.</p>' +
      '<input class="imt-in" id="imtIsm" type="text" maxlength="40" placeholder="Familiya Ism" autocomplete="name">' +
      '<button class="next-btn wide" id="imtKir">Boshlash</button>' +
      '</div>';
    var inp = document.getElementById('imtIsm');
    var btn = document.getElementById('imtKir');
    inp.focus();
    function kir() {
      var v = inp.value.trim();
      if (v.length < 3) { inp.classList.add('invalid'); inp.focus(); return; }
      var id = 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
      user = { ism: v, id: id };
      save(K_USER, user); myRec(); save(K_SCORES, scores);
      renderEtaplar();
    }
    btn.addEventListener('click', kir);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') kir(); });
  }

  function renderEtaplar() {
    if (!user) return renderLogin();
    var rec = myRec();
    var jami = 0; ETAPLAR.forEach(function (e) { jami += e.savollar.length; });

    var rows = ETAPLAR.map(function (e, i) {
      var n = etapNat(i);
      var ochiq = ochiqmi(i);
      var p = n ? pct(n.togri, n.jami) : 0;
      var otdi = n && p >= OTISH;
      var cls = 'imt-etap' + (otdi ? ' done' : '') + (ochiq ? '' : ' locked');
      var badge = otdi ? '\u2713 ' + p + '%'
                : n ? p + '%'
                : ochiq ? 'BOSHLASH \u2192' : '\u{1F512}';
      return '<button class="' + cls + '" data-imt="etap/' + i + '"' + (ochiq ? '' : ' disabled') + '>' +
        '<span class="imt-num">' + (i + 1) + '</span>' +
        '<span class="imt-body">' +
          '<span class="imt-nom">' + esc(e.nom) + '</span>' +
          '<span class="imt-sub">' + esc(e.daraja) + ' \u00b7 ' + e.savollar.length + ' ta savol' +
          (n ? ' \u00b7 eng yaxshi: ' + n.togri + '/' + n.jami : '') + '</span>' +
        '</span>' +
        '<span class="imt-badge">' + badge + '</span></button>';
    }).join('');

    app.innerHTML = head('Imtihon', ETAPLAR.length + ' etap', '', 'Bosh sahifa') +
      '<div class="imt-user">' +
        '<span class="imt-ava">' + esc(user.ism.charAt(0).toUpperCase()) + '</span>' +
        '<span class="imt-ubody"><b>' + esc(user.ism) + '</b>' +
        '<span>Jami ball: ' + jamiBall(rec) + ' / ' + jami +
        ' \u00b7 O\u2018tilgan etap: ' + otganEtap(rec) + ' / ' + ETAPLAR.length + '</span></span>' +
        '<button class="imt-out" data-imt="chiqish" title="Boshqa ism bilan kirish">\u21BA</button>' +
      '</div>' +
      '<div class="imt-list">' + rows + '</div>' +
      '<button class="ghost-btn wide" data-imt="reyting">\u{1F3C6} Reyting jadvali</button>' +
      '<p class="imt-note">Keyingi etap oldingisini kamida ' + OTISH + '% ga yechganingizdan keyin ochiladi.</p>';
  }

  function renderQuiz() {
    var e = ETAPLAR[quiz.ei];
    var q = quiz.savollar[quiz.qi];
    var total = quiz.savollar.length;

    app.innerHTML = head(e.nom, (quiz.qi + 1) + ' / ' + total, 'imtihon', 'Etaplar') +
      '<div class="quiz-box">' +
      '<div class="quiz-meta"><span>Savol ' + (quiz.qi + 1) + ' / ' + total + '</span>' +
      '<span>To\u2018g\u2018ri: ' + quiz.score + '</span></div>' +
      '<div class="progress" aria-hidden="true"><i style="width:' + (quiz.qi / total * 100) + '%"></i></div>' +
      '<div class="quiz-q">' + esc(q.savol) + '</div>' +
      '<div id="imtOpts" role="group"></div>' +
      '<div id="imtIzoh"></div>' +
      '<button class="next-btn" id="imtNext" disabled>' +
      (quiz.qi + 1 < total ? 'Keyingi savol' : 'Natijani ko\u2018rish') + '</button></div>';

    var opts = document.getElementById('imtOpts');
    var next = document.getElementById('imtNext');
    var izoh = document.getElementById('imtIzoh');

    q.variantlar.forEach(function (text, i) {
      var b = document.createElement('button');
      b.className = 'opt'; b.type = 'button'; b.textContent = text;
      b.addEventListener('click', function () {
        if (quiz.answered) return;
        quiz.answered = true;
        var ok = (i === q.togri);
        if (ok) quiz.score++;
        else quiz.wrong.push({ savol:q.savol, berilgan:text, togri:q.variantlar[q.togri], izoh:q.izoh || '' });
        Array.prototype.forEach.call(opts.children, function (el, bi) {
          el.disabled = true;
          if (bi === q.togri) el.classList.add('correct');
          else if (bi === i) el.classList.add('wrong');
        });
        if (q.izoh) {
          izoh.className = 'imt-izoh ' + (ok ? 'ok' : 'no');
          izoh.innerHTML = '<b>' + (ok ? 'To\u2018g\u2018ri.' : 'Xato.') + '</b> ' + esc(q.izoh);
        }
        next.disabled = false; next.focus();
      });
      opts.appendChild(b);
    });

    next.addEventListener('click', function () {
      quiz.answered = false;
      if (quiz.qi + 1 < total) { quiz.qi++; renderQuiz(); }
      else renderNatija();
    });
  }

  function renderNatija() {
    var e = ETAPLAR[quiz.ei];
    var total = quiz.savollar.length, score = quiz.score, p = pct(score, total);
    var otdi = p >= OTISH;

    var rec = myRec();
    var eski = rec.etap[quiz.ei];
    var yangilandi = false;
    if (!eski || score > eski.togri) {
      rec.etap[quiz.ei] = { togri: score, jami: total, sana: new Date().toISOString().slice(0, 10) };
      yangilandi = true;
    }
    save(K_SCORES, scores);

    var label = otdi ? 'Etap topshirildi'
              : p >= 60 ? 'Yaqin qoldi \u2014 yana urinib ko\u2018ring'
              : 'Materialni qayta o\u2018rganish tavsiya etiladi';

    var review = quiz.wrong.length
      ? '<div class="review"><h3>Xato javoblar</h3>' + quiz.wrong.map(function (w) {
          return '<div class="review-item"><div class="main">' + esc(w.savol) + '</div>' +
            '<div class="sub bad">Sizning javobingiz: ' + esc(w.berilgan) + '</div>' +
            '<div class="sub good">To\u2018g\u2018ri javob: ' + esc(w.togri) + '</div>' +
            (w.izoh ? '<div class="sub src">' + esc(w.izoh) + '</div>' : '') + '</div>';
        }).join('') + '</div>'
      : '<div class="imt-perfect">Barcha savollarga to\u2018g\u2018ri javob berdingiz.</div>';

    var keyingi = (quiz.ei + 1 < ETAPLAR.length && otdi)
      ? '<button class="next-btn wide" data-imt="etap/' + (quiz.ei + 1) + '">Keyingi etap \u2192</button>' : '';

    app.innerHTML = head(e.nom, '', 'imtihon', 'Etaplar') +
      '<div class="quiz-box">' +
      '<div class="result-score' + (otdi ? ' pass' : '') + '">' + score + ' / ' + total + '</div>' +
      '<div class="result-label">' + esc(label) + ' \u00b7 ' + p + '%</div>' +
      (yangilandi ? '<div class="imt-new">\u2191 Natijangiz yangilandi</div>' : '') +
      keyingi +
      '<button class="next-btn wide" data-imt="etap/' + quiz.ei + '">Qayta ishlash</button>' +
      '<button class="ghost-btn wide" data-imt="imtihon">Etaplar ro\u2018yxati</button>' +
      review + '</div>';
  }

  function renderReyting() {
    var jami = 0; ETAPLAR.forEach(function (e) { jami += e.savollar.length; });
    var list = [];
    for (var id in scores) {
      var r = scores[id];
      list.push({ id:id, ism:r.ism, ball:jamiBall(r), etap:otganEtap(r) });
    }
    list.sort(function (a, b) { return b.ball - a.ball || b.etap - a.etap; });

    var rows = list.length ? list.map(function (x, i) {
      var men = user && x.id === user.id;
      var med = i === 0 ? '\u{1F947}' : i === 1 ? '\u{1F948}' : i === 2 ? '\u{1F949}' : (i + 1);
      return '<div class="imt-rank' + (men ? ' me' : '') + '">' +
        '<span class="imt-pos">' + med + '</span>' +
        '<span class="imt-rname">' + esc(x.ism) + (men ? ' <i>(siz)</i>' : '') + '</span>' +
        '<span class="imt-rball">' + x.ball + '<i>/' + jami + '</i></span>' +
        '<span class="imt-retap">' + x.etap + ' etap</span></div>';
    }).join('') : '<div class="empty-state">Hozircha natijalar yo\u2018q.</div>';

    app.innerHTML = head('Reyting', list.length + ' ishtirokchi', 'imtihon', 'Etaplar') +
      '<div class="imt-rank-head"><span>#</span><span>Ism</span><span>Ball</span><span>Etap</span></div>' +
      '<div class="imt-ranks">' + rows + '</div>' +
      '<p class="imt-note">Reyting shu qurilmada imtihon topshirganlarni ko\u2018rsatadi. ' +
      'Sexda umumiy planshet ishlatilsa, barcha xodimlar bitta jadvalda ko\u2018rinadi.</p>';
  }

  /* ---------- marshrutlash ---------- */
  function imtRoute() {
    var raw = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (raw === 'imtihon') { quiz = null; return user ? renderEtaplar() : renderLogin(), true; }
    if (raw === 'reyting') { quiz = null; return renderReyting(), true; }
    var m = raw.match(/^etap\/(\d+)$/);
    if (m) {
      var ei = Number(m[1]);
      if (!ETAPLAR[ei]) { location.hash = 'imtihon'; return true; }
      if (!user) { renderLogin(); return true; }
      if (!ochiqmi(ei)) { location.hash = 'imtihon'; return true; }
      if (!quiz || quiz.ei !== ei) {
        quiz = { ei:ei, qi:0, score:0, answered:false, wrong:[],
                 savollar: shuffle(ETAPLAR[ei].savollar) };
      }
      renderQuiz();
      return true;
    }
    return false;
  }

  window.addEventListener('hashchange', function () { imtRoute(); });

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-imt]') : null;
    if (!el || el.disabled) return;
    ev.preventDefault(); ev.stopPropagation();
    var v = el.getAttribute('data-imt');
    if (v === 'chiqish') {
      if (confirm('Boshqa ism bilan kirasizmi? Natijalaringiz reytingda saqlanib qoladi.')) {
        user = null; localStorage.removeItem(K_USER); renderLogin();
      }
      return;
    }
    if (v === '') { location.hash = ''; return; }
    location.hash = v;
  }, true);

  /* «Testlar» panelini imtihonga yo'naltirish */
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-go="testlar"]') : null;
    if (!el) return;
    ev.preventDefault(); ev.stopPropagation();
    location.hash = 'imtihon';
  }, true);

  /* bosh sahifadagi Testlar kartasi matnini yangilash */
  var TOTAL_Q = ETAPLAR.reduce(function (a, e) { return a + e.savollar.length; }, 0);
  var CARD_SUB = ETAPLAR.length + ' etap \u00b7 ' + TOTAL_Q + ' savol';
  var fixing = false;

  function fixDashboard() {
    if (fixing) return;
    var card = document.querySelector('.panel[data-go="testlar"]');
    if (!card || card.getAttribute('data-imt-fixed') === CARD_SUB) return;
    fixing = true;
    var t = card.querySelector('.p-title'); if (t) t.textContent = 'Imtihon';
    var c = card.querySelector('.p-count'); if (c) c.textContent = CARD_SUB;
    var ic = card.querySelector('.icon');  if (ic) ic.textContent = '\u{1F4CB}';
    card.setAttribute('data-imt-fixed', CARD_SUB);
    fixing = false;
  }

  new MutationObserver(function () { fixDashboard(); })
    .observe(app, { childList: true, subtree: true });

  if (!imtRoute()) fixDashboard();
})();
