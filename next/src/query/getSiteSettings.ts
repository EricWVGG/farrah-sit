import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'
import { imageFragment } from './fragments'

export const siteSettingsQuery = defineQuery(`
  *[_type == 'siteSettings' && title == 'Michael Freimuth'][0]{
    title,
    description,
    shareImage ${imageFragment}
  }
`)

export const getSiteSettings = async () =>
  await fetchFromSanity<Sanity.SiteSettingsQueryResult>(siteSettingsQuery)
