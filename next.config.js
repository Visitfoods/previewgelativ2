/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three'],
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|mind)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/files',
          outputPath: 'static/files',
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig; 