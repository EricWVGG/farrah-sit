import { styled } from '@linaria/react'
import { PropsWithChildren } from 'react'

interface PageProps extends PropsWithChildren {
  page: Sanity.PageQueryResult
  className?: string
}

export const Splash = ({ page, ...props }: PageProps) =>
  !page ? null : (
    <Wrapper {...props}>
      {page.projects?.map((project) => (
        <Project key={project._id}>{project.metadata?.title}</Project>
      ))}
    </Wrapper>
  )

const Wrapper = styled.main`
  outline: 1px dashed magenta;
  position: fixed;

  top: var(--header-height);
  height: calc(100vh - var(--header-height));

  left: 10vw;
  width: 80vw;
`

const Project = styled.div``
