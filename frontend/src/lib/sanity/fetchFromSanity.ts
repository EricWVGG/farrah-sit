import { sanityClient } from './'
import type { QueryParams, ResponseQueryOptions } from '@sanity/client'

export const fetchFromSanity = <T = unknown>(
  query: string,
  {
    params = {},
    draftMode,
    ...next
  }: {
    params?: QueryParams
    draftMode?: boolean
  } & ResponseQueryOptions['next'] = {},
) =>
  sanityClient.fetch<T>(
    query,
    params,
    draftMode
      ? {
          stega: true,
          perspective: 'previewDrafts',
          token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
          useCdn: false,
          next: {
            revalidate: 0,
            ...next,
          },
        }
      : {
          perspective: 'published',
          useCdn: true,
          next: {
            revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE) || false,
            ...next,
          },
        },
  )
