'use client'

import { styled } from '@linaria/react'
import { RichText, Onionskin } from '@ui'
import Image from 'next/image'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'
import { useScrollLock } from 'usehooks-ts'
import { useEffect } from 'react'

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

  return !content ? null : (
    <>
      <Wrapper className={aboutActive ? 'active' : ''}>
        <Content>
          {poster && (
            <Image
              src={poster.url!}
              width={poster.metadata?.dimensions?.width}
              height={poster.metadata?.dimensions?.height}
              alt={content?.metadata?.title}
            />
          )}
          <div>
            <RichText value={content.copy} />
          </div>
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
  z-index: var(--layer-about);
  bottom: 0;
  right: calc(-1 * 100vw - 20px);
  max-width: calc(100vw - 20px);
  height: calc(100dvh - 20px);
  overflow-y: auto;

  transition: transform 1.25s ease-in-out;
  &.active {
    z-index: var(--layer-popout);
    transform: translateX(calc(-1 * 100vw - 20px));
  }

  @media only screen and (min-width: 1024px) {
    right: -870px;
    max-width: 940px;
    min-height: calc(100dvh - var(--header-height));
    &.active {
      transform: translateX(-870px);
    }
  }

  background: var(--soft-peach);
`

const ToggleOn = styled.div`
  position: absolute;
  left: 0;
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
    padding: 80px var(--header-height);
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
