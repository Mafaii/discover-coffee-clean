/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',        
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fastly.4sqi.net',        
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
