import { styled } from '@linaria/react'
import { Project } from './Project'

export const Projects = ({
  projects,
}: Pick<NonNullable<Sanity.PageQueryResult>, 'projects'>) => {
  return (
    <Wrapper>
      {projects?.map((project) => (
        <Project key={project._id} project={project} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 110px;

  padding-top: var(--header-height);
  margin: 0 8vw 100px 8vw;

  @media only screen and (min-width: 1024px) {
    margin: 0 15vw 15vw 15vw;
  }
`
