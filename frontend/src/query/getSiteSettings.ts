import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'
import { imageFragment, fileFragment } from './fragments'
import { DEFAULT_SITE_TITLE } from '../const'

export const siteSettingsQuery = defineQuery(`
  *[_type == 'siteSettings' && title == '${DEFAULT_SITE_TITLE}'][0]{
    title,
    description,
    shareImage ${imageFragment},
    catalog ${fileFragment}
  }
`)

export const getSiteSettings = async () =>
  await fetchFromSanity<Sanity.SiteSettingsQueryResult>(siteSettingsQuery)
