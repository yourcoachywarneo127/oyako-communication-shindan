import React from 'react';

export const metadata = {
  title: '親子のコミュニケーション診断',
  description: '親子のコミュニケーション診断アプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
