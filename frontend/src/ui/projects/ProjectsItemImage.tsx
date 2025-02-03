'use client'

import { useState } from 'react'
import { styled } from '@linaria/react'
import Image from 'next/image'
import { imageKitLoader, BlurMask } from '@lib'

export const ProjectsItemImage = ({
  image,
}: {
  image: Member<
    Pick<
      Member<NonNullable<Sanity.PageQueryResult>['projects']>,
      'images'
    >['images']
  >
}) => {
  const [loaded, setLoaded] = useState(false)
  return !image?.asset?.url ? null : (
    <Wrapper className={loaded ? 'active' : ''}>
      {image.asset?.metadata?.blurHash && (
        <BlurMask hash={image.asset.metadata.blurHash} />
      )}
      <Image
        src={image.asset.url}
        alt="artwork by Farrah Sit"
        width={image.asset?.metadata?.dimensions?.width!}
        height={image.asset?.metadata?.dimensions?.height!}
        loader={imageKitLoader}
        style={{ aspectRatio: image.asset?.metadata?.dimensions?.aspectRatio }}
        loading="eager"
        onLoad={() => setLoaded(true)}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  position: relative;

  img {
    position: relative;
    z-index: 1;
    object-fit: contain;
  }

  transition: opacity 0.3s ease-in-out;
  canvas {
    transition: opacity 0.1s ease-in-out;
  }
  opacity: 0;
  &.active {
    opacity: 1;
    canvas {
      opacity: 0;
    }
  }
`
