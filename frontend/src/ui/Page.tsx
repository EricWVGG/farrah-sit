import { styled } from '@linaria/react'
import { PropsWithChildren } from 'react'
import { RichText, Projects } from '@ui'

interface PageProps extends PropsWithChildren {
  page: Sanity.PageQueryResult
  className?: string
}

export const Page = ({ page, ...props }: PageProps) => {
  console.log('page', page)

  return !page ? null : (
    <Wrapper {...props}>
      {page.copy && <RichText value={page.copy} />}
      {page.projects && <Projects projects={page.projects} />}
    </Wrapper>
  )
}

const Wrapper = styled.main``
