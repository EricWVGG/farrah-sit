'use client'

import { styled } from '@linaria/react'
import { useLayout } from '@lib'
import { useShallow } from 'zustand/react/shallow'

export const Onionskin = () => {
  const [setActiveModal, activeModal] = useLayout(
    useShallow((state) => [state.setActiveModal, state.activeModal]),
  )

  return (
    <Wrapper
      onClick={() => setActiveModal(undefined)}
      className={!!activeModal ? 'active' : ''}
    />
  )
}

const Wrapper = styled.div`
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
