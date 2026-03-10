# البنية التقنية للتطبيق 🏗️

## نظرة عامة

تطبيق Watchlist مبني على معمارية **Component-based** باستخدام React Native و Expo.

---

## Stack التقني

### Frontend Framework
```
React Native 0.76.5
├── React 18.3.1
└── Expo ~52.0.0
```

### Navigation
```
@react-navigation/native ^6.1.9
├── @react-navigation/bottom-tabs ^6.5.11  (التنقل السفلي)
└── @react-navigation/native-stack ^6.9.17  (التنقل بين الشاشات)
```

### Storage
```
@react-native-async-storage/async-storage 1.23.1
└── تخزين محلي (key-value)
```

### UI Components
```
@expo/vector-icons ^14.0.0           (الأيقونات)
expo-linear-gradient ~13.0.2         (التدرجات)
react-native-safe-area-context 4.12.0
react-native-screens ~4.4.0
```

### AI Integration
```
Google Gemini API
└── REST API calls via fetch
```

---

## معمارية التطبيق

### 1. Navigation Architecture

```
App.js (NavigationContainer)
│
└── Stack Navigator
    │
    ├── Main (Tab Navigator)
    │   ├── Home Tab
    │   ├── Movies Tab
    │   ├── Series Tab
    │   └── Settings Tab
    │
    ├── AIChat Screen (Modal)
    ├── AddItem Screen (Modal)
    └── ItemDetail Screen
```

### 2. Data Flow

```
Component
    ↓
StorageService
    ↓
AsyncStorage
    ↓
Local Device Storage
```

### 3. AI Communication Flow

```
User Input
    ↓
AIChatScreen
    ↓
AIService
    ↓
Try API Key 1
    ├── Success → Return Response
    └── Fail → Try API Key 2
        ├── Success → Return Response
        └── Fail → Return Error
```

---

## Components Structure

### Screen Components

#### HomeScreen.js
```javascript
مسؤول عن:
- عرض زر الذكاء الاصطناعي
- عرض قائمة أفلام سريعة
- عرض قائمة أنمي سريعة
- التنقل إلى الشاشات الأخرى

Props:
- navigation: Navigation object
- theme: Theme object (light/dark)
```

#### MoviesScreen.js
```javascript
مسؤول عن:
- عرض قائمة الأفلام (Grid 2 columns)
- زر إضافة فيلم (FAB)
- Empty state عند عدم وجود أفلام

State:
- movies: Array of movie objects

Props:
- navigation, theme
```

#### SeriesScreen.js
```javascript
نفس MoviesScreen تماماً
لكن للمسلسلات/الأنمي
```

#### AIChatScreen.js
```javascript
مسؤول عن:
- واجهة المحادثة
- إرسال واستقبال الرسائل
- حفظ واسترجاع المحادثات
- قائمة المحادثات السابقة

State:
- messages: Array of message objects
- conversations: Array of conversation objects
- inputText: String
- isLoading: Boolean
- showMenu: Boolean
```

#### AddItemScreen.js
```javascript
مسؤول عن:
- نموذج إضافة عنصر
- التحقق من البيانات
- الحفظ

State:
- name, description, imageUrl, status

Params:
- type: 'movie' | 'anime'
```

#### ItemDetailScreen.js
```javascript
مسؤول عن:
- عرض تفاصيل عنصر
- تحديث الحالة
- حذف العنصر

Params:
- item: Object
- type: 'movie' | 'anime'
```

#### SettingsScreen.js
```javascript
مسؤول عن:
- تبديل الوضع الليلي/النهاري
- عرض معلومات التطبيق

Props:
- theme, isDark, toggleTheme
```

---

## Services Layer

### StorageService.js

```javascript
وظائف:
├── getMovies()           جلب الأفلام
├── saveMovies(movies)    حفظ الأفلام
├── getAnime()            جلب الأنمي
├── saveAnime(anime)      حفظ الأنمي
├── getSeries()           جلب المسلسلات
├── saveSeries(series)    حفظ المسلسلات
├── getTheme()            جلب الثيم
├── saveTheme(theme)      حفظ الثيم
├── getConversations()    جلب المحادثات
└── saveConversations()   حفظ المحادثات

كل البيانات:
- تُخزن في AsyncStorage
- بصيغة JSON strings
- مع معالجة أخطاء
```

### AIService.js

```javascript
وظائف:
├── sendMessage(message, history)
│   └── يرسل رسالة ويستلم رد
│
├── sendWithFallback(message, history, keyIndex)
│   └── يحاول المفاتيح بالترتيب
│
├── callGeminiAPI(apiKey, message, history)
│   └── يتصل بـ Gemini API
│
└── getCurrentKeyIndex()
    └── يعيد المفتاح الحالي المستخدم

الميزات:
- نظام Fallback تلقائي
- معالجة الأخطاء
- دعم سياق المحادثة
```

---

