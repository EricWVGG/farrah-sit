'use client'

import { styled } from '@linaria/react'
import { useState } from 'react'
import { Slide } from './Slide'
import Link from 'next/link'
import { useTransit } from '@lib'

export const Slideshow = ({
  images,
  link,
}: Partial<Member<NonNullable<Sanity.PageQueryResult>['projects']>> & {
  link: string
}) => {
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

  const transit = useTransit()

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
            <Shifter onClick={() => shift(-1)} />
            <Shifter onClick={() => shift(1)} className="right" />
          </>
        )}
      </Slides>
      <Dataline>
        <div>
          <Increment onClick={() => shift(-1)}>&lt; &lt;</Increment>
          <Counter>
            <span>{active + 1}</span> of <span>{images.length}</span>
          </Counter>
          <Increment onClick={() => shift(1)}>&gt; &gt;</Increment>
        </div>

        <Link onClick={transit} href={link}>
          Details
        </Link>
      </Dataline>
    </Wrapper>
  )
}

const Dataline = styled.div`
  display: flex;
  gap: 30px;

  margin-top: 0.5em;
  div {
    display: flex;
    gap: 5px;
  }

  font-size: var(--typeSizeS);
  line-height: var(--typeLineS);

  a {
    color: var(--tundora);
    &:hover:after {
      opacity: 0;
    }
  }
`

const Counter = styled.div`
  span {
    display: inline-block;
    width: 10px;
    text-align: center;
  }
`

const Increment = styled.button`
  appearance: none;
  cursor: pointer;
`

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
