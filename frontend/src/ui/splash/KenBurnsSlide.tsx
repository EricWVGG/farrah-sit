'use client'

import { styled } from '@linaria/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export const KenBurnsSlide = ({
  image,
  className,
  title,
}: {
  image: Member<
    Pick<
      Member<NonNullable<Sanity.PageQueryResult>['projects']>,
      'images'
    >['images']
  >
  className?: string
  title: string
}) => {
  const [transition, setTransition] = useState('scale-in')

  useEffect(() => {
    const r = Math.random()
    const aspectRatio = image.asset?.metadata?.dimensions?.aspectRatio || 1
    setTransition(
      r < 0.25 && aspectRatio > 1
        ? 'to-right'
        : r < 0.25
        ? 'to-top'
        : r < 0.5 && aspectRatio > 1
        ? 'to-left'
        : r < 0.5
        ? 'to-bottom'
        : r < 0.75
        ? 'scale-out'
        : 'scale-in',
    )
  }, [])

  return !image ? null : (
    <Wrapper className={className}>
      {/*<StyledBlurMask hash={image.asset?.metadata?.blurHash!} />*/}
      <Image
        className={transition}
        src={image.asset?.url!}
        alt={title}
        width={image.asset?.metadata?.dimensions?.width!}
        height={image.asset?.metadata?.dimensions?.height!}
        style={{ aspectRatio: image.asset?.metadata?.dimensions?.aspectRatio }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.li`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    transition: transform 13s ease-in-out;
    transform-origin: center center;
    &.scale-in {
      transform: scale(1.2);
    }
    &.scale-out {
      transform: scale(1);
    }
    &.to-left {
      transform: scale(1.15) translateX(5%);
    }
    &.to-right {
      transform: scale(1.15) translateX(-5%);
    }
    &.to-top {
      transform: scale(1.15) translateY(-5%);
    }
    &.to-bottom {
      transform: scale(1.15) translateY(5%);
    }
  }

  transition: opacity 0.7s ease-in-out;
  opacity: 0;
  &.active {
    opacity: 1;
    img.scale-in {
      transform: scale(1);
    }
    img.scale-out {
      transform: scale(1.2);
    }
    img.to-left {
      transform: scale(1.15) translateX(-5%);
    }
    img.to-right {
      transform: scale(1.15) translateX(5%);
    }
    img.to-top {
      transform: scale(1.15) translateX(5%);
    }
    img.to-bottom {
      transform: scale(1.15) translateX(-5%);
    }
  }
`
