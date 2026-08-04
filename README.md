# Telejka ta'mirlash sexi — elektron portal

QR kod orqali ochiladigan, sex xodimlari uchun ichki elektron ma'lumot sayti.
Bo'limlar: **Xodimlar**, **Kutubxona**, **Darsliklar**, **Testlar**.

Framework yoki build jarayoni yo'q — sof HTML/CSS/JS. GitHub Pages'da bepul ishlaydi.

---

## ⚠️ Avval o'qing: maxfiylik

GitHub Pages sayti **ochiq internetda** joylashadi — manzilni bilgan har kim
ko'ra oladi, QR kodsiz ham. Repository "private" bo'lsa ham, Pages sayti ochiq qoladi.

Xodimlarning ismi, lavozimi va staji shaxsiy ma'lumot hisoblanadi. Shuning uchun:

- Ochiq saytga faqat ochiq bo'lishi mumkin bo'lgan ma'lumotni joylang.
- Yoki xodimlar bo'limida faqat lavozim va toifani ko'rsatib, ism-familiyani olib tashlang.
- Yoki haqiqiy yopiq kirish kerak bo'lsa, parol talab qiladigan xosting ishlating
  (GitHub Pages parol qo'yishni qo'llab-quvvatlamaydi).

Frontend'da yozilgan "parol" himoya hisoblanmaydi — kodni ochib o'qish mumkin.

---

## Fayllar

| Fayl | Vazifasi |
|---|---|
| `index.html` | Asosiy sahifa |
| `style.css` | Dizayn |
| `data.js` | **Faqat shu faylni tahrirlang** — xodimlar, kitoblar, darsliklar, testlar |
| `app.js` | Sahifalar mantig'i, viktorina va admin panel |
| `qr.js` | Mustaqil QR kod generatori (tashqi xizmatsiz) |
| `qr.html` | Bosmaga tayyor QR kod yaratadigan admin sahifa |

## 1. GitHub'ga joylash

1. GitHub'da yangi repository yarating, masalan `telejka-sexi`.
2. Barcha fayllarni yuklang ("Add file → Upload files" yoki `git push`).
3. **Settings → Pages → Source** dan `main` branch va `/ (root)` ni tanlang → **Save**.
4. Bir necha daqiqadan so'ng sayt ochiladi:
   `https://<foydalanuvchi-nomi>.github.io/telejka-sexi/`

## 2. Ma'lumotlarni qo'lda o'zgartirish (ixtiyoriy)

`data.js` faylini oching va ro'yxatlarni to'ldiring — struktura fayl ichida izohlangan.
Saqlab GitHub'ga qayta yuklasangiz, sayt avtomatik yangilanadi.

Kitob yoki darslikka PDF biriktirish uchun `havola` maydonini to'ldiring:

```js
{ nom: "Payvandlash asoslari", muallif: "T. Nazarov",
  format: "PDF · 4.2 MB", mavzu: "Payvandlash",
  havola: "kitoblar/payvandlash.pdf" },
```

PDF fayllarni repoga `kitoblar/` papkasiga yuklang. Havola bo'lsa, karta bosiladigan
bo'lib qoladi va PDF yangi oynada ochiladi.

Yangi test qo'shish uchun `TESTLAR` massiviga obyekt qo'shing. Har bir savolda
`togri` — to'g'ri javobning `variantlar` ichidagi tartib raqami (**0 dan** boshlanadi).

## 3. Admin panel

Sayt hamma uchun **mehmon** ko'rinishida ochiladi — faqat o'qish mumkin.
Sahifaning eng pastida **"Admin bo'lib kirish"** tugmasi bor.

Admin kodi: `vchd5admin`

Kirgach yuqorida sariq chiziq paydo bo'ladi va har bir bo'limda:

- **+ Yangi ...** — yozuv qo'shish
- **✎** — tahrirlash
- **✕** — o'chirish

Testlar uchun alohida forma: test nomi, savollar, variantlar (har birini yangi
qatordan) va to'g'ri javob raqami.

### ⚠️ Eng muhim qadam: o'zgarishlarni saqlash

Statik sayt o'zgarishlarni serverga saqlay olmaydi. Tahrirlar avval faqat
sizning brauzeringizda turadi. Ular hamma uchun ko'rinishi uchun:

