# 📱 Watchlist App - تطبيق قائمة المشاهدة

## ✅ جاهز للاستيراد في Snack!

### 🚀 خطوات الاستخدام:

#### 1. ارفع المشروع على GitHub
- فك ضغط الملف `WatchlistApp.zip`
- ارفع المجلد على GitHub repository جديد

#### 2. استورد في Snack
1. افتح https://snack.expo.dev
2. اضغط على زر القائمة (☰) أعلى اليسار
3. اختر "Import from GitHub"
4. الصق رابط الـ repository
5. انتظر حتى يحمل جميع الملفات

#### 3. أضف مفتاح Gemini API
- افتح `services/AIService.js`
- في السطور 1-4، استبدل:
```javascript
const GEMINI_API_KEYS = [
  'ضع_مفتاحك_هنا',  // احصل عليه من: https://makersuite.google.com/app/apikey
  'مفتاح_ثاني',      // اختياري
];
```

#### 4. شغّل التطبيق
- اضغط "My Device" في Snack
- افتح Expo Go على هاتفك
- امسح QR Code

---

## ⚠️ ملاحظات مهمة:

### ✅ التطبيق يعمل على Snack لأنه:
- يستخدم `@react-navigation/stack` (متوافق مع Snack)
- يستخدم Expo SDK 49 (مستقر على Snack)
- جميع المكتبات متوافقة مع Snack

### ⚡ إذا واجهت مشاكل:
1. تأكد من إضافة `react-native-gesture-handler` في package.json
2. تأكد من أن السطر الأول في `App.js` هو:
   ```javascript
   import 'react-native-gesture-handler';
   ```
3. امسح cache في Snack وأعد التشغيل

---

## 📋 الميزات:

✅ **الرئيسية**: عرض سريع + زر الذكاء الاصطناعي  
✅ **الأفلام**: إدارة قائمة الأفلام  
✅ **المسلسلات**: إدارة قائمة المسلسلات/الأنمي  
✅ **الإعدادات**: وضع ليلي/نهاري  
✅ **ذكاء اصطناعي**: Gemini API مع fallback  
✅ **تصميم iOS**: تماماً مثل التطبيقات الأصلية  
✅ **عربي 100%**: كل شيء بالعربية  

---

## 🔑 للحصول على مفتاح Gemini API:

1. اذهب إلى: https://makersuite.google.com/app/apikey
2. سجل دخول بحساب Google
3. اضغط "Create API Key"
4. انسخ المفتاح
5. ضعه في `services/AIService.js`

---

## 📁 هيكل المشروع:

```
WatchlistApp/
├── App.js                    # نقطة الدخول (يحتوي على gesture-handler)
├── theme.js                  # الألوان والثيمات
├── package.json              # المكتبات
│
├── services/
│   ├── AIService.js          # خدمة Gemini AI
│   └── StorageService.js     # التخزين المحلي
│
└── screens/
    ├── HomeScreen.js         # الشاشة الرئيسية
    ├── MoviesScreen.js       # شاشة الأفلام
    ├── SeriesScreen.js       # شاشة المسلسلات
    ├── AIChatScreen.js       # شاشة الذكاء الاصطناعي
    ├── AddItemScreen.js      # شاشة الإضافة
    ├── ItemDetailScreen.js   # شاشة التفاصيل
    └── SettingsScreen.js     # شاشة الإعدادات
```

---

## 🎯 حالات المشاهدة:

- 🔵 **سأشاهده** - لم تبدأ بعد
- 🟠 **أشاهده الآن** - جاري المشاهدة
- 🟢 **تم المشاهدة** - انتهيت منه

---

## 💾 التخزين:

جميع البيانات محفوظة محلياً على هاتفك:
- لا يحتاج إنترنت (إلا للذكاء الاصطناعي)
- لا يحتاج حساب
- خصوصية كاملة

---

## 🐛 المشاكل الشائعة وحلولها:

### المشكلة: خطأ ReactCurrentOwner
**الحل**: تأكد من أن `App.js` يبدأ بـ:
```javascript
import 'react-native-gesture-handler';
```

### المشكلة: الذكاء الاصطناعي لا يعمل
**الحل**: أضف مفتاح API صحيح في `services/AIService.js`

### المشكلة: التطبيق بطيء
**الحل**: استخدم "My Device" بدلاً من Web Preview

---

## 📚 التوثيق الكامل:

- `SETUP.md` - دليل التثبيت
- `AI_GUIDE.md` - دليل الذكاء الاصطناعي
- `FEATURES.md` - شرح الميزات
- `TROUBLESHOOTING.md` - حل المشاكل
- `SNACK_GUIDE.md` - دليل Snack

---

## 🎉 بعد التشغيل:

يجب أن ترى:
- ✅ 4 تبويبات في الأسفل
- ✅ زر الذكاء الاصطناعي بتصميم جميل
- ✅ إمكانية إضافة أفلام ومسلسلات
- ✅ الوضع الليلي يعمل

---

**استمتع بالتطبيق! 🚀**

للمساعدة أو الأسئلة، راجع ملفات التوثيق المرفقة.
