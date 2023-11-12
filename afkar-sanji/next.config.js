/** @type {import('next').NextConfig} */

const nextConfig = {
    devIndicators: {
        buildActivity: false
    },
  reactStrictMode: false,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: {
      ssr : true
    }
  },
  rewrites : async () => [
     {
        source: '/api/:path*',
        destination: 'https://mah-api.codintofuture.ir/:path*/',
        basePath: false,
      },
  ]
}

module.exports = nextConfig