1. Yuqoridagi **"data.js yuklab olish"** tugmasini bosing
2. GitHub'da repositoryni oching
3. Eski `data.js` ni o'chiring
4. **Add file → Upload files** orqali yangi `data.js` ni yuklang
5. **Commit changes** bosing

Yuklamaguningizcha yuqorida "saqlanmagan o'zgarish" yozuvi turadi.

### Admin kodi haqida ochiq gap

Bu kod saytning JavaScript faylida (hash ko'rinishida) turadi. Ya'ni:

- Oddiy xodim uni tasodifan topa olmaydi — bo'limlar shunchaki ko'rinmaydi.
- Lekin brauzerda sahifa kodini ochib ko'rgan odam himoyani chetlab o'ta oladi.

Shuning uchun bu kod **tartib uchun**, sir saqlash uchun emas. Haqiqiy himoya
kerak bo'lsa, serverli yechim (parol bilan kiritiladigan xosting) kerak bo'ladi.
Kodni o'zgartirish uchun yangi kodning SHA-256 hashini hisoblab, `app.js`
ichidagi `PAROL_HASH` qiymatini almashtiring.

## 4. Elektron kitoblarni qo'shish

Statik sayt fayllarni brauzerdan yuklay olmaydi, shuning uchun PDF'lar
GitHub'ga qo'lda yuklanadi:

1. Repositoryda **Add file → Create new file** bosing, nomiga `kitoblar/vaqtincha.txt`
   yozing va commit qiling — shunda `kitoblar/` papkasi paydo bo'ladi.
2. Shu papkani ochib, **Add file → Upload files** orqali PDF'larni yuklang.
   Fayl nomlarida bo'sh joy va o'zbekcha harflar bo'lmasin:
   `payvandlash-asoslari.pdf` — yaxshi, `Payvandlash asoslari.pdf` — muammo tug'diradi.
3. Saytda admin bo'lib kiring → Kutubxona → kitobni tahrirlang → **Fayl havolasi**
   maydoniga `kitoblar/payvandlash-asoslari.pdf` deb yozing.
4. `data.js` ni yuklab olib GitHub'ga qayta yuklang.

Endi kitob kartasi bosiladigan bo'ladi va PDF yangi oynada ochiladi.

**Fayl hajmi**: GitHub bitta fayl uchun 100 MB chegara qo'yadi, lekin katta
PDF'lar telefonda sekin ochiladi. 10 MB dan katta kitoblarni siqib yuklash yaxshi.

## 5. QR kod yaratish

1. `https://<sizning-manzilingiz>/qr.html` sahifasini oching.
2. Manzil avtomatik to'ldiriladi; QR kod darhol chiziladi.
3. **"Chop etish"** bilan bosing yoki **"SVG yuklab olish"** bilan faylni saqlang
   (SVG istalgan o'lchamda sifat yo'qotmay bosiladi — katta plakat uchun qulay).

QR kod brauzerning o'zida yaratiladi, tashqi xizmatga murojaat qilinmaydi —
internetsiz ham ishlaydi. Xatolikni tiklash darajasi Q (25%) tanlangan, shuning
uchun qog'oz g'ijimlansa yoki bir qismi kirlansa ham o'qiladi.

---

## 6. Texnik eslatmalar

- **QR generator** ISO/IEC 18004 bo'yicha yozilgan: Reed-Solomon kodlash,
  8 ta maska variantidan eng yaxshisini jarima bo'yicha tanlash, 1–10 versiyalar,
  L/M/Q/H darajalari. Mustaqil dekoder bilan 600 ta tasodifiy matnda tekshirilgan.
  Maksimal sig'im ~216 bayt (M darajasida) — URL uchun yetarlidan ortiq.
- **Xavfsizlik**: barcha ma'lumotlar sahifaga chiqarilishdan oldin ekranlanadi,
  shuning uchun `data.js` ichidagi maxsus belgilar HTML sifatida bajarilmaydi.
- **Qidiruv** apostroflarga sezgir emas: "gildirak", "g'ildirak", "gʻildirak" —
  bari bir xil natija beradi.
- **Admin tahrirlari** brauzer xotirasida qoralama sifatida saqlanadi, shuning
  uchun sahifani tasodifan yopib qo'ysangiz ish yo'qolmaydi.
- **Test natijalari saqlanmaydi** — sayt statik. Natijalarni hisobga olish kerak
  bo'lsa, Google Forms yoki oddiy backend bilan bog'lash tavsiya etiladi.
