/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: { 
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '58869',
        pathname: '/cache/**',
      },
      {
        protocol: 'https',
        hostname: 'patchwiki.biligame.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig 