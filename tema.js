/* ============================================================
   Kunduzgi / tungi rejim
   Sahifa chizilishidan oldin qo'llanadi — shuning uchun
   ochilganda rang "sakramaydi". Tanlov brauzerda saqlanadi.
   ============================================================ */
(function () {
  'use strict';
  var KEY = 'telejka:tema';
  var RANG = { tun: '#12161a', yorug: '#e9e6df' };

  function saqlangan() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function qoLla(t) {
    document.documentElement.setAttribute('data-tema', t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', RANG[t] || RANG.tun);
    var cs = document.querySelector('meta[name="color-scheme"]');
    if (cs) cs.setAttribute('content', t === 'yorug' ? 'light' : 'dark');
    tugmaniYangila(t);
  }

  function tugmaniYangila(t) {
    var b = document.getElementById('temaBtn');
    if (!b) return;
    b.textContent = t === 'yorug' ? '\u263D' : '\u2600';
    b.setAttribute('aria-label', t === 'yorug' ? 'Tungi rejimga o\u2018tish' : 'Kunduzgi rejimga o\u2018tish');
    b.setAttribute('title', t === 'yorug' ? 'Tungi rejim' : 'Kunduzgi rejim');
  }

  var tizim = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)
    ? 'yorug' : 'tun';
  qoLla(saqlangan() || tizim);

  document.addEventListener('DOMContentLoaded', function () {
    tugmaniYangila(document.documentElement.getAttribute('data-tema'));
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('#temaBtn')) return;
    var yangi = document.documentElement.getAttribute('data-tema') === 'yorug' ? 'tun' : 'yorug';
    try { localStorage.setItem(KEY, yangi); } catch (err) {}
    qoLla(yangi);
  });
})();
