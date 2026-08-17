/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages用のサブディレクトリ設定
  basePath: '/oyako-communication-shindan',
  trailingSlash: true,
};

module.exports = nextConfig;
