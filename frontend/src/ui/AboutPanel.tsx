'use client'

import { styled } from '@linaria/react'
import { RichText, Onionskin } from '@ui'
import Image from 'next/image'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'
import { useScrollLock } from 'usehooks-ts'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const AboutPanel = ({
  content,
}: {
  content: Sanity.PageQueryResult
}) => {
  const [aboutActive, setAboutActive] = useLayout(
    useShallow((state) => [state.aboutActive, state.setAboutActive]),
  )
  const poster = content?.metadata?.poster?.asset

  const { lock, unlock } = useScrollLock({
    autoLock: false,
    lockTarget:
      typeof window !== 'undefined' ? document.documentElement : undefined,
  })

  useEffect(() => {
    if (aboutActive) {
      lock()
    } else {
      unlock()
    }
  }, [aboutActive])

  const pathname = usePathname()

  return !content ? null : (
    <>
      <Wrapper
        className={`
          ${aboutActive ? 'active' : ''}
          ${pathname !== '/' ? 'initialized' : ''}
        `}
      >
        <Content>
          <div>
            <RichText value={content.copy} />
          </div>
          {poster && (
            <Image
              src={poster.url!}
              width={poster.metadata?.dimensions?.width}
              height={poster.metadata?.dimensions?.height}
              alt={content?.metadata?.title}
            />
          )}
        </Content>
        <ToggleOn onClick={() => setAboutActive(!aboutActive)} />
      </Wrapper>
      <Onionskin
        className={aboutActive ? 'active' : ''}
        onClick={() => setAboutActive(false)}
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
  max-width: calc(100vw - 20px);
  overflow-y: auto;

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

  @media only screen and (min-width: 1024px) {
    max-width: 940px;
    left: -940px;
    &.initialized {
      transform: translateX(70px);
    }
    &.active {
      transform: translateX(940px);
    }
  }

  background: var(--soft-peach);
`

const ToggleOn = styled.div`
  position: absolute;
  right: -20px;
  top: 0;
  width: 70px;
  height: 100%;
`

const Content = styled.article`
  padding: 40px;
  img {
    max-width: 100%;
    margin-bottom: 1em;
    height: auto;
  }

  @media only screen and (min-width: 1024px) {
    padding: 80px 120px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 80px;
    > * {
      flex: 1;
    }
    img {
      max-width: 300px;
    }
  }

  h1 {
    font-size: var(--typeSizeL);
    line-height: var(--typeLineL);
    margin-top: 3em;
    margin-bottom: 0.5em;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
`
