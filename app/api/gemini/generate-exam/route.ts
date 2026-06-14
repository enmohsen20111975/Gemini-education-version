import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return NextResponse.json(
        { 
          error: "API_KEY_MISSING",
          message: "⚠️ مفتاح الأمان للذكاء الاصطناعي (GEMINI_API_KEY) غير مفعّل حالياً في إعدادات المنصة. يرجى تفعيله لتوليد أسئلة غير محدودة بالذكاء الاصطناعي!"
        },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const { lessonTitle, subjectName, gradeName, difficulty, count } = await req.json();

    const prompt = `أنت الخبير والموجه الأول لمناهج وزارة التربية والتعليم المصرية للمرحلة الثانوية العامة (الصف الأول والثاني والثالث الثانوي).
مهمتك هي إنشاء مجموعة من الأسئلة الاختيارية من متعدد الفائقة والمحاكية تماماً لنظام امتحانات التابلت والأسئلة الحديثة (امتحانات الثانوية العامة المصرية لعام 2024 و2025 و2026).

سياق مخصص للإنشاء:
- مادة: "${subjectName || 'الفيزياء'}"
- السنة الدراسية: "${gradeName || 'الصف الثالث الثانوي'}"
- الدرس المراد توليد الأسئلة له: "${lessonTitle || 'شدة التيار وقانون أوم'}"
- مستوى الصعوبة المطلوب: "${difficulty || 'متوسط'}" (يمكن أن يكون: سهل، متوسط، صعب للعباقرة)
- عدد الأسئلة المطلوب: ${count || 5} أسئلة اختيارية من متعدد.

شروط هامة وثابتة في صياغة المحتوى:
1. السؤال (question): مصاغ بلغة عربية فصحى دقيقة وسليمة علمياً، ويركز على مخرجات التعلم والفهم العميق وربط العلاقات وليس الحفظ التلقيني.
2. الاختيارات (options): يجب أن تتكون من 4 خيارات تماماً، جذابة ومربكة للطالب غير المذاكر بدقة، وخيار واحد فقط صحيح بنسبة 100%.
3. الرقم الصحيح (correctIndex): يعبر عن رقم إندكس الاختيار الصحيح (يكون من 0 لـ 3).
4. التوضيح والتعليل (explanation): اكتب تعليل الحل بأسلوب "مستر سهل" الودود والتبسيطي جداً باللهجة العامية المصرية الدارجة السلسة، مع دمج تشبيهات شعبية لتبسيط الفكرة الفيزيائية/العلمية وجعل الطالب يقول "آهاا فهمتها!".
5. التنبيه والتحذير من الخدعة (trickWarning): اكتب تحذيراً صريحاً باللهجة العامية المصرية ينبه الطالب من الفخاخ أو اللبس أو الأخطاء الشائعة اللي ممكن يقع فيها في امتحان الثانوية العامة (مثلاً: انتبه المقاومة النوعية ثابتة للمادة ولا تزيد بزيادة الطول!).

يجب صياغة الخرج في صيغة JSON مطابقة تماماً للمواصفات المرفقة بالـ responseSchema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["questions"],
          properties: {
            questions: {
              type: Type.ARRAY,
              description: "قائمة الأسئلة المولدة المتوافقة مع هيكلة الامتحان",
              items: {
                type: Type.OBJECT,
                required: ["id", "question", "options", "correctIndex", "explanation", "trickWarning"],
                properties: {
                  id: {
                    type: Type.INTEGER,
                    description: "معرف رقمي فريد وعشوائي للسؤال"
                  },
                  question: {
                    type: Type.STRING,
                    description: "نص السؤال باللغة العربية الفصحى العلمية المنهجية"
                  },
                  options: {
                    type: Type.ARRAY,
                    description: "4 خيارات متباينة وصادمة",
                    items: {
                      type: Type.STRING
                    }
                  },
                  correctIndex: {
                    type: Type.INTEGER,
                    description: "رقم إندكس الخيار الصحيح من 0 لـ 3"
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "الشرح التفصيلي للحل باللهجة العامية المصرية التبسيطية"
                  },
                  trickWarning: {
                    type: Type.STRING,
                    description: "كشف فخ وتريكة الامتحان باللهجة العامية البسيطة"
                  }
                }
              }
            }
          }
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("لم يرجع النموذج أي بيانات");
    }

    const data = JSON.parse(textOutput.trim());
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Generate Exam Error:", err);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: `عذراً يا بطل! لم نتمكن من توليد الملف الكيرشوفي نتيجة خلل مؤقت: ${err.message || err}` },
      { status: 500 }
    );
  }
}
