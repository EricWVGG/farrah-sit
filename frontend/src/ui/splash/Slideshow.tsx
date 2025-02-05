'use client'

import { styled } from '@linaria/react'
import { Slide } from './Slide'
import { useInterval } from 'usehooks-ts'
import { useTransit, useIncrement } from '@lib'
import Link from 'next/link'

export const Slideshow = ({
  navigation,
  className,
}: {
  navigation: Sanity.NavigationQueryResult
  className?: string
}) => {
  const imageCount = navigation?.links?.length || 0
  const [active, inc] = useIncrement(0, imageCount)

  useInterval(() => inc(), 3000)

  const minAspectRatio =
    navigation?.links?.reduce((n, link) => {
      const r = link.image?.asset?.metadata?.dimensions?.aspectRatio
      if (!r || r < 1) return n
      if (r < n) return r
      return n
    }, 9999) || 1
  const aspectRatio =
    minAspectRatio < 1 || minAspectRatio === 9999 ? 1 : minAspectRatio

  const transit = useTransit()

  return !navigation?.links ? null : (
    <Wrapper className={className}>
      <Slides style={{ aspectRatio }}>
        {navigation?.links.map((link, i) =>
          !link.image ? null : !link.destination ? (
            <Slide
              key={link._key}
              className={i === active ? 'active' : ''}
              image={link.image}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ) : (
            <Link
              key={link._key}
              href={link.destination?.metadata.slug.current!}
              onClick={transit}
            >
              <Slide
                className={i === active ? 'active' : ''}
                image={link.image}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </Link>
          ),
        )}
      </Slides>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: contents;
`

const Slides = styled.ul`
  position: relative;
  width: 100%;
  max-width: calc(100vw - 40px);
  @media only screen and (min-width: 744px) {
    max-width: 60vw;
    max-heignt: 80vh;
  }

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  a {
    pointer-events: all;
    display: contents;
    &:after {
      display: none;
    }
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
