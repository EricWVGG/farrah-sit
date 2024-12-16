import { styled } from '@linaria/react'
// import { breakpoints } from '@theme'

export const CloseButton = (props: any) => {
  return (
    <CloseLink {...props}>
      <Cross />
    </CloseLink>
  )
}

const CloseLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--tundora);

  width: 48px;
  height: 48px;
  border-radius: 50%;
  transform: scale3d(1, 1, 1) translateZ(0);
  transition: background-color 0.24s linear, color 0.24s linear,
    transform 0.4s cubic-bezier(0.42, 0.97, 0.52, 1.49);

  &::before,
  &::after {
    z-index: 1;
    display: block;
    position: absolute;
    border-radius: 50%;
    transform: scale3d(1, 1, 1);
    will-change: transform;
    opacity: 0;
    content: '';
    pointer-events: none;
  }

  &::before {
    width: 100%;
    height: 100%;
    border: 0.5px solid var(--white);
    transition: background-color 0.24s linear, transform 0.24s ease,
      opacity 0.24s linear;

    @keyframes CloseModalButton {
      0% {
        opacity: 0;
        transform: scale3d(1, 1, 1);
      }
      50% {
        opacity: 0.32;
      }
      100% {
        opacity: 0;
        transform: scale3d(1.6, 1.6, 1);
      }
    }
  }

  &::after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 0 var(--l5) rgba(var(--error-active), 0.08);
    transition: opacity 0.24s linear;
  }

  &:focus,
  &:active {
    background-color: rgb(var(--error-active));
    transform: scale3d(1.08, 1.08, 1);
    &::after {
      opacity: 1;
    }
    & svg {
      color: rgb(var(--icon-inv-primary));
    }
  }
`

/*
  @media only screen and (min-width: ${breakpoints.tablet}px) {
  &:hover {
    background-color: rgb(var(--error-active));
    transform: scale3d(1.08, 1.08, 1);

    &::before {
      animation: CloseModalButton ease 0.6s backwards;
    }

    & svg {
      color: rgb(var(--icon-inv-primary));
    }
  }
}

@media only screen and (min-width: ${breakpoints.netbook}px) {
  box-shadow: var(--surface-dark-active-shadow);
}

@media only screen and (min-width: ${breakpoints.laptop}px) {
  width: 56px;
  height: 56px;
}

@media only screen and (min-width: ${breakpoints.desktop}px) {
  width: 64px;
  height: 64px;
}
*/

const Cross = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;

  &::before,
  &::after {
    content: ' ';
    position: absolute;
    width: 16px;
    height: 3px;
    transition: transform 0.24s ease;
    background-color: var(--white);
  }

  &::before {
    transform: rotateZ(45deg);
  }

  &::after {
    transform: rotateZ(-45deg);
  }
`
/*
  @media only screen and (min-width: ${breakpoints.tablet}px) {
  ${CloseLink}:hover & {
    &::before,
    &::after {
      background-color: rgb(var(--icon-inv-primary));
      transform: rotateZ(0deg);
    }
  }
}

@media only screen and (min-width: ${breakpoints.laptop}px) {
  width: 24px;
  height: 24px;

  &::before,
  &::after {
    width: 20px;
    height: 3px;
  }
}
*/
