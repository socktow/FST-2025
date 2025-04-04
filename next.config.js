/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: 'cdn.discordapp.com',
        pathname: '/attachments/**',
      },
    ],
    unoptimized: true
  },
};

module.exports = nextConfig;
