import { resolveReference } from '@lib'

export const parseLocalLink = (link: Sanity.NavigationLink) => {
  const destination = resolveReference(link.destination)
  return destination?._type === 'projectV2' &&
    destination?.projectType === 'branding'
    ? `/branding/${destination.metadata?.slug?.current}`
    : destination?._type === 'projectV2' &&
      destination?.projectType === 'editorial'
    ? `/editorial/${destination.metadata?.slug?.current}`
    : destination?._type === 'page'
    ? `/${destination.metadata?.slug?.current}`
    : `` // is never returned
}
