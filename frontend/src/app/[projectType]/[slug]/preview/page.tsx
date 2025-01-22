export const dynamic = 'force-dynamic'

import { draftMode } from 'next/headers'
import { getProject } from '@query'
import { Suspense } from 'react'
import dynamicImport from 'next/dynamic'
import { redirect } from 'next/navigation'
import { PreviewProvider } from '@lib'
import { ProjectPageParams } from '@types'
import { generateViewport } from '../page'

const ProjectPreview = dynamicImport(() =>
  import('./ProjectPreview').then((c) => c.ProjectPreview),
)

export default async function ProjectPage(props: {
  params: Promise<ProjectPageParams>
}) {
  const drafts = await draftMode()
  if (!drafts.isEnabled) {
    redirect('/')
  }
  const { slug } = await props.params
  if (!slug) {
    throw new Error('slug not found')
  }
  const project = await getProject({ slug }, true)
  if (!project) throw new Error(`Project not found: ${slug}`)
  return (
    <Suspense fallback={<p>Loading live preview…</p>}>
      <PreviewProvider>
        <ProjectPreview project={project} params={{ slug }} />
      </PreviewProvider>
    </Suspense>
  )
}

export { generateViewport }
