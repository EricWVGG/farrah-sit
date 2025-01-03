'use client'

import { styled } from '@linaria/react'
import { Onionskin } from '@ui'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ProjectIndex = ({
  projects,
}: {
  projects: Sanity.ProjectIndexQueryResult
}) => {
  const [activeModal, setActiveModal] = useLayout(
    useShallow((state) => [state.activeModal, state.setActiveModal]),
  )

  const sortedProjects = projects.reduce(
    (acc, project) => {
      acc[project.projectType].push(project)
      return acc
    },
    {
      collaborations: [] as Sanity.ProjectIndexQueryResult,
      lighting: [] as Sanity.ProjectIndexQueryResult,
      objects: [] as Sanity.ProjectIndexQueryResult,
    },
  )

  const pathname = usePathname()

  const active = activeModal === 'INDEX'

  return !sortedProjects ? null : (
    <>
      <Wrapper
        className={`
          ${active ? 'active' : ''}
          ${pathname !== '/' ? 'initialized' : ''}
        `}
      >
        <List>
          {Object.keys(sortedProjects).map((projectType, i) => (
            <li key={`project-type-${i}`}>
              <ProjectType>{projectType}</ProjectType>
              <ul>
                {sortedProjects[projectType as keyof typeof sortedProjects]
                  .sort((a, b) =>
                    a.metadata.title < b.metadata.title ? -1 : 1,
                  )
                  .map((project, ii) => (
                    <Item key={project._id}>
                      <Link
                        href={`/${project.projectType}/${project.metadata.slug.current}`}
                      >
                        {project.metadata?.title}
                      </Link>
                      <Number>{ii + 1}</Number>
                    </Item>
                  ))}
              </ul>
            </li>
          ))}
        </List>
        <ToggleOn onClick={() => setActiveModal('INDEX')} />
      </Wrapper>
      <Onionskin />
    </>
  )
}

const Wrapper = styled.section`
  position: fixed;
  z-index: var(--layer-project-index);
  top: var(--header-height);
  right: 0;
  height: calc(100dvh - var(--header-height));
  width: 100%;
  max-width: 580px;
  overflow-y: auto;

  padding: 80px 80px;

  transition: transform 1.25s ease-in-out;
  right: -600px;

  &.initialized {
    transform: translateX(-40px);
    @media only screen and (min-width: 1024px) {
      transform: translateX(-80px);
    }
  }
  &.active {
    z-index: var(--layer-popout);
    transform: translateX(-600px);
  }

  background: var(--concrete);
`

const List = styled.ul`
  overflow-x: hidden;
  ul {
    margin-bottom: 3em;
  }
`

const Item = styled.li`
  position: relative;
  display: list-item;
  text-align: match-parent;
  font-size: 1.5rem;
  line-height: 3rem;
  margin-top: 1.5em;
  a {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding-right: 0.33em;
    background: var(--concrete);
  }
  &:before {
    float: left;
    width: 0;
    white-space: nowrap;
    content: '. . . . . . . . . . . . . . . . . . . . '
      '. . . . . . . . . . . . . . . . . . . . '
      '. . . . . . . . . . . . . . . . . . . . '
      '. . . . . . . . . . . . . . . . . . . . '
      '. . . . . . . . . . . . . . . . . . . . '
      '. . . . . . . . . . . . . . . . . . . . '
      '. . . . . . . . . . . . . . . . . . . . '
      '. . . . . . . . . . . . . . . . . . . . ';
    display: none;
  }
`

const Number = styled.span`
  display: none;
  float: right;
  display: inline-block;
  padding-left: 0.33em;
  background: var(--concrete);
`

const ToggleOn = styled.button`
  position: absolute;
  left: -0px;
  top: 0;
  width: 70px;
  min-height: 100%;
  appearance: none;
`

const ProjectType = styled.h2`
  text-transform: capitalize;
  margin-bottom: 0.5em;
  font-size: var(--typeSizeL);
  line-height: var(--typeLineL);
`
