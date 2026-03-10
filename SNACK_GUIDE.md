# 📱 دليل استخدام Snack للتطبيق

## ✅ تم تحديث المشروع ليعمل على Snack!

### الخطوات:

## 1️⃣ افتح Snack
اذهب إلى: https://snack.expo.dev

## 2️⃣ أنشئ مشروع جديد
- اضغط "New Snack"

## 3️⃣ انسخ الملفات

### طريقة النسخ السهلة:

#### أ) انسخ package.json أولاً:
```json
{
  "dependencies": {
    "expo": "~49.0.0",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "react-native-safe-area-context": "4.6.3",
    "react-native-screens": "~3.22.0",
    "@react-navigation/native": "6.1.7",
    "@react-navigation/bottom-tabs": "6.5.8",
    "@react-navigation/stack": "6.3.17",
    "@expo/vector-icons": "13.0.0",
    "@react-native-async-storage/async-storage": "1.18.2",
    "expo-linear-gradient": "~12.3.0",
    "react-native-gesture-handler": "~2.12.0"
  }
}
```

#### ب) بعد ذلك، انسخ الملفات بهذا الترتيب:

1. **theme.js** → أنشئ ملف جديد
2. **services/StorageService.js** → أنشئ مجلد services
3. **services/AIService.js** → في نفس المجلد
4. **screens/HomeScreen.js** → أنشئ مجلد screens
5. **screens/MoviesScreen.js** → في نفس المجلد
6. **screens/SeriesScreen.js**
7. **screens/AIChatScreen.js**
8. **screens/AddItemScreen.js**
9. **screens/ItemDetailScreen.js**
10. **screens/SettingsScreen.js**
11. **App.js** → استبدل الموجود

## 4️⃣ أضف مفاتيح Gemini API

في ملف `services/AIService.js`:
```javascript
const GEMINI_API_KEYS = [
  'ضع_مفتاحك_هنا',  // من: https://makersuite.google.com/app/apikey
  'مفتاح_احتياطي',
];
```

## 5️⃣ شغّل التطبيق!

- اضغط على "Run" أو "My Device"
- افتح Expo Go على هاتفك
- امسح QR Code

---

## 🎯 هيكل المجلدات في Snack:

```
Snack Project
│
├── App.js
├── theme.js
│
├── services/
│   ├── AIService.js
│   └── StorageService.js
│
└── screens/
    ├── HomeScreen.js
    ├── MoviesScreen.js
    ├── SeriesScreen.js
    ├── AIChatScreen.js
    ├── AddItemScreen.js
    ├── ItemDetailScreen.js
    └── SettingsScreen.js
```

---

## ⚡ نصائح Snack:

### ✅ افعل:
- انسخ الملفات واحداً تلو الآخر
- انتظر حتى يحفظ Snack كل ملف
- استخدم "My Device" بدلاً من Web Preview

### ❌ لا تفعل:
- لا تنسخ كل الملفات مرة واحدة
- لا تستخدم Web Preview (استخدم هاتفك)
- لا تغير أسماء المجلدات

---

## 🔧 إذا ظهرت أخطاء:

### خطأ في Import:
- تأكد من أسماء المجلدات صحيحة (services, screens)
- تأكد من كتابة الأسماء بنفس الحروف الكبيرة/الصغيرة

### خطأ في Navigation:
- انتظر حتى يحمّل Snack جميع المكتبات
- أعد تشغيل التطبيق

### التطبيق لا يعمل:
- امسح الـ cache: اضغط "Clear cache"
- أعد فتح Expo Go

---

## 📋 قائمة التحقق:

- [ ] نسخت package.json
- [ ] انتظرت تحميل المكتبات (شريط أخضر في الأعلى)
- [ ] أنشأت مجلد services
- [ ] أنشأت مجلد screens
- [ ] نسخت جميع الملفات (10 ملفات)
- [ ] أضفت مفتاح Gemini API
- [ ] شغلت التطبيق على الهاتف (ليس Web)

---

## 🎉 بعد النجاح:

سترى:
- ✅ 4 تبويبات في الأسفل
- ✅ زر "الذكاء الاصطناعي" في الأعلى
- ✅ قوائم الأفلام والأنمي
- ✅ الوضع الليلي يعمل

---

## 💡 حل بديل: استخدم رابط جاهز

إذا كان النسخ صعباً، سأعطيك رابط Snack جاهز تفتحه مباشرة:

**قريباً: سأنشئ لك رابط Snack جاهز إذا احتجت!**

---

## 📞 مساعدة إضافية

إذا واجهت أي مشكلة:
1. أخبرني بنص الخطأ الذي يظهر
2. صور شاشة Snack
3. سأساعدك فوراً!

---

**استمتع بالتطبيق على Snack! 🚀**
