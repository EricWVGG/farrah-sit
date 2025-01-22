'use client'

import { useLiveQuery } from '@sanity/preview-kit'
import { Page } from '@ui'
import { pageQuery } from '@query'
import { PropsWithChildren } from 'react'

interface IPreviewPage extends PropsWithChildren {
  page: Sanity.PageQueryResult
  className?: string
  params: Record<string, string>
}

export const PagePreview = ({
  page: initialData,
  params,
  className,
  ...props
}: IPreviewPage) => {
  const [page] = useLiveQuery(initialData, pageQuery, params)
  return <Page page={page} {...props} className={className} />
}
