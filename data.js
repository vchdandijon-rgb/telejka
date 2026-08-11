/* ============================================================
   ANDIJON VAGON DEPOSI — TELEJKA TA'MIRLASH SEXI
   MA'LUMOTLAR BAZASI
   ============================================================ */

/* 1) XODIMLAR — sex shtati */
const XODIMLAR = [
  {"ism":"Avazbek Axmedov","lavozim":"Sex ustasi","toifa":"7-toifa"},
  {"ism":"Hayrullo Raximov","lavozim":"Sex ustasi","toifa":"7-toifa"},
  {"ism":"Kamola Umarova","lavozim":"Brigadir","toifa":"6-toifa"},
  {"ism":"Jasur Inobiddinov","lavozim":"Chilangar","toifa":"4-toifa"},
  {"ism":"Abdulxamid Xasanov","lavozim":"Chilangar","toifa":"4-toifa"},
  {"ism":"Roziqov Xotamjon","lavozim":"Chilangar","toifa":"4-toifa"},
  {"ism":"Qobilov Marufjon","lavozim":"Chilangar","toifa":"4-toifa"},
  {"ism":"Anvar Axmedov","lavozim":"Chilangar","toifa":"4-toifa"},
  {"ism":"Alimqulov Qaxramon","lavozim":"Chilangar","toifa":"4-toifa"},
  {"ism":"Xamdamov Muhammadyusuf","lavozim":"Chilangar","toifa":"4-toifa"},
  {"ism":"Qo'ziyev Ar-Rauf","lavozim":"Chilangar","toifa":"4-toifa"},
  {"ism":"Maxamadov Asadbek","lavozim":"Chilangar","toifa":"4-toifa"},
  {"ism":"Qo'ziboev Shuxrat","lavozim":"Elektrpayvandchi","toifa":"4-toifa"},
  {"ism":"Nishonov NEmatillo","lavozim":"Elektrpayvandchi","toifa":"5-toifa"},
  {"ism":"Omonov Qodirjon","lavozim":"Elektrgazpayvandchi","toifa":"4-toifa"},
  {"ism":"Xodjiboyev Biloliddin","lavozim":"Elektrgazpayvandchi","toifa":"4-toifa"},
  {"ism":"Olimjonov Ulug'bek","lavozim":"Nuqson topuvchi","toifa":"4-toifa"},
  {"ism":"Matxoliqov Nurullo","lavozim":"Nuqson topuvchi","toifa":"4-toifa"},
];

/* 2) KUTUBXONA — elektron kitoblar */
const KITOBLAR = [
  {"nom":"РД 32 ЦВ 050-2020 — shablonlar bilan o'lchash tartibi (qo'llanma)","muallif":"","format":"PDF · 7,4 MB · 80 bet","mavzu":"shablonlar","havola":"kitoblar/RD-32-CV-050-2020-shablonlar-qollanma.pdf"},
  {"nom":"РД 32 ЦВ 050-2020 (с 01.01.2025)","muallif":"","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/РД 32 ЦВ 050-2020 (с 01.01.2025).PDF"},
  {"nom":"РД 32 ЦВ 052-2009 (с 01.07.2026 г)","muallif":"","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/РД 32 ЦВ 052-2009 (с 01.07.2026 г).pdf"},
  {"nom":"РД 32 ЦВ 067-2022 (с 01.01.2025г)","muallif":"","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/РД 32 ЦВ 067-2022 (с 01.01.2025г).pdf"},
  {"nom":"РД 32 ЦВ 082-2021 (с 01.01.2026 г)","muallif":"","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/РД 32 ЦВ 082-2021 (с 01.01.2026 г).pdf"},
  {"nom":"Руководства ДР Пасс вагон","muallif":"","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/Руководства ДР Пасс вагон (2).pdf"},
  {"nom":"Сварка_и_наплавка_корпуса_буксы_Технологическая_инструкция_ТИ_05","muallif":"","format":"PDF","mavzu":"normativ hujjat","havola":"kitoblar/Сварка_и_наплавка_корпуса_буксы_Технологическая_инструкция_ТИ_05.pdf"},
];

