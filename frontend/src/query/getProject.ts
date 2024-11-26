import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'
import { type SlugParams } from '@types'
import { imageFragment, fileFragment } from './fragments'
import { modulesFragment } from './modulesFragment'

export const projectQuery = defineQuery(`
  *[_type == 'projectV2' && metadata.slug.current == $slug][0]{
    projectType,
    metadata,
    banner {
      type,
      image ${imageFragment},
      mobileImage ${imageFragment},
      video ${fileFragment},
      mobileVideo ${fileFragment},
    },
    customBackgroundColor {
      hex
    },
    gridGapX,
    gridGapY,
    gridGapXMobile,
    gridGapYMobile,
    modules[] ${modulesFragment},
    segueToMore
  }
`)

export const getProject = async (params: SlugParams, draftMode?: boolean) =>
  await fetchFromSanity<Sanity.ProjectQueryResult>(projectQuery, {
    params,
    draftMode,
  })
