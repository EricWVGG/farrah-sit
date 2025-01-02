'use client'

import { styled } from '@linaria/react'
import Link from 'next/link'
import { useTransit } from '@lib'
import { Slideshow } from '@ui'

export const ProjectsItem = ({
  project,
}: {
  project: Member<NonNullable<Sanity.PageQueryResult>['projects']>
}) => {
  const transit = useTransit()

  return !project || project.images.length < 1 ? null : (
    <Wrapper>
      <Link
        onClick={transit}
        href={`/${project.projectType}/${project.metadata.slug.current}`}
      >
        <Slideshow images={project.images} />
        <Row>
          <Title>{project.metadata?.title}</Title>
          {/* <Details className="textButton">Details &gt;</Details> */}
          <Description>{project.metadata?.description}</Description>
        </Row>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.li`
  a {
    display: contents;
    &:after {
      display: none !important;
    }
  }
  img {
    max-width: 100%;
    height: auto;
  }
`

const Title = styled.h3`
  margin-top: 1em;
  font-size: var(--typeSizeL);
  line-height: 1em;
  text-transform: uppercase;
  a {
    color: var(--tundora);
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 20px;
`

// const Details = styled.div`
//   margin-top: 0.75em;
//   font-size: var(--typeSizeXS) !important;
//   line-height: var(--typeLineXS) !important;
// `

const Description = styled.p`
  margin-top: 0.5em;
  font-size: var(--typeSizeS);
  line-height: 1.2em;
  a {
    color: var(--tundora);
    &:hover:after {
      opacity: 0;
    }
  }
`
