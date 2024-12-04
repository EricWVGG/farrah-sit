'use client'

import { styled } from '@linaria/react'
import { RichText } from '@ui'
import Image from 'next/image'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'
import Link from 'next/link'

type SortedProjects = Record<
  'lighting' | 'sculpture' | 'collaboration',
  Sanity.ProjectIndexQueryResult
>

export const ProjectIndex = ({
  sortedProjects,
}: {
  sortedProjects: SortedProjects
}) => {
  const [navActive, setNavActive] = useLayout(
    useShallow((state) => [state.navActive, state.setNavActive]),
  )

  return !sortedProjects ? null : (
    <>
      <Wrapper className={navActive ? 'active' : ''}>
        <List>
          {Object.keys(sortedProjects).map((projectType, i) => (
            <li key={`project-type-${i}`}>
              <ProjectType>{projectType}</ProjectType>
              <ul>
                {sortedProjects[projectType as keyof SortedProjects]
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
        <ToggleOn onClick={() => setNavActive(!navActive)} />
      </Wrapper>
      <Onionskin
        className={navActive ? 'active' : ''}
        onClick={() => setNavActive(false)}
      />
    </>
  )
}

const Onionskin = styled.div`
  position: fixed;
  z-index: var(--layer-onionskin);
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  pointer-events: none;
  &.active {
    z-index: var(--layer-popout-onionskin);
    pointer-events: all;
  }
`

const Wrapper = styled.section`
  position: fixed;
  z-index: var(--layer-project-index);
  top: 120px;
  left: 0;
  min-height: calc(100dvh - 120px);
  width: 100%;
  max-width: 580px;

  padding: 80px 80px;
  box-shadow: 20px 20px 0 rgb(225, 225, 225);

  transition: transform 1.25s ease-in-out;
  left: -500px;
  &.active {
    z-index: var(--layer-popout);
    transform: translateX(500px);
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
