import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'
import { type SlugParams } from '@types'
import { imageFragment } from './fragments'

export const pageQuery = defineQuery(`
  *[_type == 'page' && metadata.slug.current == $slug][0]{
    metadata {
      ...,
      poster ${imageFragment}
    },
    copy,
    projects[] -> {
      _id,
      projectType,
      images[] ${imageFragment},
      metadata {
        title,
        description,
        slug {
          current
        }
      }
    },
  }
`)

export const getPage = async (params: SlugParams, draftMode?: boolean) =>
  await fetchFromSanity<Sanity.PageQueryResult>(pageQuery, {
    params,
    draftMode,
  })
