import { styled } from '@linaria/react'
import Image from 'next/image'
import { RichText } from '@ui'

export const Project = ({
  metadata,
  images,
  copy,
}: NonNullable<Sanity.ProjectQueryResult>) => {
  return (
    <Wrapper>
      <TitleColumn>
        <div>
          <Title>{metadata?.title}</Title>
          <RichText value={copy} />
        </div>
      </TitleColumn>
      <Description>
        <Image
          src={images[0]?.asset?.url!}
          alt="derp"
          width={images[0]?.asset?.metadata?.dimensions?.width!}
          height={images[0]?.asset?.metadata?.dimensions?.height!}
        />

        <div>
          <Data>
            193cm l x 170cm w x 218cm h<br />
            96cm l x 84cm w x 127cm h catalog
          </Data>
          <P>Tearsheet</P>
          <P>Catalog</P>
        </div>

        {images.map((image, i) =>
          i === 0 ? null : (
            <Image
              key={`image-${i}`}
              src={image.asset?.url!}
              alt="derp"
              width={image.asset?.metadata?.dimensions?.width!}
              height={image.asset?.metadata?.dimensions?.height!}
            />
          ),
        )}
      </Description>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: var(--header-height);
  margin: 0 8vw 100px 8vw;

  @media only screen and (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin: 0 15vw 15vw 15vw;
  }

  p {
    max-width: 500px;
  }
`

const TitleColumn = styled.div`
  position: relative;
  flex: 1;

  > div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    @media only screen and (min-width: 1024px) {
      position: sticky;
      top: var(--header-height);
      text-align: right;
    }
  }
  p {
    font-size: var(--typeSizeM);
    line-height: var(--typeLineM);
  }
`

const Title = styled.h3`
  @media only screen and (min-width: 1024px) {
    margin-bottom: 1em;
  }
  font-size: var(--typeSizeL);
  line-height: var(--typeLineL);
`

const Data = styled.div`
  font-size: var(--typeSizeM);
  line-height: var(--typeLineM);
`

const P = styled.p`
  font-size: var(--typeSizeM);
  line-height: var(--typeLineM);
`

const Description = styled.article`
  flex: 1;
  min-width: 45vw;

  display: flex;
  flex-direction: column;
  gap: 30px;
  p {
    font-size: var(--typeSizeM);
    line-height: var(--typeLineM);
  }
  img {
    width: 100%;
    height: auto;
  }
`
