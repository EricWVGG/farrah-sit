'use client'

import { styled } from '@linaria/react'
import { Onionskin } from '@ui'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'
import Link from 'next/link'
import { useEffect } from 'react'
import { useScrollLock } from 'usehooks-ts'
import { usePathname } from 'next/navigation'

export const ProjectIndex = ({
  projects,
}: {
  projects: Sanity.ProjectIndexQueryResult
}) => {
  const [indexActive, setIndexActive] = useLayout(
    useShallow((state) => [state.indexActive, state.setIndexActive]),
  )

  const { lock, unlock } = useScrollLock({
    autoLock: false,
    lockTarget:
      typeof window !== 'undefined' ? document.documentElement : undefined,
  })

  useEffect(() => {
    if (indexActive) {
      lock()
    } else {
      unlock()
    }
  }, [indexActive])

  const sortedProjects = projects.reduce(
    (acc, project) => {
      acc[project.projectType].push(project)
      return acc
    },
    {
      collaboration: [] as Sanity.ProjectIndexQueryResult,
      lighting: [] as Sanity.ProjectIndexQueryResult,
      objects: [] as Sanity.ProjectIndexQueryResult,
    },
  )

  const pathname = usePathname()

  return !sortedProjects ? null : (
    <>
      <Wrapper
        className={`
          ${indexActive ? 'active' : ''}
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
        <ToggleOn onClick={() => setIndexActive(!indexActive)} />
      </Wrapper>
      <Onionskin
        className={indexActive ? 'active' : ''}
        onClick={() => setIndexActive(false)}
      />
    </>
  )
}

const Wrapper = styled.section`
  position: fixed;
  z-index: var(--layer-project-index);
  top: var(--header-height);
  left: 0;
  height: calc(100dvh - var(--header-height));
  width: 100%;
  max-width: 580px;
  overflow-y: auto;

  padding: 80px 80px;
  box-shadow: 20px 20px 0 rgb(225, 225, 225);

  transition: transform 1.25s ease-in-out;
  left: -600px;
  &.initialized {
    transform: translateX(80px);
  }
  &.active {
    z-index: var(--layer-popout);
    transform: translateX(600px);
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
  display: list-item;
  text-align: match-parent;
  font-size: 1.75rem;
  line-height: 5rem;
  a {
    position: relative;
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
  }
`

const Number = styled.span`
  float: right;
  display: inline-block;
  padding-left: 0.33em;
  background: var(--concrete);
`

const ToggleOn = styled.div`
  position: absolute;
  right: -20px;
  top: 0;
  width: 70px;
  height: 100%;
`

const ProjectType = styled.h2`
  text-transform: capitalize;
  margin-bottom: 0.5em;
  font-size: var(--typeSizeL);
  line-height: var(--typeLineL);
`
