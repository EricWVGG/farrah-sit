import { BASE_URL } from '@const'
import type { MetadataRoute } from 'next'
import { getProjectIndex, getPageIndex } from '@query'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProjects = await getProjectIndex()
  const parsedProjects = allProjects.map((p) => ({
    url: `${BASE_URL}/${p.projectType}/${p.metadata.slug.current}`,
    lastModified: p._updatedAt.substring(0, 10),
    priority: 0.7,
  }))

  const allPages = await getPageIndex()
  const parsedPages = allPages.map((p) => ({
    url:
      p.metadata.slug.current === 'home'
        ? BASE_URL
        : `${BASE_URL}/${p.metadata.slug.current}`,
    lastModified: p._updatedAt.substring(0, 10),
    priority:
      p.metadata.slug.current === 'home'
        ? 1
        : p.metadata.slug.current === 'about'
        ? 0.9
        : 0.2,
  }))

  return [...parsedProjects, ...parsedPages]
}
