import { styled } from '@linaria/react'

export const Onionskin = styled.div`
  position: fixed;
  z-index: var(--layer-onionskin);
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  pointer-events: none;
  transition: opacity 1s ease-in-out;
  opacity: 0;
  background: white;
  &.active {
    z-index: var(--layer-popout-onionskin);
    opacity: 0.25;
    pointer-events: all;
  }
`
