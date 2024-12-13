'use client'

import { styled } from '@linaria/react'
import Link from 'next/link'
import { Slideshow } from '@ui'
import { useTransit } from '@lib'

export const ProjectsItem = ({
  project,
}: {
  project: Member<NonNullable<Sanity.PageQueryResult>['projects']>
}) => {
  const transit = useTransit()

  return !project ? null : (
    <Wrapper>
      <TitleColumn>
        <Title>
          <Link
            href={`/${project.projectType}/${project.metadata.slug.current}`}
          >
            {project.metadata?.title}
          </Link>
        </Title>
      </TitleColumn>
      <Slideshow
        images={project.images}
        link={`/${project.projectType}/${project.metadata.slug.current}`}
      />
      <Description>
        <p>
          <Link
            href={`/${project.projectType}/${project.metadata.slug.current}`}
          >
            {' '}
            {project.metadata?.description}
          </Link>
        </p>
      </Description>
    </Wrapper>
  )
}

const Wrapper = styled.li`
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: auto;

  grid-template-areas: 'slideshow' 'title' 'description';
  gap: 30px;

  @media only screen and (min-width: 1024px) {
    gap: 15px 30px;
    grid-template-columns: 1fr 45vw;
    grid-template-rows: auto;
    grid-template-areas: 'title slideshow' 'title description';
  }

  p {
    max-width: 500px;
  }
`

const TitleColumn = styled.div`
  grid-area: title;
  position: relative;
`

const Title = styled.h3`
  position: sticky;
  top: var(--header-height);

  @media only screen and (min-width: 1024px) {
    text-align: right;
  }
  font-size: var(--typeSizeL);
  line-height: var(--typeLineL);

  a {
    color: var(--tundora);
  }
`

const Description = styled.article`
  grid-area: description;
  p {
    font-size: var(--typeSizeM);
    line-height: var(--typeLineM);
  }
  a {
    color: var(--tundora);
    &:hover:after {
      opacity: 0;
    }
  }
`
