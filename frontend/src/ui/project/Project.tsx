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
        <Title>{metadata?.title}</Title>
        <Data>
          lg: 76" l x 67" w x 86" h<br />
          193cm l x 170cm w x 218cm h<br />
          sm: 38" l x 33" w x 50" h<br />
          96cm l x 84cm w x 127cm h catalog
        </Data>
        <P>
          <a href="/">Tearsheet</a>
        </P>
        <P>
          <a href="/">Catalog</a>
        </P>
      </TitleColumn>
      <Description>
        <Image
          src={images[0]?.asset?.url!}
          alt="derp"
          width={images[0]?.asset?.metadata?.dimensions?.width!}
          height={images[0]?.asset?.metadata?.dimensions?.height!}
        />

        <div>
          <RichText value={copy} />
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

  padding-top: 120px;
  margin: 0 15vw 15vw 15vw;

  @media only screen and (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  p {
    max-width: 500px;
  }
`

const TitleColumn = styled.div`
  grid-area: title;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;

  text-align: right;
`

const Title = styled.h3`
  position: sticky;
  top: 120px;

  @media only screen and (min-width: 1024px) {
    text-align: right;
    margin-bottom: 1em;
  }
  font-size: var(--typeSizeL);
  line-height: var(--typeLineL);
`

const Data = styled.div`
  font-size: var(--typeSizeS);
  line-height: var(--typeLineS);
`

const P = styled.p`
  font-size: var(--typeSizeM);
  line-height: var(--typeLineM);
`

const Description = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  p {
    font-size: var(--typeSizeM);
    line-height: var(--typeLineM);
  }
  img {
    max-width: 100%;
    height: auto;
  }
`
