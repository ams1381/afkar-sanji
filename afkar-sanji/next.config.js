/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: {
      ssr : true
    }
  },
  // rewrites : async () => [
  //   {
  //     source: '/api/:path*',
  //     destination: 'https://mah-api.ariomotion.com/:path*',
  //     basePath: false,
  //   }
  // ]
}

module.exports = nextConfig
