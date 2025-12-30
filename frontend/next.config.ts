import withLinaria from 'next-with-linaria'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'export',
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageKitLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/deploy',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}

export default withLinaria(nextConfig)
