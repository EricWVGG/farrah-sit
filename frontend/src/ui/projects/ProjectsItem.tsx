'use client'

import { styled } from '@linaria/react'
import Link from 'next/link'
import Image from 'next/image'
import { useTransit } from '@lib'

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
        <Image
          src={project.images[0].asset?.url!}
          alt={
            project.images[0].asset?.metadata?.dimensions?.aspectRatio?.toString()!
          }
          width={project.images[0].asset?.metadata?.dimensions?.width!}
          height={project.images[0].asset?.metadata?.dimensions?.height!}
        />
        <Row>
          <Title>{project.metadata?.title}</Title>
          <Details className="textButton">Details &gt;</Details>
        </Row>
        <Description>{project.metadata?.description}</Description>
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
  line-height: var(--typeLineL);

  a {
    color: var(--tundora);
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Details = styled.div`
  margin-top: 0.75em;
  font-size: var(--typeSizeXS);
  line-height: var(--typeLineXS);
`

const Description = styled.p`
  margin-top: 0.5em;
  font-size: var(--typeSizeS);
  line-height: var(--typeLineS);
  a {
    color: var(--tundora);
    &:hover:after {
      opacity: 0;
    }
  }
`
