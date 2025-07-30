import { cdnUrl } from '@/lib'

export const getCatalogLink = (
  siteSettings: Sanity.SiteSettingsQueryResult,
) => {
  const catalogLink = siteSettings?.catalog?.asset?.url
  const originalFilename = siteSettings?.catalog?.asset?.originalFilename
  return cdnUrl(`${catalogLink}/${originalFilename}`).toString()
}
