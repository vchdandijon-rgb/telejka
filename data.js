/* ============================================================
   TELEJKA TA’MIRLASH SEXI — MA’LUMOTLAR BAZASI
   Admin panel orqali yaratilgan: 04/08/2026, 09:31:15
   GitHub repositorydagi eski data.js o‘rniga shuni yuklang.
   ============================================================ */

/* 1) XODIMLAR — sex shtati */
const XODIMLAR = [
  {"ism":"Avazbek Axmedov","lavozim":" Sex ustasi","toifa":"7- toifa"},
  {"ism":"Hayrullo Raximov","lavozim":" Sex ustasi","toifa":"7-toifa"},
  {"ism":"Kamola Umarova","lavozim":" Brigadir","toifa":"6-toifa"},
  {"ism":"Jasur Inobiddinov","lavozim":" Chilangar","toifa":"4-toifa"},
  {"ism":"Abdulxamid Xasanov","lavozim":" Chilangar","toifa":"4-toifa"},
  {"ism":"Roziqov Xotamjon","lavozim":" Chilangar","toifa":"4-toifa"},
  {"ism":"Qobilov Marufjon","lavozim":" Chilangar","toifa":"4-toifa"},
  {"ism":"Anvar Axmedov","lavozim":" Chilangar","toifa":"4 toifa"},
  {"ism":"Alimqulov Qaxramon","lavozim":" Chilangar","toifa":"4-toifa"},
  {"ism":"Xamdamov Muhammadyusuf","lavozim":" Chilangar","toifa":"4-toifa"},
  {"ism":"Qo`ziyev Ar-Rauf","lavozim":" Chilangar","toifa":"4-toifa"},
  {"ism":"Maxamadov Asadbek","lavozim":" Chilangar","toifa":"4-toifa"},
  {"ism":"Qo`ziboev Shuxrat","lavozim":" Elektrpayvandchi","toifa":"4-toifa"}, 
  {"ism":"Nishonov NEmatillo","lavozim":"  Elektrpayvandchi","toifa":"5-toifa"},
  {"ism":"Omonov Qodirjon","lavozim":" Elektrgazpayvandchi","toifa":"4-toifa"},
  {"ism":"Xodjiboyev Biloliddin","lavozim":" Elektrgazpayvandchi","toifa":"4-toifa"},
  {"ism":"Olimjonov Ulug`bek","lavozim":" nuqson topuvchi","toifa":"4-toifa"},
  {"ism":"Matxoliqov Nurullo","lavozim":" nuqson topuvchi","toifa":"4-toifa"}, 
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
