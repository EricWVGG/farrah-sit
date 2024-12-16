import { styled } from '@linaria/react'
import { type PropsWithChildren } from 'react'

export const Label = ({
  children,
  ...rest
}: PropsWithChildren & { htmlFor?: string; className?: string }) => (
  <LabelStyle {...rest}>{children}</LabelStyle>
)

const LabelStyle = styled.label`
  position: absolute;
  top: 0;
  left: 12px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5px 0;
  overflow: hidden;
  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  transform-origin: center left;
  transition: color 0.25s linear, transform 0.4s ease-in-out;
  will-change: transform;
  pointer-events: none;
  white-space: nowrap;
  text-overflow: ellipsis;

  select ~ &,
  input:focus ~ &,
  input:not(:placeholder-shown) ~ &,
  input:required:valid ~ &,
  select:focus ~ &,
  select:not(:placeholder-shown) ~ &,
  select:required:valid ~ &,
  textarea:focus ~ &,
  textarea:not(:placeholder-shown) ~ &,
  textarea:required:valid ~ &,
  &.valid {
    transform: translate3d(0, -9px, 0) scale3d(0.8, 0.8, 1);
  }
`
