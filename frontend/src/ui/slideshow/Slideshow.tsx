'use client'

import { styled } from '@linaria/react'
import { useState } from 'react'
import { Slide } from './Slide'

export const Slideshow = ({
  images,
}: Partial<Member<NonNullable<Sanity.PageQueryResult>['projects']>>) => {
  const [active, setActive] = useState(0)
  const shift = (direction: number) => {
    if (!images) return
    let activeSlide = active + direction
    if (activeSlide < 0) activeSlide = images.length - 1
    else if (activeSlide > images.length - 1) activeSlide = 0
    setActive(activeSlide)
  }
  const minAspectRatio =
    images?.reduce((n, image) => {
      const r = image.asset?.metadata?.dimensions?.aspectRatio
      if (!r || r < 1) return n
      if (r < n) return r
      return n
    }, 9999) || 1
  const aspectRatio =
    minAspectRatio < 1 || minAspectRatio === 9999 ? 1 : minAspectRatio
  return !images ? null : (
    <Wrapper style={{ aspectRatio }}>
      {images.map((image, i) => (
        <Slide
          key={image._key}
          className={i === active ? 'active' : ''}
          image={image}
        />
      ))}
      {images.length > 1 && (
        <>
          <Shifter onClick={() => shift(-1)} />
          <Shifter onClick={() => shift(1)} className="right" />
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  position: relative;
  width: 100%;

  grid-area: slideshow;

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
`

const Shifter = styled.button`
  position: absolute;
  z-index: 100;
  left: 0;
  display: block;
  width: 60%;
  height: 100%;
  left: -10%;
  top: 0;
  &.right {
    left: auto;
    right: -10%;
  }
  cursor: pointer;
`
