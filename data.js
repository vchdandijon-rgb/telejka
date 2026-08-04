/* ============================================================
   TELEJKA TA’MIRLASH SEXI — MA’LUMOTLAR BAZASI
   Admin panel orqali yaratilgan: 04/08/2026, 10:36:44
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
  {"nom":"РД 32 ЦВ 050-2020 (с 01.01.2025)","muallif":"-","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/РД 32 ЦВ 050-2020 (с 01.01.2025).PDF"},
  {"nom":"РД 32 ЦВ 052-2009 (с 01.07.2026 г)","muallif":"-","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/РД 32 ЦВ 052-2009 (с 01.07.2026 г).pdf"},
  {"nom":"РД 32 ЦВ 067-2022 (с 01.01.2025г)","muallif":"","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/РД 32 ЦВ 067-2022 (с 01.01.2025г).pdf"},
  {"nom":"РД 32 ЦВ 082-2021 (с 01.01.2026 г)","muallif":"","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/РД 32 ЦВ 082-2021 (с 01.01.2026 г).pdf"},
  {"nom":"Руководства ДР Пасс вагон","muallif":"-","format":"PDF","mavzu":"normativ xujjat","havola":"kitoblar/Руководства ДР Пасс вагон (2).pdf"},
  {"nom":"Сварка_и_наплавка_корпуса_буксы_Технологическая_инструкция_ТИ_05","muallif":"-","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/Сварка_и_наплавка_корпуса_буксы_Технологическая_инструкция_ТИ_05.pdf"},
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
