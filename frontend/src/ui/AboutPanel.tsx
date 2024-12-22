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
  const [activeModal, setActiveModal] = useLayout(
    useShallow((state) => [state.activeModal, state.setActiveModal]),
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
        <ToggleOn onClick={() => setActiveModal('ABOUT')} />
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

  transition: transform 1.25s ease-in-out;
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
    max-width: 940px;
    left: -960px;
    &.initialized {
      transform: translateX(90px);
    }
    &.active {
      transform: translateX(960px);
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
