import { styled } from '@linaria/react'
import Image from 'next/image'
import { imageKitLoader } from '@lib'

export const Slide = ({
  image,
  loading,
  className,
}: {
  image: Pick<
    Member<NonNullable<Sanity.NavigationQueryResult>['links']>,
    'image'
  >['image']

  loading: 'eager' | 'lazy'
  className?: string
}) => {
  return !image ? null : (
    <Wrapper className={className}>
      {/*image.asset?.metadata?.blurHash && (
        <BlurMask hash={image.asset?.metadata?.blurHash} />
      )*/}
      <Image
        src={`${image.asset?.url!}?dl=${image.asset?.originalFilename}`}
        alt="artwork by Farrah Sit"
        width={image.asset?.metadata?.dimensions?.width!}
        height={image.asset?.metadata?.dimensions?.height!}
        loader={imageKitLoader}
        style={{ aspectRatio: image.asset?.metadata?.dimensions?.aspectRatio }}
        loading={loading}
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
  justify-content: center;
  align-items: center;

  background: white;

  img {
    position: relative;
    z-index: 1;
  }

  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  pointer-events: none;
  &.active {
    opacity: 1;
    pointer-events: all;
  }
`
