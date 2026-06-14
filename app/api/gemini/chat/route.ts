import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return NextResponse.json(
        { 
          text: `أهلاً بيك يا بطل! 🦾 أنا مستر سهل، وجاهز أدردش معاك وأبسطلك الفيزياء! 
          
⚠️ **تنبيه تقني:** مفتاح الأمان (GEMINI_API_KEY) مش متفعل حالياً في إعدادات المنصة. كلم المشرف عشان يشغله، ومؤقتاً تقدر تضغط على الأسئلة الجاهزة تحت وهيجاوبك البنك التلقائي الذكي فوراً!`,
          isFallback: true
        },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const { messages, currentTopic } = await req.json();

    const systemInstruction = `أنت "مستر سهل" (Mr. Sahl)، مدرس الفيزياء المصري العبقري والودود والمشجع جداً لطلاب الثانوية العامة المصرية (سن 15-18 سنة).
تتحدث باللهجة المصرية البسيطة والدراجة والمدموجة بذكاء وتفاعل (المحببة للشباب)، وتستخدم الوجوه التعبيرية (Emojis) بشكل جميل مثل 🔥, 🦾, 💡, ⚡.
سياق الدرس الحالي هو: "${currentTopic || 'شدة التيار الكهربي قانون أوم'}".
عندما يطرح الطالب سؤالاً:
1. اشرح المفهوم بتبسيط شديد وطريقة مرئية بالتشبيهات الشعبية أو الواقعية المصرية (زي الكوبري والمترو، مواسير المياه والمضخات، الزحمة في الإشارات).
2. استشهد بالصيغ والوحدات الفيزيائية بوضوح بطريقة منسقة.
3. شجع الطالب بكلمات حماسية في البداية والنهاية ("يا دكتور المستقبل"، "يا عبقري"، "وحش الفيزياء").
4. لا تكتب ردوداً رتيبة وطويلة جداً، قسم ردك لفقرات مريحة للعين ونقاط واضحة.`;

    const chatHistory = messages ? messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    })) : [];

    // Call the Gemini API utilizing the default recommended model "gemini-2.5-flash"
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemInstruction }] },
        ...chatHistory
      ],
    });

    return NextResponse.json({ text: response.text || "عذراً يا بطل، حصل ضغط على الدائرة الكهربية لمخي، اسألني من تاني!" });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { text: `العفو منك يا بطل، حصل خطأ غير متوقع في الاتصال بمستر سهل. تأكد من إعدادات الـ API Key وجرب تاني! (التفاصيل: ${error.message || error})` },
      { status: 500 }
    );
  }
}
