'use client'

import { useLiveQuery } from '@sanity/preview-kit'
import { Splash } from '@ui'
import { pageQuery, navigationQuery } from '@query'
import { PropsWithChildren } from 'react'

interface IPreviewPage extends PropsWithChildren {
  page: Sanity.PageQueryResult
  navigation: Sanity.NavigationQueryResult
  className?: string
  params: Record<string, string>
}

export const PagePreview = ({
  page: initialData,
  navigation: initialNavData,
  params,
  className,
  ...props
}: IPreviewPage) => {
  const [page, loading] = useLiveQuery(initialData, pageQuery, params)
  const [navigation] = useLiveQuery(initialNavData, navigationQuery, {
    name: 'Splash',
  })
  return loading ? (
    <div>Loading…</div>
  ) : (
    <Splash
      page={page}
      navigation={navigation}
      {...props}
      className={className}
    />
  )
}
