import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'
import { imageFragment } from './fragments'
import { DEFAULT_SITE_TITLE } from '../const'

export const siteSettingsQuery = defineQuery(`
  *[_type == 'siteSettings' && title == '${DEFAULT_SITE_TITLE}'][0]{
    title,
    description,
    shareImage ${imageFragment}
  }
`)

export const getSiteSettings = async () =>
  await fetchFromSanity<Sanity.SiteSettingsQueryResult>(siteSettingsQuery)
