'use client'

import { styled } from '@linaria/react'
import { KenBurnsSlide } from './KenBurnsSlide'
import { useIncrement } from '@lib'
import { useInterval } from 'usehooks-ts'
import Link from 'next/link'

export const KenBurnsSet = ({
  images,
  destination,
  label,
  order,
  className,
}: Partial<Member<NonNullable<Sanity.NavigationQueryResult>['links']>> & {
  order: number
  className?: string
}) => {
  const [active, inc] = useIncrement(0, images?.length)

  useInterval(() => inc(), Math.random() * 7000 + 10000)

  return !images ? null : (
    <>
      <TextLink
        href={`/${destination?.metadata.slug.current}`}
        style={{
          order: order % 2 === 0 ? order - 1 : order,
          alignItems: order % 2 === 0 ? 'flex-end' : 'flex-start',
        }}
      >
        {label}
      </TextLink>

      <Wrapper
        className={className}
        order={order}
        style={{
          order: order % 2 === 0 ? order : order - 1,
        }}
      >
        {images.map((image, i) => (
          <KenBurnsSlide
            key={image._key}
            className={i === active ? 'active' : ''}
            image={image}
            title="image"
          />
        ))}
      </Wrapper>
    </>
  )
}

const TextLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: 501px) {
    display: none;
  }
`

const Wrapper = styled.ul<{ order: number }>`
  position: relative;
  width: 100%;
  overflow: hidden;

  transition: transform 1.2s ease-in-out;
  &.hidden {
    transform: ${(props) =>
      props.order === 0
        ? 'translateY(-50vh)'
        : props.order === 1
        ? 'translateX(-50vw)'
        : 'translateY(50vh)'};
  }

  &:after {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.16) 100%
    );
  }
`