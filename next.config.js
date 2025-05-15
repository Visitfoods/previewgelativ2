/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'raw.githubusercontent.com'],
  },
  webpack: (config) => {
    // Não é necessário adicionar regras para arquivos estáticos
    // quando eles estão na pasta public
    return config;
  },
};

module.exports = nextConfig; 