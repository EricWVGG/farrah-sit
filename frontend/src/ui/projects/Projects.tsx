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
  display: flex;
  flex-direction: column;
  gap: 60px;

  padding-top: 120px;
  margin: 0 15vw 15vw 15vw;
`
