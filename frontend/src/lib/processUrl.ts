import { BASE_URL } from '@const'

export const processUrl = (
  _type: string,
  slug?: string | null,
  {
    base = true,
    params,
  }: {
    base?: boolean
    params?: string
  } = {},
) => {
  const directory = _type === 'projectV2' ? 'project' : null

  const path = slug === 'home' ? null : slug

  return (
    (base ? BASE_URL + '/' : '/') +
    [directory, path, params].filter(Boolean).join('/')
  )
}
