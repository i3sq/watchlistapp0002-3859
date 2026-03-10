# دليل الإعداد السريع 🚀

## الخطوات الأساسية للبدء

### 1. تثبيت المكتبات
```bash
cd WatchlistApp
npm install
```

### 2. إضافة مفاتيح Gemini API ⚠️ (مهم جداً)

**احصل على مفتاح API:**
1. اذهب إلى: https://makersuite.google.com/app/apikey
2. سجل دخول بحساب Google الخاص بك
3. اضغط "Create API Key"
4. انسخ المفتاح

**أضف المفتاح للتطبيق:**

افتح الملف: `services/AIService.js`

ابحث عن هذه الأسطر:
```javascript
const GEMINI_API_KEYS = [
  'AIzaSyDPUT8YourFirstAPIKeyHere',  // المفتاح الأول
  'AIzaSyDPUT8YourSecondAPIKeyHere', // المفتاح الثاني
];
```

استبدلها بمفاتيحك:
```javascript
const GEMINI_API_KEYS = [
  'AIzaSyAbc123YourActualKey',      // ضع مفتاحك هنا
  'AIzaSyDef456YourSecondKey',      // مفتاح احتياطي (اختياري)
];
```

💡 **نصيحة**: يمكنك استخدام نفس المفتاح مرتين إذا كان لديك مفتاح واحد فقط.

### 3. تشغيل التطبيق
```bash
npx expo start
```

### 4. اختبار التطبيق

**على الهاتف:**
1. حمّل تطبيق "Expo Go" من متجر التطبيقات
2. امسح QR Code الظاهر في Terminal

**على المحاكي:**
- اضغط `i` للـ iOS Simulator (يتطلب Mac)
- اضغط `a` للـ Android Emulator (يتطلب Android Studio)

## التحقق من نجاح الإعداد ✅

1. **التطبيق يعمل**: يجب أن تظهر الشاشة الرئيسية مع 4 تبويبات في الأسفل
2. **الذكاء الاصطناعي يعمل**: اضغط زر "الذكاء الاصطناعي" واكتب "مرحباً"، يجب أن يرد عليك
3. **إضافة فيلم**: جرّب إضافة فيلم من قسم الأفلام

## مشاكل شائعة وحلول سريعة

### ❌ خطأ: "Cannot find module"
**الحل:**
```bash
rm -rf node_modules
npm install
```

### ❌ الذكاء الاصطناعي لا يعمل
**السبب**: لم تضف مفتاح API أو المفتاح خاطئ
**الحل**: راجع الخطوة 2 وتأكد من المفتاح

### ❌ التطبيق لا يفتح على الهاتف
**الحل:**
1. تأكد من اتصال الهاتف والكمبيوتر بنفس الشبكة
2. جرب `npx expo start --tunnel`

### ❌ خطأ في البناء
**الحل:**
```bash
npx expo start -c
```
(يمسح الـ cache ويبدأ من جديد)

## الأوامر المفيدة

```bash
# تشغيل عادي
npx expo start

# تشغيل مع مسح Cache
npx expo start -c

# تشغيل في وضع Tunnel (للشبكات المعقدة)
npx expo start --tunnel

# عرض سجل الأخطاء بوضوح
npx expo start --dev-client
```

## روابط مفيدة

- 🔑 مفاتيح Gemini API: https://makersuite.google.com/app/apikey
- 📱 تحميل Expo Go: https://expo.dev/client
- 📚 توثيق Expo: https://docs.expo.dev
- 🎨 Expo Snack (للتجربة أونلاين): https://snack.expo.dev

## بعد نجاح الإعداد

الآن يمكنك:
1. ✅ إضافة أفلامك المفضلة
2. ✅ إضافة مسلسلات وأنمي
3. ✅ استخدام الذكاء الاصطناعي للمساعدة
4. ✅ تفعيل الوضع الليلي من الإعدادات

---

**مستعد؟ ابدأ التطوير! 🎉**

للمزيد من التفاصيل، راجع ملف README.md
