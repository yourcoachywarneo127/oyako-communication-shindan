/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages のリポジトリ名に合わせてパスを設定
  basePath: process.env.NODE_ENV === 'production' ? '/oyako-communication-shindan' : '',
};

export default nextConfig;
