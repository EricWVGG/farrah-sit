'use client'

import { useLiveQuery } from '@sanity/preview-kit'
import { Page, Lifter } from '@ui'
import { pageQuery } from '@query'
import { SUBGRID_LIFTER_MARKER } from '@const'
import { PropsWithChildren } from 'react'

interface IPreviewPage extends PropsWithChildren {
  page: Sanity.PageQueryResult
  subPage?: Sanity.PageQueryResult
  className?: string
  params: Record<string, string>
}

export const PagePreview = ({
  page: initialData,
  subPage: initialSubPageData,
  params,
  className,
  children,
  ...props
}: IPreviewPage) => {
  const [page, loading] = useLiveQuery(initialData, pageQuery, params)
  const [subPage] = useLiveQuery(initialSubPageData || null, pageQuery, {
    slug: page?.subPage?.metadata?.slug.current || null,
  })
  return loading ? (
    <>Loading…</>
  ) : (
    <>
      <Page
        page={page}
        {...props}
        className={className}
        footer={page?.segueToSubPage}
      >
        {children}
      </Page>
      {page?.subPage && subPage && (
        <Lifter
          projectType={subPage.metadata?.slug.current}
          markerId={SUBGRID_LIFTER_MARKER}
        >
          <Page
            page={subPage}
            className="fixed-rows sub-page"
            header={page?.subPageHeader}
          />
        </Lifter>
      )}
    </>
  )
}
