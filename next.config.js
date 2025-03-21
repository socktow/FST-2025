/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    domains: ['patchwiki.biligame.com', 'cdn.discordapp.com'],
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
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/attachments/**',
      }
    ],
  },
}

module.exports = nextConfig 