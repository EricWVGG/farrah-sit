'use client'

import { styled } from '@linaria/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'
import { MenuButton } from '@ui'
import Link from 'next/link'

export const Header = () => {
  const [toggleAbout, toggleIndex, navActive, toggleNav] = useLayout(
    useShallow((state) => [
      state.toggleAbout,
      state.toggleIndex,
      state.navActive,
      state.toggleNav,
    ]),
  )
  // todo: siteName click should toggle nav if mobile

  const pathname = usePathname()

  const router = useRouter()

  const aboutOrHome = () => {
    if (pathname === '/') {
      toggleAbout()
    } else {
      router.push('/')
    }
  }

  return (
    <Wrapper>
      <Sitename onClick={aboutOrHome}>Farrah Sit</Sitename>
      <Navigation className={navActive ? 'active' : ''}>
        <ul>
          <li onClick={toggleIndex}>Index</li>
          <li>
            <Link href="/" className={pathname === '/lighting' ? 'active' : ''}>
              Lighting
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={pathname === '/sculpture' ? 'active' : ''}
            >
              Sculpture
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={pathname === '/collaborations' ? 'active' : ''}
            >
              Collaborations
            </Link>
          </li>
          <li onClick={() => toggleAbout()}>About</li>
        </ul>
      </Navigation>
      <MenuButton onClick={toggleNav} active={navActive} />
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

  @media only screen and (min-width: 1024px) {
    justify-content: space-between;
    padding: 0 75px;
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
  @media only screen and (max-width: 1023px) {
    position: fixed;
    z-index: var(--mobile-nav);
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: var(--header-height);

    gap: 30px;

    ul {
      display: contents;
    }

    font-size: var(--typeSizeXL);
    line-height: var(--typeLineXL);

    opacity: 0;
    transition: opacity 1s ease-in-out, backdrop-filter 1.5s ease-in-out;
    background: rgba(255, 255, 255, 0.85);
    pointer-events: none;
    &.active {
      opacity: 1;
      backdrop-filter: blur(15px);
      pointer-events: all;
    }
  }
  @media only screen and (min-width: 1024px) {
    ul {
      display: flex;
      flex-direction: row;
      gap: 2vw;
      li {
        cursor: pointer;
      }
    }
    font-size: var(--typeSizeM);
    line-height: var(--typeLineM);
  }
  text-transform: lowercase;
`
