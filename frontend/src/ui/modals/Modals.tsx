'use client'

import { useBuffer, useLayout } from '@lib'
import { styled } from '@linaria/react'
import { useEffect } from 'react'
import { useIsClient, useScrollLock } from 'usehooks-ts'
import { Contact, CloseButton } from './'
import { useShallow } from 'zustand/react/shallow'

export const Modals = () => {
  const [setActiveModal, activeModal] = useLayout(
    useShallow((state) => [state.setActiveModal, state.activeModal]),
  )

  const isClient = useIsClient()
  const { lock, unlock } = useScrollLock({
    autoLock: false,
    lockTarget: isClient ? document.documentElement : undefined,
  })

  useEffect(() => {
    if (!!activeModal) {
      lock()
    } else {
      unlock()
    }
  }, [activeModal, isClient])

  const closeModal = () => {
    setActiveModal(undefined)
  }

  const bufferedActive = useBuffer(activeModal, 1)

  return (
    <Wrapper className={!!bufferedActive ? 'active' : ''}>
      <Modal className={!!activeModal ? 'active' : ''}>
        <Overflow className={bufferedActive} id="project-content">
          <Content>{bufferedActive === 'CONTACT' && <Contact />}</Content>
        </Overflow>
        <ButtonWrapper className={!!activeModal ? 'active' : ''}>
          <CloseButton onClick={() => closeModal()} />
        </ButtonWrapper>
      </Modal>
      <Shroud
        onClick={() => closeModal()}
        className={!!activeModal ? 'active' : ''}
      />
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  position: fixed;
  z-index: var(--layer-modals);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 100vw;
  height: 100%;
  visibility: hidden;
  pointer-events: none;

  &.active {
    visibility: visible;
    pointer-events: all;
  }
`

/*
  @media only screen and (min-width: ${breakpoints.tablet}px) {
  padding: calc(var(--l2) + 12px) calc(var(--l1) * 2);
}

@media only screen and (min-width: ${breakpoints.laptop}px) {
  padding: var(--l1) calc(var(--l1) * 2);
}
*/

export const Shroud = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  transform-origin: center bottom;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 0.85);
  width: 100%;
  height: 100%;
  margin: auto;
  opacity: 0;
  transition: opacity 0.24s linear 0.64s;
  pointer-events: none;

  &.active {
    transition: opacity 0.24s linear 0s;
    opacity: 1;
    pointer-events: all;
  }
`

/* Content */

export const Modal = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  max-height: 100dvh;
  opacity: 0;
  transform: scale3d(0.88, 0.88, 1) translate3d(0, 0, 0);
  transform-origin: center bottom;
  transition: opacity 0.24s linear 0.24s,
    transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.4s;
  will-change: opacity, transform;

  @-moz-document url-prefix() {
    height: fit-content;
  }

  &.active {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    transition: opacity 0.48s linear 0.24s,
      transform 0.48s cubic-bezier(0.25, 1, 0.5, 1) 0.24s;
  }

  @media only screen and (min-width: 744px) {
    padding: 100px calc((100vw - 600px) / 2);
  }
`

/*
  @media only screen and (min-width: ${breakpoints.tablet}px) {
  max-width: 600px;
}

@media only screen and (min-width: ${breakpoints.netbook}px) {
  transform: scale3d(0.64, 0.56, 1) translate3d(0, 0, 0);
  transform-origin: center center;
}

@media only screen and (min-width: ${breakpoints.laptop}px) {
  max-width: 684px;
}

@media only screen and (min-width: ${breakpoints.desktop}px) {
  max-width: 800px;
}
*/

export const Overflow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--l1);
  background-color: rgb(var(--surface-primary));
  width: 100%;
  height: 100dvh;
  padding: calc(var(--l1) * 2) 24px;
  box-shadow: var(--surface-dark-active-shadow);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:increment {
    display: none;
  }
  &::-webkit-scrollbar-button:vertical:start:increment,
  &::-webkit-scrollbar-button:vertical:end:decrement {
    display: none;
  }
  &::-webkit-scrollbar-button:vertical:increment {
    background-color: rgba(var(--surface-inv-primary), 0);
  }
  &::-webkit-scrollbar-button:vertical:decrement {
    background-color: rgba(var(--surface-inv-primary), 0);
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(var(--surface-inv-primary), 0.2);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(var(--surface-inv-primary), 0.6);
  }
  &::-webkit-scrollbar-thumb:window-inactive {
    background-color: rgba(var(--surface-inv-primary), 0.4);
  }
  &::-webkit-scrollbar-button:horizontal:decrement:hover {
    background-color: rgba(var(--surface-inv-primary), 1);
  }

  @media only screen and (min-width: 394px) {
    padding: calc(var(--l1) * 2) 32px;
  }
`

/*
  @media only screen and (min-width: ${breakpoints.tablet}px) {
  height: auto;
  max-height: calc(100dvh - var(--l1));
  padding: var(--l1);
}
*/

export const Content = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--l1);
  width: 100%;
  height: auto;
  margin: auto;
`

export const ButtonWrapper = styled.div`
  position: absolute;
  z-index: var(--modal-close-button);
  display: block;
  top: 24px;
  right: 24px;

  opacity: 0;
  transform: scale3d(0.05, 0.05, 1);
  transition: opacity 0.24s linear,
    transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition-delay: 0s;

  &.active {
    opacity: 1;
    transform: scale3d(1, 1, 1);
    transition-delay: 0.6s;
  }
`

/*

@media only screen and (min-width: ${breakpoints.tablet}px) {
  top: -24px;
  left: auto;
  right: -24px;
  bottom: auto;
}

@media only screen and (min-width: ${breakpoints.laptop}px) {
  top: -28px;
  right: -28px;
}

@media only screen and (min-width: ${breakpoints.desktop}px) {
  top: -32px;
  right: -32px;
}
*/
