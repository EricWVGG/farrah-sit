// export const dynamic = 'force-static'

import { processMetadata } from '@lib'
import { Project } from '@ui'
import {
  getProject,
  getProjectIndex,
  getMetadata,
  getSiteSettings,
} from '@query'
import { ProjectPageParams } from '@types'
import { notFound } from 'next/navigation'

export default async function ProjectPage(props: {
  params: Promise<ProjectPageParams>
}) {
  const { slug, projectType } = await props.params
  const project = await getProject({ slug })
  if (!project || project.projectType !== projectType) return notFound()
  // const siteSettings = await getSiteSettings()
  return (
    <Project
      project={project}
      catalogLink="https://ik.imagekit.io/vpmkkvxmw/files/00c7bf9c9024530127dbb677e4a58cb6c915c0da.pdf/farrah-sit-catalog.pdf?ik-attachment=true"
    />
  )
}

export async function generateMetadata(props: {
  params: Promise<ProjectPageParams>
}) {
  const { slug, projectType } = await props.params
  const metadataResult = await getMetadata({ slug })
  const siteSettings = await getSiteSettings()
  return processMetadata(metadataResult, siteSettings, projectType)
}

export async function generateStaticParams() {
  const projectIndex = await getProjectIndex()
  return projectIndex.map((project) => ({
    slug: project.metadata?.slug.current,
    projectType: project.projectType,
  }))
}

export async function generateViewport() {
  return {
    themeColor: 'white',
  }
}
