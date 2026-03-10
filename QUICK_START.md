# بداية سريعة ⚡

## 3 خطوات فقط للبدء!

### 1️⃣ ثبت المكتبات
```bash
cd WatchlistApp
npm install
```

### 2️⃣ أضف مفتاح Gemini API
في ملف `services/AIService.js` السطر 1-4:
```javascript
const GEMINI_API_KEYS = [
  'ضع_مفتاحك_هنا',  // احصل عليه من: https://makersuite.google.com/app/apikey
  'مفتاح_احتياطي',   // اختياري
];
```

### 3️⃣ شغّل التطبيق
```bash
npx expo start
```
ثم امسح QR بتطبيق Expo Go

---

## هيكل المشروع

```
WatchlistApp/
│
├── 📱 screens/              شاشات التطبيق
│   ├── HomeScreen.js        الرئيسية
│   ├── MoviesScreen.js      الأفلام
│   ├── SeriesScreen.js      المسلسلات
│   ├── AIChatScreen.js      الذكاء الاصطناعي
│   ├── AddItemScreen.js     إضافة عنصر
│   ├── ItemDetailScreen.js  التفاصيل
│   └── SettingsScreen.js    الإعدادات
│
├── 🔧 services/             الخدمات
│   ├── AIService.js         ذكاء اصطناعي (Gemini)
│   └── StorageService.js    التخزين المحلي
│
├── 🎨 theme.js              الألوان والثيمات
├── 📄 App.js                نقطة الدخول الرئيسية
│
└── 📚 التوثيق
    ├── README.md            الدليل الشامل
    ├── SETUP.md             دليل الإعداد
    ├── AI_GUIDE.md          دليل الذكاء الاصطناعي
    ├── FEATURES.md          الميزات الكاملة
    └── QUICK_START.md       هذا الملف!
```

---

## الميزات الرئيسية

✅ **4 أقسام رئيسية**: الرئيسية، أفلام، مسلسلات، إعدادات
✅ **ذكاء اصطناعي**: Gemini API مع fallback تلقائي
✅ **تصميم iOS**: تماماً مثل التطبيقات الأصلية
✅ **وضع ليلي**: تبديل سهل من الإعدادات
✅ **عربي 100%**: كل شيء بالعربية
✅ **تخزين محلي**: لا يحتاج حساب

---

## أول استخدام

1. **شغّل التطبيق** → سترى الشاشة الرئيسية
2. **اذهب للأفلام** → اضغط + واضف فيلمك الأول
3. **جرّب الـ AI** → اضغط زر "الذكاء الاصطناعي" من الرئيسية
4. **فعّل الوضع الليلي** → من الإعدادات

---

## مشاكل شائعة؟

### التطبيق لا يعمل؟
```bash
npx expo start -c
```

### الذكاء الاصطناعي لا يرد؟
- تحقق من مفتاح API في `services/AIService.js`
- تأكد من الإنترنت

### خطأ في التثبيت؟
```bash
rm -rf node_modules
npm install
```

---

## روابط سريعة

- 🔑 مفاتيح API: https://makersuite.google.com/app/apikey
- 📱 Expo Go: https://expo.dev/client
- 📚 توثيق كامل: اقرأ `README.md`

---

**جاهز؟ ابدأ الآن! 🚀**
