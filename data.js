/* ============================================================
   TELEJKA TA’MIRLASH SEXI — MA’LUMOTLAR BAZASI
   Admin panel orqali yaratilgan: 04/08/2026, 09:31:15
   GitHub repositorydagi eski data.js o‘rniga shuni yuklang.
   ============================================================ */

/* 1) XODIMLAR — sex shtati */
const XODIMLAR = [
  {"ism":"Avazbek Axmedov","lavozim":"Sex ustasi","toifa":"7- toifa","staj":"-"},
  {"ism":"Hayrullo Raximov","lavozim":"sex ustasi","toifa":"7-toifa","staj":"-"},
  {"ism":"Otabek Rahimov","lavozim":"Payvandchi","toifa":"2-toifa","staj":"6 yil"},
  {"ism":"Jasur Ne'matov","lavozim":"Payvandchi","toifa":"1-toifa","staj":"11 yil"},
  {"ism":"Diyor Sultonov","lavozim":"Mexanik-slesar","toifa":"2-toifa","staj":"4 yil"},
  {"ism":"Farrux Aliyev","lavozim":"Mexanik-slesar","toifa":"3-toifa","staj":"2 yil"},
  {"ism":"Bekzod Tursunov","lavozim":"Elektrik","toifa":"1-toifa","staj":"8 yil"},
  {"ism":"Nodira Xolova","lavozim":"Sifat nazoratchisi","toifa":"Oliy toifa","staj":"10 yil"},
  {"ism":"Ulug'bek Karimov","lavozim":"Bo'yoqchi","toifa":"2-toifa","staj":"5 yil"},
  {"ism":"Sherzod Ismoilov","lavozim":"Omborchi","toifa":"—","staj":"3 yil"},
];

/* 2) KUTUBXONA — elektron kitoblar */
const KITOBLAR = [
  {"nom":"Payvandlash ishlari asoslari","muallif":"T. Nazarov","format":"PDF · 4.2 MB","mavzu":"Payvandlash","havola":""},
  {"nom":"Metall konstruksiyalarni ta'mirlash","muallif":"R. Islomov","format":"PDF · 6.8 MB","mavzu":"Ta'mirlash"},
  {"nom":"Gidravlik tizimlar qo'llanmasi","muallif":"A. Yo'ldoshev","format":"PDF · 3.5 MB","mavzu":"Gidravlika"},
  {"nom":"Mehnat muhofazasi va texnika xavfsizligi","muallif":"Sex arxivi","format":"PDF · 1.9 MB","mavzu":"Xavfsizlik"},
  {"nom":"G'ildirak va podshipnik tuzilishi","muallif":"M. Sobirov","format":"PDF · 2.7 MB","mavzu":"Mexanika"},
  {"nom":"Bo'yash va korroziyadan himoya","muallif":"D. Egamov","format":"PDF · 2.1 MB","mavzu":"Bo'yash"},
];

/* 3) DARSLIKLAR — o‘quv materiallari */
const DARSLIKLAR = [
  {"nom":"Telejka konstruksiyasi va tuzilishi","davomiyligi":"45 daq","daraja":"Boshlang'ich"},
  {"nom":"Payvandlash texnikasi: amaliy asoslar","davomiyligi":"60 daq","daraja":"O'rta"},
  {"nom":"Gidravlik nasos va shlanglarni almashtirish","davomiyligi":"40 daq","daraja":"O'rta"},
  {"nom":"Elektr sxemalarini o'qish","davomiyligi":"50 daq","daraja":"Yuqori"},
  {"nom":"Mehnat muhofazasi bo'yicha yo'riqnoma","davomiyligi":"30 daq","daraja":"Boshlang'ich"},
  {"nom":"Nosozliklarni aniqlash va diagnostika","davomiyligi":"55 daq","daraja":"Yuqori"},
];

/* 4) TESTLAR — "togri" to‘g‘ri javob indeksi (0 dan boshlanadi) */
const TESTLAR = [
  {
    nom: "Mehnat muhofazasi — asosiy test",
    savollar: [
      {"savol":"Payvandlash ishlarida qanday himoya vositasi majburiy?","variantlar":["Qo'lqop","Payvandchi niqobi","Shlyapa","Ko'zoynak (oddiy)"],"togri":1},
      {"savol":"Elektr asboblari bilan ishlashdan oldin nima tekshiriladi?","variantlar":["Rangi","Og'irligi","Izolyatsiya holati","Narxi"],"togri":2},
      {"savol":"Yong'in chiqqanda birinchi navbatda nima qilinadi?","variantlar":["Ishni davom ettirish","Signal berish va sexni bo'shatish","Derazani ochish","Hech narsa"],"togri":1}
    ],
  },
  {
    nom: "Telejka mexanikasi — bilim testi",
    savollar: [
      {"savol":"G'ildirak podshipnigi qachon almashtiriladi?","variantlar":["Yiliga bir marta majburiy","Ovoz/tebranish paydo bo'lganda","Hech qachon","Faqat rangi o'zgarsa"],"togri":1},
      {"savol":"Gidravlik tizimda bosim pasayishi odatda nimadan darak beradi?","variantlar":["Moy yetarli","Shlangda sizish","Harorat past","Muammo yo'q"],"togri":1},
      {"savol":"Payvand chok sifatini tekshirishning eng sodda usuli?","variantlar":["Vizual ko'rik","Hidini bilish","Rangini solishtirish","Og'irligini o'lchash"],"togri":0}
    ],
  },
];
