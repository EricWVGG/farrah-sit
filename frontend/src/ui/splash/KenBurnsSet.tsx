'use client'

import { styled } from '@linaria/react'
import { useState } from 'react'
import { KenBurnsSlide } from './KenBurnsSlide'

export const KenBurnsSet = ({
  images,
}: Partial<Member<NonNullable<Sanity.PageQueryResult>['projects']>>) => {
  const [active, setActive] = useState(0)
  const minAspectRatio =
    images?.reduce((n, image) => {
      const r = image.asset?.metadata?.dimensions?.aspectRatio
      if (!r || r < 1) return n
      if (r < n) return r
      return n
    }, 9999) || 1
  const aspectRatio = minAspectRatio < 1 ? 1 : minAspectRatio
  return !images ? null : (
    <Wrapper style={{ aspectRatio }}>
      {images.map((image, i) => (
        <KenBurnsSlide
          key={image._key}
          className={i === active ? 'active' : ''}
          image={image}
        />
      ))}
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
