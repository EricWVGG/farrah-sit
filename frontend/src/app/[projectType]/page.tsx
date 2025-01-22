// export const dynamic = 'force-static'

import { processMetadata } from '@lib'
import { Page } from '@ui'
import { BASE_URL, DEFAULT_SITE_TITLE } from '@const'
import { getPage, getMetadata, getSiteSettings } from '@query'
import { notFound } from 'next/navigation'
import { ProjectPageParams } from '@types'

export default async function Home(props: {
  params: Promise<ProjectPageParams>
}) {
  const { projectType } = await props.params
  const page = await getPage({ slug: projectType })
  if (!page) return notFound()
  return <Page page={page} />
}

export async function generateMetadata(props: {
  params: Promise<ProjectPageParams>
}) {
  const { projectType } = await props.params
  const metadataResult = await getMetadata({ slug: projectType })
  const siteSettings = await getSiteSettings()
  const metadata = processMetadata(metadataResult, siteSettings, 'page')
  return {
    ...metadata,
    title: DEFAULT_SITE_TITLE,
    openGraph: {
      ...metadata.openGraph,
      title: DEFAULT_SITE_TITLE,
    },
    alternates: {
      canonical: BASE_URL,
    },
  }
}

export async function generateStaticParams() {
  return [
    { projectType: 'lighting' },
    { projectType: 'collaborations' },
    { projectType: 'objects' },
  ]
}

export function generateViewport() {
  return {
    themeColor: 'var(--white)',
  }
}
