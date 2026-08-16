/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的HTMLとしてエクスポート
  images: {
    unoptimized: true, // GitHub Pages等での画像最適化無効化
  },
  // リポジトリ名が「parent-child-diagnosis」の場合、ベースパスを設定（ルートドメインでない場合）
  // basePath: '/parent-child-diagnosis',
};

export default nextConfig;
