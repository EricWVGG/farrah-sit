import withLinaria from 'next-with-linaria'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
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
}

export default withLinaria(nextConfig)
