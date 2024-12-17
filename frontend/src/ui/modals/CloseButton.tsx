import { styled } from '@linaria/react'
// import { breakpoints } from '@theme'

export const CloseButton = ({
  active,
  ...props
}: Pick<React.HTMLProps<HTMLButtonElement>, 'onClick'> & {
  active: boolean
}) => {
  return (
    <Wrapper {...props} type="button" className={active ? 'active' : ''}>
      <Cross className={active ? 'active' : ''} />
    </Wrapper>
  )
}

const Wrapper = styled.button`
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25px;
  height: 25px;
  border-radius: 50%;

  cursor: pointer;
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
    width: 24px;
    height: 2px;
    transition: transform 0.24s 0s ease;
    transform-origin: center center;
    background-color: var(--tundora);
  }

  &.active {
    &::before {
      transition: transform 0.25s 0.5s ease;
      transform: rotateZ(45deg);
    }

    &::after {
      transition: transform 0.25s 0.5s ease;
      transform: rotateZ(-45deg);
    }
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
