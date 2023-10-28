/** @type {import('next').NextConfig} */

const nextConfig = {
    devIndicators: {
        buildActivity: false
    },
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: {
      ssr : true
    }
  },
  rewrites : async () => [
    // {
    //   source: '/api/user-api/auth/gateway',
    //   destination: 'https://mah-api.ariomotion.com/user-api/auth/gateway/',
    //   basePath: false,
    // },
     {
        source: '/api/:path*',
        destination: 'https://mah-api.codintofuture.ir/:path*/',
        basePath: false,
      },
  ]
}

module.exports = nextConfig
