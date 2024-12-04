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
      {projects?.map((project) => (
        <Project key={`${project._id}-2`} project={project} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 60px;

  padding-top: 120px;
  margin: 0 15vw 15vw 15vw;
`
