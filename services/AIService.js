const GEMINI_API_KEYS = [
  'AIzaSyDPUT8YourFirstAPIKeyHere', // المفتاح الأول
  'AIzaSyDPUT8YourSecondAPIKeyHere', // المفتاح الثاني
];

let currentKeyIndex = 0;

export const AIService = {
  async sendMessage(message, conversationHistory = []) {
    return this.sendWithFallback(message, conversationHistory, 0);
  },

  async sendWithFallback(message, conversationHistory, keyIndex) {
    if (keyIndex >= GEMINI_API_KEYS.length) {
      throw new Error('جميع مفاتيح API غير متاحة حالياً');
    }

    try {
      const apiKey = GEMINI_API_KEYS[keyIndex];
      const response = await this.callGeminiAPI(apiKey, message, conversationHistory);
      currentKeyIndex = keyIndex; // تحديث المفتاح الناجح
      return response;
    } catch (error) {
      console.log(`فشل المفتاح ${keyIndex + 1}، جاري المحاولة بالمفتاح التالي...`);
      // محاولة المفتاح التالي
      return this.sendWithFallback(message, conversationHistory, keyIndex + 1);
    }
  },

  async callGeminiAPI(apiKey, message, conversationHistory) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    // بناء سياق المحادثة
    const contents = conversationHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // إضافة الرسالة الحالية
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const requestBody = {
      contents: contents,
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'فشل في الاتصال بالخادم');
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('لم يتم استلام رد صحيح من الخادم');
    }

    return data.candidates[0].content.parts[0].text;
  },

  getCurrentKeyIndex() {
    return currentKeyIndex;
  },
};
