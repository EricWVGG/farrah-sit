'use client'

import { styled } from '@linaria/react'
import { RichText } from '@ui'
import Image from 'next/image'
import { useShallow } from 'zustand/react/shallow'
import { useLayout } from '@lib'

export const RightPanel = ({
  content,
}: {
  content: Sanity.PageQueryResult
}) => {
  const [aboutActive, setAboutActive] = useLayout(
    useShallow((state) => [state.aboutActive, state.setAboutActive]),
  )
  const poster = content?.metadata?.poster?.asset

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

const Onionskin = styled.div`
  position: fixed;
  z-index: var(--layer-onionskin);
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  pointer-events: none;
  &.active {
    z-index: var(--layer-popout-onionskin);
    pointer-events: all;
  }
`

const Wrapper = styled.section`
  position: fixed;
  z-index: var(--layer-about);
  top: 120px;
  bottom: 0;
  right: 0;
  max-width: 600px;
  min-height: calc(100dvh - 120px);

  transition: transform 0.25s ease-in-out;
  @media only screen and (min-width: 1000px) {
    max-width: 940px;
    right: -870px;
  }
  &.active {
    z-index: var(--layer-popout);
    transform: translateX(-870px);
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
  padding: 80px;
  img {
    max-width: 100%;
    height: auto;
  }

  @media only screen and (min-width: 1000px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 40px;
    > * {
      flex: 1;
    }
  }

  h1 {
    font-size: var(--typeSizeL);
    line-height: var(--typeLineL);
    margin-top: 1em;
    margin-bottom: 0.5em;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
`
