/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages用のパス設定
  basePath: process.env.NODE_ENV === 'production' ? '/oyako-communication-shindan' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/oyako-communication-shindan/' : '',
};

module.exports = nextConfig;
