export const dynamic = 'force-dynamic'

import { draftMode } from 'next/headers'
import { getPage } from '@query'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { PreviewProvider } from '@lib'
import { SLUG } from '../'
import dynamicImport from 'next/dynamic'

const PagePreview = dynamicImport(() =>
  import('./PagePreview').then((c) => c.PagePreview),
)

export default async function Home() {
  const drafts = await draftMode()
  if (!drafts.isEnabled) {
    redirect('/')
  }
  const page = await getPage({ slug: SLUG }, true)
  if (!page) {
    throw new Error('page not found')
  }
  return (
    <Suspense fallback={<p>Loading live preview…</p>}>
      <PreviewProvider>
        <PagePreview page={page} params={{ slug: SLUG }} />
      </PreviewProvider>
    </Suspense>
  )
}
