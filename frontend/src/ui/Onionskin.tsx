import { styled } from '@linaria/react'

export const Onionskin = styled.div`
  position: fixed;
  z-index: var(--layer-onionskin);
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  pointer-events: none;
  transition: backdrop-filter 1s ease-in-out;
  &.active {
    z-index: var(--layer-popout-onionskin);
    backdrop-filter: blur(5px);
    pointer-events: all;
  }
`
