import type { Metadata } from 'next'
import '@theme/stylesheets/reset.min.css'
import '@theme/stylesheets/palette.scss'
import '@theme/stylesheets/layers.scss'
import '@theme/stylesheets/spacing.scss'
import '@theme/stylesheets/pageMargin.scss'
import '@theme/stylesheets/main.scss'
import '@theme/stylesheets/typography.scss'
import { robinson } from '@theme'
import { Header, AboutPanel, Modals } from '@ui'
import { getPage, getNavigation, getSiteSettings } from '@query'

export const metadata: Metadata = {
  title: 'Farrah Sit',
  description: 'todo',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const aboutContent = await getPage({ slug: 'about' })
  const navigation = await getNavigation({ name: 'Header' })
  const siteSettings = await getSiteSettings()
  return (
    <html lang="en">
      <body className={robinson.variable}>
        <Header navigation={navigation} siteSettings={siteSettings} />
        {children}
        <AboutPanel content={aboutContent} />
        <Modals />
      </body>
    </html>
  )
}
