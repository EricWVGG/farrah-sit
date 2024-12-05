import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'

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
        }
      }
    }
  }
`)

export const getNavigation = async (params: { name: string }) =>
  await fetchFromSanity<Sanity.NavigationQueryResult>(navigationQuery, {
    params,
  })
