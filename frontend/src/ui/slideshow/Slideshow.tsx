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
  return !images ? null : (
    <Wrapper>
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

const Shifter = styled.div`
  position: absolute;
  z-index: 100;
  left: 0;
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

const Wrapper = styled.ul`
  position: relative;
  width: 100%;
  aspect-ratio: 1.5;

  grid-area: slideshow;

  img {
    height: 100%;
    width: auto;
  }
`
