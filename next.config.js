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
    ],
  },
}

module.exports = nextConfig 