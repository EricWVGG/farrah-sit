import { styled } from '@linaria/react'
import Link from 'next/link'
import {
  cloneElement,
  forwardRef,
  memo,
  type ComponentProps,
  type ForwardedRef,
  type ReactElement,
} from 'react'

export type IButton = ComponentProps<'button'> & {
  as?: keyof JSX.IntrinsicElements
  invalid?: boolean
  processing?: boolean
  circle?: boolean
  label?: string | null
  leftIcon?: ReactElement
  icon?: ReactElement
  href?: string
  target?: string
}

export const CustomButton = (
  {
    invalid,
    href,
    label,
    circle,
    leftIcon,
    icon,
    children,
    className,
    target,
    type,
    ...props
  }: IButton,
  forwardRef: ForwardedRef<HTMLButtonElement>,
) => {
  const TheButton = (
    <Wrapper
      as={!!href ? 'button' : 'button'}
      noLabel={!label}
      type={type || 'button'}
      {...props}
      className={`
        ${className}
        ${invalid ? 'invalid' : ''}
        ${circle ? 'circle' : ''}
      `}
      ref={forwardRef}
    >
      {!!leftIcon &&
        cloneElement(leftIcon, {
          level: 3,
        })}
      {label && <Label>{label}</Label>}
      {children}
      {!!icon &&
        cloneElement(icon, {
          level: 3,
        })}
    </Wrapper>
  )

  if (!href) return TheButton

  return href.slice(0, 4) === 'http' ? (
    <ExternalLink href={href} target="_blank" rel="noopener noreferrer">
      {TheButton}
    </ExternalLink>
  ) : (
    <StyledLink href={href} target={target}>
      {TheButton}
    </StyledLink>
  )
}

/* z-index 9999 ensures the before/after effects always sit above other buttons in a row */

const Label = styled.span`
  position: relative;
  display: inline;
  white-space: pre-line;
  transition: opacity 0.15s ease-in-out;
  color: inherit;
`

const ExternalLink = styled.a`
  display: contents;

  &:hover {
    z-index: 2;
  }
`

const StyledLink = styled(Link)`
  display: contents;

  &:hover {
    z-index: 2;
  }
`

const Wrapper = styled.button<{ noLabel: boolean }>`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 48px;
  border: none !important;
  text-transform: uppercase;
  transform: scale3d(1, 1, 1) translateY(0);
  transition: background-color 0.24s linear, box-shadow 0.24s linear,
    color 0.24s linear, transform 0.4s cubic-bezier(0.42, 0.97, 0.52, 1.49);
  will-change: transform;

  cursor: pointer;
  user-select: none;

  /* Before / After */

  &::before,
  &::after {
    z-index: 1;
    display: block;
    position: absolute;
    transform: scale3d(1, 1, 1);
    will-change: transform;
    opacity: 0;
    content: '';
    pointer-events: none;
  }

  &::before {
    width: 100%;
    height: 100%;
    border: 0.5px solid rgb(var(--accent-primary));
    transition: transform 0.24s ease, opacity 0.24s linear;

    @keyframes NormalButton {
      0% {
        opacity: 0;
        transform: scale3d(1, 1, 1);
      }
      50% {
        opacity: 0.32;
      }
      100% {
        opacity: 0;
        transform: scale3d(1.1, 1.4, 1);
      }
    }

    @keyframes CircleButton {
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

    @keyframes TextLinkButton {
      0% {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
      50% {
        opacity: 1;
        transform: scale3d(1.07, 1, 1);
      }
      100% {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    }
  }

  &::after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 0 var(--l5) rgba(var(--accent-primary), 0.08);
    transition: opacity 0.24s linear;
  }

  /* Normal */

  background-color: var(--concrete);
  color: var(--tundora);

  &:hover {
    background-color: var(--soft-peach);
  }

  /* Focus */

  &:focus,
  &:active {
    z-index: 2;
    background-color: rgb(var(--accent-primary));
    box-shadow: var(--surface-light-active-shadow);

    transform: scale3d(1.04, 1.02, 1) translateY(-2px);
    &::after {
      opacity: 1;
    }
  }
`

export const Button = memo(forwardRef(CustomButton))
