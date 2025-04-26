import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'

export const pageIndexQuery = defineQuery(`
  *[_type == 'page']{
    _id,
    _updatedAt,
    metadata {
      title,
      description,
      slug {
        current
      }
    }
  }
`)

export const getPageIndex = async (draftMode?: boolean) =>
  await fetchFromSanity<Sanity.PageIndexQueryResult>(pageIndexQuery, {
    draftMode,
  })
