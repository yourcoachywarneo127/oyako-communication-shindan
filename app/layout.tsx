import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '親子コミュニケーション診断',
  description: '親子それぞれの視点からコミュニケーションのギャップを診断します。',
};

// スマホ画面で拡大縮小が発生せず、アプリのようにぴったりフィットさせる設定
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-amber-50/30 min-h-screen text-gray-800 antialiased selection:bg-amber-200">
        {children}
      </body>
    </html>
  );
}
