'use client'

import { styled } from '@linaria/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'
import { MenuButton } from '@ui'
import Link from 'next/link'

export const Header = ({
  navigation,
}: {
  navigation: Sanity.NavigationQueryResult
}) => {
  const [toggleAbout, toggleIndex, indexActive] = useLayout(
    useShallow((state) => [
      state.toggleAbout,
      state.toggleIndex,
      state.indexActive,
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
      <Navigation>
        <ul>
          <li onClick={toggleIndex}>Index</li>
          {navigation?.links?.map((item) => (
            <li key={item._key}>
              <Link
                href={`/${item.destination?.metadata.slug.current}`}
                className={
                  pathname === `/${item.destination?.metadata.slug.current}`
                    ? 'active'
                    : ''
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li onClick={() => toggleAbout()}>About</li>
        </ul>
      </Navigation>
      <MenuButton onClick={toggleIndex} active={indexActive} />
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
  display: none;
  @media only screen and (min-width: 1024px) {
    display: block;
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