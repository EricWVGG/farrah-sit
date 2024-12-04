import { styled } from '@linaria/react'
import Link from 'next/link'
import { Slideshow } from '@ui'

export const Project = ({
  project,
}: {
  project: Member<NonNullable<Sanity.PageQueryResult>['projects']>
}) => {
  return !project ? null : (
    <Wrapper>
      <TitleColumn>
        <Title>{project.metadata?.title}</Title>
      </TitleColumn>
      <Slideshow images={project.images} />
      <Description>
        <p>{project.metadata?.description}</p>
        <ReadMore
          href={`/${project.projectType}/${project.metadata.slug.current}`}
        >
          Read more…
        </ReadMore>
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
  top: 120px;

  @media only screen and (min-width: 1024px) {
    padding-bottom: 1.4em;

    text-align: right;
  }
  font-size: var(--typeSizeL);
  line-height: var(--typeLineL);
`

const Description = styled.article`
  grid-area: description;
  p {
    font-size: var(--typeSizeM);
    line-height: var(--typeLineM);
  }
`

const ReadMore = styled(Link)`
  display: inline-block;
  font-size: var(--typeSizeM);
  line-height: var(--typeLineM);
  float: right;
`
