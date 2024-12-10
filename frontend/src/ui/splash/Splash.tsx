'use client'

import { styled } from '@linaria/react'
import { PropsWithChildren, useEffect, MouseEventHandler } from 'react'
import { KenBurnsSet } from './KenBurnsSet'
import Link from 'next/link'
import { useLayout } from '@lib'
import { useShallow } from 'zustand/react/shallow'
import { useRouter } from 'next/navigation'

interface PageProps extends PropsWithChildren {
  page: Sanity.PageQueryResult
  navigation: Sanity.NavigationQueryResult
  className?: string
}

export const Splash = ({ navigation, ...props }: PageProps) => {
  const [transitioning, setTransitioning] = useLayout(
    useShallow((state) => [state.transitioning, state.setTransitioning]),
  )

  useEffect(() => setTransitioning(false), [])

  const { push } = useRouter()

  const transit: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    const destination = (e.target as HTMLAnchorElement).href
    setTransitioning(true)
    setTimeout(() => push(destination), 1500)
  }

  return (
    <Wrapper {...props}>
      <TextNav className={transitioning ? 'hidden' : ''}>
        <ul>
          {navigation?.links?.map((link) => (
            <li key={link._key}>
              <Link
                onClick={transit}
                href={`/${link.destination?.metadata.slug.current}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </TextNav>
      {navigation?.links?.map((link, i) => (
        <KenBurnsSet
          key={link._key}
          {...link}
          order={i}
          className={transitioning ? 'hidden' : ''}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.main`
  position: fixed;
  z-index: var(--layer-splash);
  left: 0;
  top: var(--header-height);

  width: 100%;
  height: calc(100dvh - var(--header-height));
  gap: 30px;
  padding: 50px 75px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);

  @media only screen and (min-width: 501px) {
    top: 0;
    height: 100dvh;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`

const TextNav = styled.div`
  display: none;
  @media only screen and (min-width: 501px) {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    ul {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    transition: transform 1.45s ease-in-out;
    &.hidden {
      transform: translateX(-25vw);
    }
  }
`
