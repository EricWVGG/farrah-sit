'use client'

import { styled } from '@linaria/react'
import { RichText, Onionskin } from '@ui'
import Image from 'next/image'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'
import { usePathname } from 'next/navigation'

export const AboutPanel = ({
  content,
}: {
  content: Sanity.PageQueryResult
}) => {
  const [activeModal, toggle] = useLayout(
    useShallow((state) => [state.activeModal, state.toggle]),
  )
  const poster = content?.metadata?.poster?.asset

  const pathname = usePathname()

  const active = activeModal === 'ABOUT'

  return !content ? null : (
    <>
      <Wrapper
        className={`
          ${active ? 'active' : ''}
          ${pathname !== '/' ? 'initialized' : ''}
        `}
      >
        <Content>
          <Copy>
            <RichText value={content.copy} />
          </Copy>
          {poster && (
            <Image
              src={poster.url!}
              width={poster.metadata?.dimensions?.width}
              height={poster.metadata?.dimensions?.height}
              alt={content?.metadata?.title}
            />
          )}
        </Content>
        <ToggleOn onClick={() => toggle('ABOUT')} />
      </Wrapper>
      <Onionskin />
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
  overflow-x: clip;
  overflow-y: scroll;

  box-shadow: 20px 20px 0 rgb(225, 225, 225);

  transition: transform 0.35s ease-in-out;
  left: -620px;
  &.initialized {
    transform: translateX(100px);
  }
  &.active {
    z-index: var(--layer-popout);
    transform: translateX(620px);
  }

  @media only screen and (min-width: 744px) {
    max-width: 680px;
    left: -720px;
    &.initialized {
      transform: translateX(40px);
    }
    &.active {
      transform: translateX(720px);
    }
  }
  @media only screen and (min-width: 1024px) {
    max-width: 85vw;
    left: calc(-85vw - 20px);
    &.initialized {
      transform: translateX(90px);
    }
    &.active {
      transform: translateX(calc(85vw + 20px));
    }
  }

  background: var(--soft-peach);
`

const ToggleOn = styled.div`
  position: absolute;
  right: 0px;
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
    padding: 80px 80px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
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

const Copy = styled.div`
  max-width: 500px;
`