/* 3) DARSLIKLAR — o'quv materiallari
      1-10: РД 32 ЦВ 050-2020 (o'lchash metodikasi)
      11-17: РД 32 ЦВ 052-2009 (umumiy ta'mir rahbariyati)
      Har bir darslik darsliklar/ papkasidagi alohida HTML sahifada ochiladi. */
const DARSLIKLAR = [
  {"nom": "Yuk vagon aravachasi va uni ta'mirlash tizimi", "davomiyligi": "30 daq", "daraja": "Boshlang'ich", "havola": "darsliklar/01-yuk-vagon-aravachasi-va-uni-tamirlash-tizimi.html"},
  {"nom": "РД 32 ЦВ 050-2020 metodikasi bilan tanishuv", "davomiyligi": "25 daq", "daraja": "Boshlang'ich", "havola": "darsliklar/02-rd-32-cv-050-2020-metodikasi.html"},
  {"nom": "O'lchash shartlari va o'lchov vositalari", "davomiyligi": "35 daq", "daraja": "Boshlang'ich", "havola": "darsliklar/03-olchash-shartlari-va-olchov-vositalari.html"},
  {"nom": "Nadressor balkasi: prizma qiya yuzalari burchagini nazorat qilish", "davomiyligi": "40 daq", "daraja": "O'rta", "havola": "darsliklar/04-nadressor-balkasi-prizma-qiya-yuzalari-burchag.html"},
  {"nom": "Nadressor balkasi: «З» tayanch yuza uzunligi", "davomiyligi": "40 daq", "daraja": "O'rta", "havola": "darsliklar/05-nadressor-balkasi-z-tayanch-yuza-uzunligi.html"},
  {"nom": "Nadressor balkasi: qalinlik, burtlar, skolzun va qattiqlik", "davomiyligi": "35 daq", "daraja": "O'rta", "havola": "darsliklar/06-nadressor-balkasi-qalinlik-burtlar-skolzun-va.html"},
  {"nom": "Yon rama: buksa proyomi va bazaviy o'lcham «М»", "davomiyligi": "40 daq", "daraja": "O'rta", "havola": "darsliklar/07-yon-rama-buksa-proyomi-va-bazaviy-olcham-m.html"},
  {"nom": "Yon rama: friksion plankalar", "davomiyligi": "45 daq", "daraja": "Yuqori", "havola": "darsliklar/08-yon-rama-friksion-plankalar.html"},
  {"nom": "Friksion pona va buksa zazorlari", "davomiyligi": "45 daq", "daraja": "Yuqori", "havola": "darsliklar/09-friksion-pona-va-buksa-zazorlari.html"},
  {"nom": "Ressor komplekti va friksion ponalar holati", "davomiyligi": "40 daq", "daraja": "O'rta", "havola": "darsliklar/10-ressor-komplekti-va-friksion-ponalar-holati.html"},
  {"nom": "Aravacha modellari va texnik xarakteristikalari", "davomiyligi": "35 daq", "daraja": "Boshlang'ich", "havola": "darsliklar/11-aravacha-modellari-va-texnik-xarakteristikalari.html"},
  {"nom": "Aravachani qismlarga ajratish (razborka)", "davomiyligi": "35 daq", "daraja": "Boshlang'ich", "havola": "darsliklar/12-aravachani-qismlarga-ajratish.html"},
  {"nom": "Dеfektatsiya — brak mezonlari", "davomiyligi": "45 daq", "daraja": "O'rta", "havola": "darsliklar/13-defektatsiya-brak-mezonlari.html"},
  {"nom": "Yon ramalarni ta'mirlash", "davomiyligi": "50 daq", "daraja": "Yuqori", "havola": "darsliklar/14-yon-ramalarni-tamirlash.html"},
  {"nom": "Nadressor balkasini ta'mirlash", "davomiyligi": "50 daq", "daraja": "Yuqori", "havola": "darsliklar/15-nadressor-balkasini-tamirlash.html"},
  {"nom": "Ta'mirdan keyin aravachani yig'ish", "davomiyligi": "45 daq", "daraja": "O'rta", "havola": "darsliklar/16-tamirdan-keyin-aravachani-yigish.html"},
  {"nom": "Ta'mirdan chiqarishdagi yakuniy nazorat", "davomiyligi": "50 daq", "daraja": "Yuqori", "havola": "darsliklar/17-tamirdan-chiqarishdagi-yakuniy-nazorat.html"},
];

