import type { Metadata } from 'next'
import '@theme/stylesheets/reset.min.css'
import '@theme/stylesheets/palette.scss'
import '@theme/stylesheets/layers.scss'
import '@theme/stylesheets/spacing.scss'
import '@theme/stylesheets/pageMargin.scss'
import '@theme/stylesheets/main.scss'
import '@theme/stylesheets/typography.scss'
import { robinson } from '@theme'
import { Header, AboutPanel, ProjectIndex } from '@ui'
import { getPage, getProjectIndex } from '@query'

export const metadata: Metadata = {
  title: 'Farrah Sit',
  description: 'todo',
}

type SortedProjects = Record<
  'lighting' | 'sculpture' | 'collaboration',
  Sanity.ProjectIndexQueryResult
>

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const aboutContent = await getPage({ slug: 'about' })
  const projects = await getProjectIndex()
  const sortedProjects: SortedProjects = projects.reduce(
    (acc, project) => {
      acc[project.projectType].push(project)
      return acc
    },
    {
      collaboration: [] as Sanity.ProjectIndexQueryResult,
      lighting: [] as Sanity.ProjectIndexQueryResult,
      sculpture: [] as Sanity.ProjectIndexQueryResult,
    },
  )
  return (
    <html lang="en">
      <body className={robinson.variable}>
        <Header />
        {children}
        <AboutPanel content={aboutContent} />
        <ProjectIndex sortedProjects={sortedProjects} />
      </body>
    </html>
  )
}
