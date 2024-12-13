'use client'

import { styled } from '@linaria/react'
import { useState } from 'react'
import { Slide } from './Slide'
import { SlideshowDetails } from './SlideshowDetails'

export const Slideshow = ({
  images,
  link,
}: Partial<Member<NonNullable<Sanity.PageQueryResult>['projects']>> & {
  link: string
}) => {
  const [active, setActive] = useState(0)
  const shiftAction = (direction: number) => {
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
    <Wrapper>
      <Slides style={{ aspectRatio }}>
        {images.map((image, i) => (
          <Slide
            key={image._key}
            className={i === active ? 'active' : ''}
            image={image}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {images.length > 1 && (
          <>
            <Shifter onClick={() => shiftAction(-1)} />
            <Shifter onClick={() => shiftAction(1)} className="right" />
          </>
        )}
      </Slides>

      {images.length > 1 && (
        <SlideshowDetails
          {...{ shiftAction, active, link }}
          count={images.length}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.article`
  grid-area: slideshow;
`

const Slides = styled.ul`
  position: relative;
  width: 100%;

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
  width: 50%;
  height: 100%;
  top: 0;
  &.right {
    left: auto;
    right: 0;
  }
  cursor: pointer;
`
