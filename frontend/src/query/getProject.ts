import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'
import { type SlugParams } from '@types'
import { imageFragment, fileFragment } from './fragments'

export const projectQuery = defineQuery(`
  *[_type == 'project' && metadata.slug.current == $slug][0]{
    metadata,
    copy,
    projectType,
    images[] ${imageFragment},
    tearsheet ${fileFragment}
  }
`)

export const getProject = async (params: SlugParams, draftMode?: boolean) =>
  await fetchFromSanity<Sanity.ProjectQueryResult>(projectQuery, {
    params,
    draftMode,
  })
