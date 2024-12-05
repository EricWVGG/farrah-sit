import { styled } from '@linaria/react'

export const MenuButton = ({
  active,
  ...rest
}: {
  active?: boolean
  onClick: () => void
}) => (
  <Wrapper {...rest}>
    <Line className={!active ? '' : 'active'} />
    <Line className={!active ? '' : 'active'} />
  </Wrapper>
)

const Wrapper = styled.div`
  position: absolute;
  z-index: var(--mobile-nav-options);
  top: 21px;
  right: 8vw;
  width: 25px;
  height: 25px;
  overflow: hidden;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`

const Line = styled.div`
  position: absolute;
  left: 0;
  background-color: black;
  height: 1.5px;
  width: 100%;
  border-radius: 0 1px 1px 0;
  transform: rotate3d(0, 0, 1, 0deg);
  transition: transform 0.35s ease-in-out, opacity 0.35s ease-in-out;

  &:nth-of-type(1) {
    top: 10px;
    transform-origin: top left;
    transform: translateY(0) rotateZ(0deg);
  }
  &:nth-of-type(2) {
    top: 16px;
    transform-origin: top left;
    transform: translateY(0) rotateZ(0deg);
  }

  &.active {
    &:nth-of-type(1) {
      border-radius: 1px;
      transform: translate3d(4px, -6px, 0) rotateZ(45deg);
    }
    &:nth-of-type(2) {
      border-radius: 1px;
      transform: translate3d(3px, 5.5px, 0) rotateZ(-45deg);
    }
  }
`
