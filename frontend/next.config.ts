import withLinaria from 'next-with-linaria'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
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
}

export default withLinaria(nextConfig)
