export const dynamic = 'force-dynamic'

import { draftMode } from 'next/headers'
import { getPage } from '@query'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { PreviewProvider } from '@lib'
import dynamicImport from 'next/dynamic'
import { ProjectPageParams } from '@types'
import { generateViewport } from '../page'

const PagePreview = dynamicImport(() =>
  import('./PagePreview').then((c) => c.PagePreview),
)

export default async function ProjectIndexPreview(props: {
  params: Promise<ProjectPageParams>
}) {
  const { projectType } = await props.params
  const drafts = await draftMode()
  if (!drafts.isEnabled) {
    redirect('/')
  }
  const page = await getPage({ slug: projectType }, true)
  if (!page) throw new Error(`Page not found: ${projectType}`)
  return (
    <Suspense fallback={<p>Loading live preview…</p>}>
      <PreviewProvider>
        <PagePreview page={page} params={{ slug: projectType }} />
      </PreviewProvider>
    </Suspense>
  )
}

export { generateViewport }
