'use client'

import { styled } from '@linaria/react'
import { useState } from 'react'
import { Slide } from './Slide'
import { useInterval } from 'usehooks-ts'
import { useSwipeable } from 'react-swipeable'

export const Slideshow = ({
  images,
}: Partial<Member<NonNullable<Sanity.PageQueryResult>['projects']>>) => {
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

  useInterval(() => shiftAction(1), 5000 + Math.random() * 5000)

  const handlers = useSwipeable({
    onSwipedLeft: () => shiftAction(-1),
    onSwipedRight: () => shiftAction(1),
  })

  return !images ? null : (
    <Wrapper {...handlers}>
      <Slides style={{ aspectRatio }}>
        {images.map((image, i) => (
          <Slide
            key={image._key}
            className={i === active ? 'active' : ''}
            image={image}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </Slides>
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

// const Shifter = styled.button`
//   position: absolute;
//   z-index: 100;
//   left: 0;
//   display: block;
//   width: 50%;
//   height: 100%;
//   top: 0;
//   &.right {
//     left: auto;
//     right: 0;
//   }
//   cursor: pointer;
// `
