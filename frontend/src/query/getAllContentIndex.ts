import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'

export const allContentIndexQuery = defineQuery(`
  *[_type == 'page' || _type == 'project']{
    _id,
    _type,
    projectType,
    metadata {
      slug {
        current
      }
    }
  }
`)

export const getAllContentIndex = async (draftMode?: boolean) =>
  await fetchFromSanity<Sanity.AllContentIndexQueryResult>(
    allContentIndexQuery,
    { draftMode },
  )
