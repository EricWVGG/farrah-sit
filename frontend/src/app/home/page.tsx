import { processMetadata } from '@lib'
import { Splash } from '@ui'
import { BASE_URL, DEFAULT_SITE_TITLE } from '@const'
import { getPage, getNavigation, getMetadata, getSiteSettings } from '@query'
import { SLUG } from './'
import { notFound } from 'next/navigation'

export default async function Home() {
  const page = await getPage({ slug: SLUG })
  const navigation = await getNavigation({ name: 'Splash' })
  if (!page) return notFound()
  return <Splash page={page} navigation={navigation} />
}

export async function generateMetadata() {
  const metadataResult = await getMetadata({ slug: SLUG })
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

export function generateViewport() {
  return {
    themeColor: 'var(--white)',
  }
}