/* 5) SHABLONLAR — o'lchov shablonlari va o'lchash tartibi
      Manba: РД 32 ЦВ 050-2020 (2025-yil 1-yanvardan amaldagi tahrir) */
const SHABLONLAR = [
  {"nom": "Shablon НП Т914.05.000 — umumiy ko'rinishi", "rasm": "rasmlar/01-shablon-np-umumiy.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.1.1–5.1.2 · ТУ 32 ЦВ 2021-95\nTuzilishi: 1 — polzunok, 2 — oyoqchalar, 3 — nakladka, 4 — dvijok. Bazaviy o'lcham — 175,5 mm, tarmoqlari 45° ostida, oyoqchalar tayanch yuzadan 10 mm balandlikni beradi.\nVazifasi: nadressor balkasi prizmasi qiya yuzalarining 45° burchagi dopuskini va tayanch yuza uzunligi «З» ni nazorat qilish."},
  {"nom": "Shablon НП — nadressor balkasidagi ish holati", "rasm": "rasmlar/02-shablon-np-ish-holati.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.1.1\nShablon oyoqchalari (poz. 2) bilan prizmaning tayanch yuzasiga o'rnatiladi va nakladka (poz. 3) bilan balkaning qiya yuzasiga zich bosiladi.\nO'lchash IKKITA kesimda — qiya yuzalarning yo'naltiruvchi burtlari chetidan 15…30 mm masofada bajariladi."},
  {"nom": "45° burchak dopuskini o'lchash sxemasi", "rasm": "rasmlar/03-45-burchak-dopuski.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.1.1\nTartib: 1) polzunokni eng quyi holatga tushiring; 2) dvijokni qiya yuzaga tekkuncha suring — «C1past»; 3) polzunokni eng yuqori holatga ko'taring — «C1yuqori»; 4) K1 = |C1past − C1yuqori| < 3 mm; 5) shu tartib ikkinchi qiya yuzada takrorlanadi — K2 < 3 mm.\nIshoralar: dvijok «0» dan o'ngda — «−», chapda — «+».\nMisol: C1past = −4 mm, C1yuqori = −2 mm → K1 = 2 mm < 3 mm — me'yorda.\nMe'yor: pastdagi umumiy tirqish 6,0 mm dan ko'p emas."},
  {"nom": "«З» — tayanch yuza uzunligini aniqlash", "rasm": "rasmlar/04-z-tayanch-yuza-uzunligi.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.1.2\nDvijok qarama-qarshi qiya yuzadagi eng katta yeyilish joyiga tekkuncha suriladi va «K» ko'rsatkichi ishorasi bilan olinadi.\nFormula: «З» = 175,5 + (1,41 × «K»). Misol: K = −4 → З = 169,9 ≈ 170 mm.\nK:  +2,5 / +2 / +1 / 0 / −1 / −2 / −3 / −4 / −5 / −6 / −7\nЗ:   179 / 178 / 177 / 175,5 / 174 / 173 / 171 / 170 / 168 / 167 / 166\nMe'yor: 175±1 mm; 175(+3/−1) — 18-1750, 18-7055; 175(+4/−1) — 18-9801, 18-100. Depo ta'miri — «З» ≥ 166 mm (K ≥ −7); kapital ta'mir — 174 < «З» < 179 mm."},
  {"nom": "Ultratovush nazorati — o'lchash zonalari sxemasi", "rasm": "rasmlar/05-ultratovush-zonalar.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.1.3\nNadressor balkasi qiya yuzalarining qolgan qalinligi 1, 2, 3, 4-zonalarda ultratovush qalinlik o'lchagich bilan o'lchanadi.\nYuza tozalanadi, kontakt suyuqligining ingichka qatlami suriladi, ПЭП exo-signal ishonchli ajraladigan qilib o'rnatiladi.\nAgar 1-zonada natija h_min dan kichik chiqsa — qo'shni ikkita nuqtada qo'shimcha o'lchanadi va uchtasining o'rta arifmetigi olinadi.\nMe'yor: qolgan qalinlik 7,0 mm dan kam emas."},
  {"nom": "Impulsli defektoskop ekrani — strob sozlash", "rasm": "rasmlar/06-defektoskop-ekrani.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.1.3\nDefektoskop kuchaytirishi shunday sozlanadiki, qarama-qarshi devordan kelgan exo-signal amplitudasi strobning bo'sag'a darajasidan 1–2 katak yuqori tursin.\nBarqaror natija olingandan so'ng chuqurlik o'lchagich ko'rsatkichi h yozib olinadi."},
  {"nom": "Shablon Т914.007 — burtlar orasidagi «e» masofasi", "rasm": "rasmlar/07-shablon-t914-007-e.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.1.4 · ТУ 32 ЦВ 2023-2000\nFriksion pona uchun cheklovchi burtlar orasidagi «e» masofasi shablon Т914.007 bilan gorizontal tekislikda, burtlarning BUTUN yuzasi bo'ylab nazorat qilinadi.\nMe'yor: kapital ta'mirda 134(+4) mm; depo ta'mirida 144,0 mm dan ko'p emas.\nMe'yordan chiqsa — burtlar naplavka qilinib chizma o'lchamigacha tiklanadi."},
  {"nom": "Moslama Т1354.000 — burtlar nosimmetrikligi |A1−A2|", "rasm": "rasmlar/08-moslama-t1354-nosimmetriklik.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.1.5\nMoslama balkaning yuqori yuzasiga prizma zonasida o'rnatiladi va prizmaning upor qovurg'alariga qotiriladi.\n1000 mm li chizg'ich ГОСТ 427 bilan moslamaning o'lchov yuzasidan podpyatnikning upor yuzasigacha masofa o'lchanadi — «C1». Ikkinchi tomondan — «C2».\nMe'yor: |C1 − C2| ≤ 5 mm, bu |A1 − A2| ≤ 5 mm ga mos keladi."},
  {"nom": "Skolzun qalpog'i yeyilishi — «Р» tirqishini o'lchash", "rasm": "rasmlar/09-skolzun-qalpogi-p.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.1.6\nChizg'ich 300 mm ГОСТ 427 yon qirrasi bilan qalpoq ishchi yuzasining diagonaliga qo'yiladi; shchuplar to'plami Т914.21.000 bilan «Р» tirqishi o'lchanadi. Xuddi shu o'lchash IKKINCHI diagonal bo'yicha takrorlanadi.\nMe'yor: «Р» 2 mm dan ko'p emas. Ko'p bo'lsa — qalpoq yangisiga almashtiriladi. Kapital ta'mirda har doim yangi qalpoq o'rnatiladi.\nShchuplarni tayyorlash dopuski 0,05 mm dan oshmasligi kerak."},
  {"nom": "Buksa proyomi kengligi «a» — o'lchash sxemasi", "rasm": "rasmlar/10-buksa-proyomi-a-sxema.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.1 · Shablon Т914.009, ТУ 32 ЦВ 2504-2000\nO'lchash buksa proyomida yon ramaning pastidan 60 mm balandlikda, HAR TOMONDAN bajariladi.\nMe'yor: kapital ta'mirda 335±1 mm (18-9801 — 335(+3/−1)); depo ta'mirida 342,0 mm dan ko'p emas, 18-100 uchun — 338,0 mm dan ko'p emas."},
  {"nom": "Shablon Т914.009 — buksa proyomidagi ish holati", "rasm": "rasmlar/11-shablon-t914-009-ish-holati.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.1\nShablon buksa proyomiga kiritilib ishchi yuzalarga tegiziladi. Nazorat proyomning ikkala tomonida va ramaning ikkala buksa proyomida bajariladi.\nEng kengaygan qiymat me'yor bilan solishtiriladi."},
  {"nom": "Yo'naltiruvchilar kengligi «В» ni nazorat qilish", "rasm": "rasmlar/12-yonaltiruvchilar-kengligi-v.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.3 · Shablon Т914.009\n«В» ishchi yuzaning BUTUN balandligi bo'yicha — yuqori, o'rta va pastki qismlarda nazorat qilinadi.\nMe'yor: 160±1 mm; 18-9801 uchun — 160(+1/−2) mm. Depo ta'miridan chiqarishda 155 mm dan kam emas, 18-9801 uchun — 154 mm dan kam emas."},
  {"nom": "Priliv balandligi «h» va kanavkasimon yeyilish «К»", "rasm": "rasmlar/13-priliv-h-kanavka-k.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.2\nBuksa proyomining tayanch yuzasiga nazorat chizg'ichi ШП–400 ГОСТ 8026 qo'yiladi, ШЦ–I–125–0,1 ГОСТ 166 bilan priliv balandligi «h» va kanavka «К» o'lchanadi.\nMe'yor: «h» 3,0 mm dan kichik yoki katta bo'lishi mumkin (qiymat qayd etiladi); kanavka chuqurligi 2,0 mm dan ko'p emas, kengligi 20,0 mm dan ko'p emas (uzunligi tayanch yuza kengligiga teng)."},
  {"nom": "Priliv balandligi «h» ni shtangensirkul bilan o'lchash", "rasm": "rasmlar/14-priliv-h-olchash.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.2\nNazorat chizg'ichi baza sifatida qo'yiladi, shtangensirkul bilan chizg'ich yuzasidan priliv cho'qqisigacha bo'lgan balandlik o'lchanadi.\nChizg'ichsiz o'lchash mumkin emas — baza yuza bo'lmasa natija ishonchsiz bo'ladi."},
  {"nom": "Buksa proyomi tayanch yuzasini chizg'ich bilan nazorat qilish", "rasm": "rasmlar/15-tayanch-yuza-nazorati.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.11–5.2.12\nYeyilishga chidamli plastinaning notekis yeyilishi chizg'ich 300 mm va shchuplar bilan (5.1.6 dagi kabi, diagonallar bo'yicha) aniqlanadi — me'yor 2,0 mm dan ko'p emas.\nFriksion plankalarni o'rnatish uchun 4 ta teshik diametri ШЦЦ–I–125–0,01 bilan ikki o'zaro perpendikulyar yo'nalishda o'lchanadi — me'yor Ø 21(+0,84) mm."},
  {"nom": "Yon ramaning bazaviy o'lchami «М»", "rasm": "rasmlar/16-shtangen-m-bazaviy-olcham.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.4 · Штанген Т914.01.000, ТУ 32 ЦВ 2018-95\nO'lchash buksa proyomida ramaning pastidan 60 mm balandlikda, har tomondan bajariladi.\nMe'yor: «М» = 2185(+7/−5) mm; depo ta'miridan chiqarishda 2200,0 mm dan ko'p emas.\nBitta aravachadagi ikkita yon rama bazalari farqi 2 mm dan ko'p bo'lmasligi kerak."},
  {"nom": "Friksion plankalar orasidagi «L1» o'lchami", "rasm": "rasmlar/17-shtangen-fp-l1.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.5 · Штанген ФП Т914.02.000, ТУ 32 ЦВ 2019-95\nShtangalar uporlari bilan ressor proyomiga plankalarning yuqori qirralari bo'yicha o'rnatiladi, maksimal ochilib stopor vint bilan qotiriladi; ko'rsatkich ramka shkalasidan olinadi.\nO'lchash yon ramaning TASHQI va ICHKI tomonidan bajariladi.\nMe'yor: planka 10 mm — 642 mm dan kam emas; 16 mm — 630 mm dan kam emas. 18-100 (ramalar 2001-yildan keyin): ДР 648(+2,0/−3,6), КР 648(+1,6/−3,6); 2001-yilgacha: ДР 648(+2,0/−6,6), КР 648(+1,6/−6,6)."},
  {"nom": "«L1» va «L2» — plankalarning pastga kengayishi", "rasm": "rasmlar/18-shtangen-fp-l1-l2.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.5\nPolzunoklar plankalarning pastki qirralariga olib kelinadi, dvijoklar yuzalarga tekkuncha ochiladi; dvijok ko'rsatkichlari ramka ko'rsatkichiga qo'shiladi — «L2» olinadi.\nKengayish = L2 − L1. Me'yor: 4,0…10,0 mm. O'lchash tashqi va ichki tomondan bajariladi."},
  {"nom": "Plankalar noparallelligi — «Ж» va «З» nuqtalari", "rasm": "rasmlar/19-plankalar-noparallelligi.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.5\nPlankalar orasidagi o'lchamlar yuqorida «Ж» nuqtalarida va pastda «З» nuqtalarida o'lchanadi.\nNoparallellik = eng katta va eng kichik o'lcham farqi. Me'yor: gorizontal tekislikda 3,0 mm dan ko'p emas."},
  {"nom": "Friksion planka yeyilishini o'lchash", "rasm": "rasmlar/20-planka-yeyilishi.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.6\nShtangen ФП plankalarning yuqori qirralari bo'yicha o'rnatiladi; polzunok ko'rinadigan maksimal yeyilish joyiga olib kelinadi, dvijok plankaga tekkuncha chiqariladi. So'ngra shu o'lchash YEYILMAGAN joyda takrorlanadi — ikki ko'rsatkich farqi yeyilishni beradi.\nMe'yor: qo'zg'almas planka (10 mm) — 1,5 mm dan ko'p emas; harakatlanuvchi plankalarning umumiy yeyilishi — 2,0 mm dan ko'p emas, bir tomondan 1,5 mm dan ko'p emas."},
  {"nom": "«H1» va «H2» o'lchamlarining joylashuvi", "rasm": "rasmlar/21-h1-h2-joylashuvi.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.7 · Штанген Н Т914.03.000, ТУ 32 ЦВ 2020-95\nH1 va H2 — friksion plankalar o'rnatiladigan yuzadan buksa proyomining tashqi yuzasigacha bo'lgan o'lchamlar.\nO'lchash friksion plankalar OLIB TASHLANGAN holda, buksa proyomining pastki yuzasidan 60 mm balandlikda, har tomondan bajariladi."},
  {"nom": "Shtangen Н bilan H1 va H2 ni o'lchash", "rasm": "rasmlar/22-shtangen-n-olchash.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.7\nQo'zg'almas oyoqcha ressor osma proyomiga kiritilib friksion plankaning privalochniy yuzasiga bosiladi; harakatlanuvchi oyoqcha buksa proyomining tashqi yuzasiga olib kelinib vint bilan qotiriladi. Ko'rsatkich shkaladan o'qiladi.\nMe'yor: |H1 − H2| ≤ 3,0 mm."},
  {"nom": "Friksion plankalarning zich yotishini nazorat qilish", "rasm": "rasmlar/23-plankalar-zich-yotishi.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.8 · Набор щупов № 4 ТУ 3936-011-59489947-2007\nMe'yorlar: zaklepkalar oralig'idagi mahalliy zichmaslik — 1,0 mm dan ko'p emas, 18-100 uchun 0,5 mm dan ko'p emas.\nZaklepka boshi zonasida: 1 mm li shchup (18-100 uchun 0,5 mm) zaklepka sterjeniga yetmasligi kerak; tirqish bosh aylanasining 1/3 qismidan ortiq bo'lmasin.\nZaklepka boshining planka tekisligiga cho'kishi — 2,0 mm dan ko'p emas."},
  {"nom": "Privalochniy yuzalar orasidagi o'lcham va kengayish", "rasm": "rasmlar/24-privalochniy-yuzalar-668.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.9–5.2.10\nO'lchash KLEPKA ISHLARIDAN OLDIN, ШЦ–II–250–800–0,1 ГОСТ 166 bilan privalochniy yuzalarning yuqori va pastki qismida bajariladi.\nMe'yor: proyom o'lchami 668(−3) mm; har bir privalochniy yuzaning pastki qismidagi kengayish 2,0…5,0 mm.\nG'adir-budurlik ГОСТ 9378 namunalari bilan solishtiriladi: Ra 12,5 mkm dan ko'p emas."},
  {"nom": "Buksa zazorlari — aravacha o'qi BO'YLAB", "rasm": "rasmlar/25-zazorlar-boylama.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.13 · Приспособление Т914.21.000\nYon rama yo'naltiruvchilari bilan buksa korpusi orasidagi umumiy zazor Σδ = δ1 + δ2. Hisoblashda o'lchangan zazorlarning ENG KICHIK qiymatlari olinadi.\nMe'yor (aravacha o'qi bo'ylab): депо ta'miri — 5…14 mm, 18-100 uchun 3…12 mm; kapital ta'mir — 5…12 mm, 18-100 uchun 3…10 mm."},
  {"nom": "Buksa zazorlari — aravacha o'qiga KO'NDALANG", "rasm": "rasmlar/26-zazorlar-kondalang.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.2.13 · Приспособление Т914.21.000\nMe'yor (ko'ndalang): depo ta'miri — 5…13 mm, 18-100 uchun 5…12 mm; kapital ta'mir — 5…11 mm, 18-100 uchun 5…10 mm.\nO'lchash har bir buksa uchun alohida bajariladi."},
  {"nom": "Pona qiya yuzasi «X» ni o'lchash va «X/2» ni belgilash", "rasm": "rasmlar/27-pona-x-yarmi.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.3.2 · Шаблон Т914.09.000, ТУ 32 ЦВ 2430-96\nNazorat boshlanishidan OLDIN chizg'ich 150 ГОСТ 427 yoki ШЦ–I–150–0,1 bilan ponaning qiya yuzasi o'lchami «X» o'lchanadi va o'rtasi «X/2» belgilanadi.\nO'lchash ponaning simmetriya o'qi bo'yicha o'rta kesimda bajariladi.\nYoriqlar lupa ЛП-1-4 ГОСТ 25706 (≥4 karra) bilan tekshiriladi — qattiqlik qovurg'alarida yoriq ruxsat etilmaydi (band 5.3.1)."},
  {"nom": "Shablon Т914.09.000 ning ponadagi ish holati", "rasm": "rasmlar/28-shablon-pona-ish-holati.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.3.2\nShablon ponaga o'rnatilib asosiga zich bosiladi; ponaning pastki chiqig'i shablonning ichki old vertikal va gorizontal tayanch qirralariga zich tegishi shart.\nVERTIKAL yeyilish: gorizontal dvijok ko'rsatkichidan 2 mm AYIRILADI.\nQIYA yeyilish: «X/2» ga chizg'ich qo'yilib dvijok tekkuncha suriladi; natijaga chizg'ich qalinligi «Y» QO'SHILADI.\nUmumiy yeyilish = vertikal + qiya. Me'yor: depo ta'mirida 3,0 mm dan ko'p emas, bir tomondan 2,0 mm dan ko'p emas. Kapital ta'mirda ponalar yangisiga almashtiriladi."},
  {"nom": "Upor burt uzunligi «С» ni o'lchash", "rasm": "rasmlar/29-pona-upor-burt-c.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.3.2\nPonaning vertikal tekisligi yuqori qismida ШЦ–I–150–0,1 ГОСТ 166 bilan upor burt uzunligi «С» eng katta yeyilish joyida o'lchanadi; ikkinchi burt ham xuddi shunday.\nMe'yor: M1698.00.003 (-01), 1699.04.007-01, ВАГР-0113.50.00.002-01 chizmalari — 66 mm dan kam emas; 100.30.001-1, 2128-05.50.00.005 — 67 mm dan kam emas. Chizma 1699.04.007 bo'yicha «С» o'lchanmaydi."},
  {"nom": "Yangi pona — asos uzunligi «В» va «С»", "rasm": "rasmlar/30-yangi-pona-b-c.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.3.3\n«В» kronsirkul bilan o'lchanadi: bir uchi vertikal yuzaga, ikkinchisi o'rta kesimdagi «A» chiqig'iga tiriladi, o'lcham 300 mm li chizg'ichga ko'chiriladi. Me'yor: 212 ± 2 mm.\n«С» — vertikal tekislikdan upor burtgacha, ШЦ–I–150–0,1 bilan. Me'yor: 69 ± 1 mm (СЧ 35 chizmalari) yoki 71 ± 2 mm (Сталь 20Л chizmalari)."},
  {"nom": "Yangi pona — qiya tekislik kengligi «D»", "rasm": "rasmlar/31-yangi-pona-d.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.3.3\nPonaning qiya yuzasi kengligi «D» ШЦ–I–150–0,1 ГОСТ 166 bilan o'lchanadi.\nMe'yor: 130 ± 2 mm."},
  {"nom": "Yangi pona — o'yiq chuqurligi «Z» ni aniqlash", "rasm": "rasmlar/32-yangi-pona-z.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.3.3\nQiya yuza o'lchami «X» o'lchanib o'rtasi «X/2» belgilanadi; 150 mm li chizg'ich qiya yuzaga qo'yilib, № 1 yoki № 2 to'plamdagi shchuplar bilan o'yiq chuqurligi baholanadi.\nMe'yor: «Z» = 2 ± 1 mm. Asos uzunligi «В» = 212 ± 2 mm."},
  {"nom": "Prujina balandligini shtangenglubinomer bilan o'lchash", "rasm": "rasmlar/33-prujina-balandligi.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.4.2 · ШГ–300–0,1 ГОСТ 162 + плита ГОСТ 10905\nTASHQI prujina: shtangenglubinomer prujina ICHIGA joylashtiriladi, ramka asosi ikkita uchi bilan toretsga tayanadi, shtanga plitaga tiraladi.\nICHKI prujina: asbob prujina MARKAZIGA joylashtiriladi.\nMe'yor: 249(+6/−3) mm; 18-100, 18-101 — 249(+7/−2) mm (1989–2012 y.), 249(+6/−2) mm (2012–2015 y.). Komplektga tanlashda balandlik farqi 4 mm dan oshmasligi kerak.\nTayanch yuzalar o'ram uchidan aylananing 0,7…0,8 yoyi bo'yicha ishlangan bo'lishi kerak (ГОСТ 1452-2011)."},
  {"nom": "Tashqi prujinalarning ichki diametrini kalibrlash", "rasm": "rasmlar/34-kalibr-tashqi-prujina.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.4.3 · Калибр стакан-пробка Т914.22.000\nMuvofiqlik kalibr O'Z OG'IRLIGI ostida prujinaning butun uzunligi bo'yicha o'tsa aniqlanadi — kalibrni kuch bilan bosish taqiqlanadi.\nKalibrlar shu bilan birga prujina geometriyasining ruxsat etilgan buzilish chegaralarini ham belgilaydi."},
  {"nom": "Ichki prujinalarning tashqi diametrini kalibrlash", "rasm": "rasmlar/35-kalibr-ichki-prujina.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.4.3–5.4.4 · Калибр-стакан Т914.23.000\nKalibr o'z og'irligi ostida prujinaning butun uzunligi bo'yicha o'tishi kerak.\nPrutok diametri ШЦ–I–125–0,1 ГОСТ 166 bilan o'lchanadi. Me'yor: 29/20 mm; 18-9597 — 30/21 mm; 18-9770, 18-2128, 18-7055, 18-9801, 18-9918, 18-9922, 18-1750 — 29/20 yoki 30/21 mm; 18-100, 18-101 — tashqi 30 mm (2015 y.gacha), ichki 19 mm (1989 y.gacha) yoki 21 mm (1989–2015 y.)."},
  {"nom": "Moslama Т914.18.000 — ponalar holatini nazorat qilish", "rasm": "rasmlar/36-moslama-t914-18-pona-holati.jpg", "izoh": "РД 32 ЦВ 050-2020, band 5.5\nMoslama nadressor balkasining tayanch yuzasiga o'rnatiladi va 100 mm radius bilan prujinaga tiraladi; koromislo o'lchov uchi bilan ponaning pastki yuzasiga olib boriladi, ko'rsatkich shkaladan o'qiladi. Ikkinchi pona ham xuddi shunday o'lchanadi.\nMe'yor: DEPO ta'mirida — hech bir ponaning ko'tarilishi (завышение) ruxsat etilmaydi, pasayish 12 mm dan ko'p emas. KAPITAL ta'mirda — bitta ressor osmasining ponalari 4,0…12,0 mm ga pasaytirilgan bo'lishi kerak.\nNazorat aravacha yig'ilib vagon ostiga podkatka qilingandan keyin bajariladi."},
];

/* 6) DEFEKTOSKOP NAZORATIDAN O'TUVCHI ZONALAR — keyinroq to'ldiriladi */
const ZONALAR = [
];

/* 4) TESTLAR — "togri" to'g'ri javob indeksi (0 dan boshlanadi) */
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
