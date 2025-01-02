import { styled } from '@linaria/react'
import Image from 'next/image'
import { imageKitLoader, BlurMask } from '@lib'

export const Slide = ({
  image,
  loading,
  className,
}: {
  image: Member<
    Pick<
      Member<NonNullable<Sanity.PageQueryResult>['projects']>,
      'images'
    >['images']
  >
  loading: 'eager' | 'lazy'
  className?: string
}) => {
  return !image ? null : (
    <Wrapper className={className}>
      {/*image.asset?.metadata?.blurHash && (
        <BlurMask hash={image.asset?.metadata?.blurHash} />
      )*/}
      <Image
        src={image.asset?.url!}
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
  justify-content: flex-start;
  align-items: center;

  background: white;

  img {
    position: relative;
    z-index: 1;
  }

  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  &.active {
    opacity: 1;
  }
`
