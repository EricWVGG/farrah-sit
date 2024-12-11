'use client'

import { styled } from '@linaria/react'
import { useTimeout } from 'usehooks-ts'
import { ProjectsItem } from './ProjectsItem'
import { useLayout } from '@lib'
import { useShallow } from 'zustand/react/shallow'

export const Projects = ({
  projects,
}: Pick<NonNullable<Sanity.PageQueryResult>, 'projects'>) => {
  const [transitioning, setTransitioning] = useLayout(
    useShallow((state) => [state.transitioning, state.setTransitioning]),
  )

  useTimeout(() => setTransitioning(false), 500)

  return (
    <Wrapper className={transitioning ? 'hidden' : ''}>
      {projects?.map((project) => (
        <ProjectsItem key={project._id} project={project} />
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

  transition: transform 1.45s ease-in-out, opacity 1.4s ease-in-out;
  &.hidden {
    transition: transform 0.5s ease-in-out, opacity 0.3s ease-in-out;
    opacity: 0;
    transform: translateY(-25vh);
  }
`
