'use client'

import { styled } from '@linaria/react'
import { usePathname } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'
import Link from 'next/link'

export const Header = () => {
  const [toggleAbout] = useLayout(useShallow((state) => [state.toggleAbout]))
  // todo: siteName click should toggle nav if mobile

  const pathname = usePathname()

  return (
    <Wrapper>
      <Sitename onClick={() => toggleAbout()}>Farrah Sit</Sitename>
      <Navigation>
        <ul>
          <li>
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              New
            </Link>
          </li>
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
          <li className="mobileOnly">About</li>
        </ul>
      </Navigation>
    </Wrapper>
  )
}

const Sitename = styled.div`
  font-size: var(--typeSizeL);
  line-height: var(--typeLineL);
  text-transform: uppercase;
`

const Wrapper = styled.header`
  position: fixed;
  z-index: var(--layer-header);
  left: 0;
  top: 0;
  width: 100%;
  height: 120px;
  padding: 0 15vw;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:after {
    content: ' ';
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    mask: linear-gradient(black, black, transparent);
    backdrop-filter: blur(4px);
  }
`

const Navigation = styled.nav`
  @media only screen and (min-width: 744px) {
    ul {
      display: flex;
      flex-direction: row;
      gap: 2vw;
    }
    li.mobileOnly {
      display: none;
    }
  }

  font-size: var(--typeSizeM);
  line-height: var(--typeLineM);
  text-transform: lowercase;
`
