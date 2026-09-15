import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'SureFlow - 工业级智能液压阀块协同设计平台',
  description:
    '结合高精度几何内核与 AI 流道寻优算法，自动化生成复杂液压集成块内部管路，消除人工布孔干涉，直出工业级高保真 STEP 实体。',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
