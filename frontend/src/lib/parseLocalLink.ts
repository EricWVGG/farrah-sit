import { resolveReference } from '@lib'

export const parseLocalLink = (link: Sanity.NavigationLink) => {
  const destination = resolveReference(link.destination)
  return destination?._type === 'project'
    ? `/${destination.projectType}/${destination.metadata?.slug?.current}`
    : destination?._type === 'page'
    ? `/${destination.metadata?.slug?.current}`
    : `` // is never returned
}