## Data Models

### Movie/Anime Object
```javascript
{
  id: String,              // Unique ID (timestamp)
  name: String,            // الاسم
  description: String,     // الوصف
  imageUrl: String,        // رابط الصورة
  status: String,          // الحالة
  createdAt: Number,       // تاريخ الإنشاء (timestamp)
}
```

### Message Object
```javascript
{
  role: 'user' | 'assistant',
  content: String,
  timestamp: Number,
  isError?: Boolean,       // للرسائل الخطأ
}
```

### Conversation Object
```javascript
{
  id: String,
  title: String,           // أول 50 حرف من أول رسالة
  messages: Array<Message>,
  timestamp: Number,
}
```

### Theme Object
```javascript
{
  background: String,       // لون الخلفية
  cardBackground: String,   // لون البطاقات
  text: String,            // لون النص
  secondaryText: String,   // لون النص الثانوي
  border: String,          // لون الحدود
  tabBarBackground: String,
  tabBarBorder: String,
  primary: String,         // اللون الأساسي
  danger: String,
  success: String,
  warning: String,
  purple: String,
  gradientStart: String,
  gradientEnd: String,
}
```

---

## State Management

### Local Component State
```javascript
// كل component يدير state الخاص به
const [data, setData] = useState([]);
```

### Persistent State (AsyncStorage)
```javascript
// البيانات الدائمة تُحفظ في AsyncStorage
await StorageService.saveMovies(movies);
```

### Navigation State
```javascript
// React Navigation يدير state التنقل
navigation.navigate('ScreenName', { params });
```

---

## Styling System

### Theme-based Styling
```javascript
// كل component يستقبل theme object
function Screen({ theme }) {
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>نص</Text>
    </View>
  );
}
```

### StyleSheet API
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ... styles
  },
});
```

### Dynamic Styles
```javascript
style={[
  styles.button,
  { backgroundColor: isActive ? theme.primary : theme.border }
]}
```

---

## Performance Optimizations

### 1. useFocusEffect
```javascript
// تحديث البيانات عند التركيز على الشاشة
useFocusEffect(
  useCallback(() => {
    loadData();
  }, [])
);
```

### 2. FlatList
```javascript
// لعرض القوائم الطويلة بكفاءة
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
/>
```

### 3. Image Caching
```javascript
// React Native يخزن الصور تلقائياً
<Image source={{ uri: url }} />
```

### 4. Conditional Rendering
```javascript
// تحميل المكونات فقط عند الحاجة
{showMenu && <Menu />}
```

---

## Error Handling

### Try-Catch Blocks
```javascript
try {
  await StorageService.saveMovies(movies);
} catch (error) {
  console.error('Error:', error);
  Alert.alert('خطأ', 'حدث خطأ أثناء الحفظ');
}
```

### API Error Handling
```javascript
if (!response.ok) {
  throw new Error('فشل في الاتصال');
}
```

### User Feedback
```javascript
// رسائل خطأ واضحة للمستخدم
Alert.alert('عنوان', 'رسالة الخطأ');
```

---

## Security Considerations

### API Keys
```javascript
// ⚠️ في الإنتاج: استخدم environment variables
const API_KEY = process.env.GEMINI_API_KEY;

// لا تنشر المفاتيح على GitHub
// أضف .env إلى .gitignore
```

### Data Privacy
```javascript
// البيانات محلية فقط
// لا تُرسل لأي خادم
// AsyncStorage مشفر تلقائياً على iOS
```

---

## Testing Strategy

### Manual Testing
```
✅ اختبار كل شاشة
✅ اختبار التنقل
✅ اختبار الإضافة/الحذف
✅ اختبار الـ AI
✅ اختبار الوضع الليلي
```

### Future: Automated Testing
```javascript
// يمكن إضافة:
- Jest للـ Unit Tests
- React Native Testing Library
- Detox للـ E2E Tests
```

---

## Build & Deployment

### Development
```bash
npx expo start
```

### Production Build
```bash
# Android
npx eas build --platform android

# iOS
npx eas build --platform ios
```

### App Stores
```
- Google Play Store (Android)
- Apple App Store (iOS)
```

---

## Future Enhancements

### Possible Additions:
1. **Backend Integration**
   - Firebase للـ real-time sync
   - Cloud storage للصور

2. **Advanced Features**
   - بحث وفلترة
   - إحصائيات
   - مشاركة القوائم

3. **Performance**
   - React Query للـ caching
   - Redux للـ state management

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

---

## Dependencies Tree

```
WatchlistApp
├── react-native (UI Framework)
├── expo (Development Tools)
├── @react-navigation (Navigation)
├── @react-native-async-storage (Storage)
├── expo-linear-gradient (UI)
├── @expo/vector-icons (Icons)
└── Native Modules
    ├── iOS
    └── Android
```

---

**معمارية نظيفة وقابلة للتوسع! 🚀**
