'use client'

import { styled } from '@linaria/react'
import { usePathname } from 'next/navigation'
// import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import { useLayout, useTransit } from '@lib'
import { MenuButton } from '@ui'
import Link from 'next/link'

export const Header = ({
  navigation,
}: {
  navigation: Sanity.NavigationQueryResult
}) => {
  const [activeModal, toggle] = useLayout(
    useShallow((state) => [state.activeModal, state.toggle]),
  )

  const transit = useTransit()

  const pathname = usePathname()
  const pathParts = pathname.split('/')

  return (
    <Wrapper className={pathname === '/' ? 'initialized' : 'initialized'}>
      <Link href="/">
        <Sitename>Farrah Sit</Sitename>
      </Link>
      <Navigation
        className={`
          ${pathname === '/' ? 'hidden' : ''}
          ${activeModal === 'NAV' ? 'active' : ''}
        `}
      >
        <ul>
          {navigation?.links?.map((item) => (
            <li key={item._key}>
              <Link
                onClick={transit}
                href={`/${item.destination?.metadata.slug.current}`}
                className={
                  pathParts[1] === item.destination?.metadata.slug.current
                    ? 'active'
                    : ''
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li onClick={() => toggle('ABOUT')}>
            <span className="textButton">About</span>
          </li>
        </ul>
      </Navigation>
      <MenuButton />
    </Wrapper>
  )
}

const Sitename = styled.div`
  position: relative;
  z-index: var(--mobile-nav-options);

  font-size: var(--typeSizeXL);
  line-height: var(--typeLineXL);

  text-transform: uppercase;
  cursor: pointer;
`

const Wrapper = styled.header`
  position: fixed;
  z-index: var(--layer-header);
  left: 0;
  top: 0;
  width: 100%;
  height: var(--header-height);
  padding: 0 8vw;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 744px) {
    justify-content: space-between;
    padding: 0 75px;
    transition: transform 1s ease-in-out;
    transform: translateY(calc(-1 * var(--header-height)));
    &.initialized {
      transform: translateY(0);
    }
  }

  background: white;

  &:after {
    // content: ' ';
    position: absolute;
    z-index: -1;
    left: 0;
    bottom: -50px;
    width: 100%;
    height: 50px;
    background-color: white;
    mask: linear-gradient(black, black, transparent);
    backdrop-filter: blur(4px);
  }
`

const Navigation = styled.nav`
  @media only screen and (max-width: 743px) {
    position: fixed;
    left: 0;
    top: var(--header-height);
    width: 100%;
    height: calc(100dvh - var(--header-height));
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 50px;
      transition: transform 0.5s ease-in-out;
      transform: scale(1.2);
    }

    transition: opacity 0.3s 0.1s ease-in-out;
    opacity: 0;
    pointer-events: none;
    &.active {
      transition: opacity 0.3s ease-in-out;
      opacity: 1;
      pointer-events: all;
      ul {
        transform: scale(1);
      }
    }
  }
  @media only screen and (min-width: 744px) {
    ul {
      display: flex;
      flex-direction: row;
      gap: 3.75vw;
      li {
        cursor: pointer;
      }
    }
    font-size: var(--typeSizeS);
    line-height: var(--typeLineS);
  }
  text-transform: lowercase;

  transition: opacity 1s ease-in-out;
  &.hidden {
    opacity: 0;
  }
`
