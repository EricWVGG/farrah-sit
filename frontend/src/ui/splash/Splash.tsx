'use client'

import { styled } from '@linaria/react'
import { PropsWithChildren } from 'react'
import { KenBurnsSet } from './KenBurnsSet'
import Link from 'next/link'
import { useLayout, useTransit } from '@lib'
import { useShallow } from 'zustand/react/shallow'
import { useTimeout } from 'usehooks-ts'

interface PageProps extends PropsWithChildren {
  page: Sanity.PageQueryResult
  navigation: Sanity.NavigationQueryResult
  className?: string
}

export const Splash = ({ navigation, ...props }: PageProps) => {
  const [transitioning, setTransitioning] = useLayout(
    useShallow((state) => [state.transitioning, state.setTransitioning]),
  )

  useTimeout(() => setTransitioning(false), 500)

  const transit = useTransit()

  return (
    <Wrapper {...props}>
      <TextNav
        style={{ transform: transitioning ? 'translateX(-25vw)' : 'none' }}
      >
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
          className={transitioning ? '' : 'active'}
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
  padding: 60px 30px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);

  @media only screen and (min-width: 501px) {
    top: 0;
    height: 100dvh;
    max-width: calc(100vh + 180px);
    padding: 50px 75px;
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
  }
`
