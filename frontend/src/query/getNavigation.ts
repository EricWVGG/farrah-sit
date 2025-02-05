import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'
import { imageFragment } from './fragments'

export const navigationQuery = defineQuery(`
  *[_type == 'navigation' && name == $name][0]{
    links[] {
      ...,
      label,
      externalUrl,
      destination -> {
        metadata {
          slug {
            current
          }
        },
        projectType
      },
      image ${imageFragment}
    }
  }
`)

export const getNavigation = async (params: { name: string }) =>
  await fetchFromSanity<Sanity.NavigationQueryResult>(navigationQuery, {
    params,
  })
