import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'
import { type SlugParams } from '@types'
import { modulesFragment } from './modulesFragment'
import { imageFragment } from './fragments'

export const pageQuery = defineQuery(`
  *[_type == 'page' && metadata.slug.current == $slug][0]{
    metadata {
      ...,
      poster ${imageFragment}
    },
    pageType,
    gridGapX,
    gridGapY,
    gridGapXMobile,
    gridGapYMobile,
    slideshowInterval,
    
    modules[] ${modulesFragment},
    
    subPage -> {
      metadata {
        slug {
          current
        }
      }
    },
    segueToSubPage,
    subPageHeader,
    
    colorCycle[] {
      hex
    }
  }
`)

export const getPage = async (params: SlugParams, draftMode?: boolean) =>
  await fetchFromSanity<Sanity.PageQueryResult>(pageQuery, {
    params,
    draftMode,
  })
