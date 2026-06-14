import type {Metadata} from 'next';
import { Cairo, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'ثانوية تفاعلية | منصة المذاكرة الشيقة',
  description: 'أول منصة تعليمية تفاعلية تعتمد على الجيمفيكيشن، المحاكيات التفاعلية، والخرائط الذهنية لتسهيل منهج الثانوية العامة المصرية.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="font-sans bg-[#0F172A] text-[#F8FAFC] antialiased selection:bg-blue-600/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
