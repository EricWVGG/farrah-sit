'use client'

import { styled } from '@linaria/react'
import Image from 'next/image'
import { RichText } from '@ui'
import { useTimeout } from 'usehooks-ts'
import { useLayout } from '@lib'
import { useShallow } from 'zustand/react/shallow'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Specifications } from './'

export const Project = ({
  metadata,
  images,
  copy,
  tearsheet,
  ...rest
}: NonNullable<Sanity.ProjectQueryResult>) => {
  const [
    transitioning,
    setTransitioning,
    setActiveModal,
    setSubject,
    specsActive,
    setSpecsActive,
  ] = useLayout(
    useShallow((state) => [
      state.transitioning,
      state.setTransitioning,
      state.setActiveModal,
      state.setSubject,
      state.specsActive,
      state.setSpecsActive,
    ]),
  )

  useTimeout(() => setTransitioning(false), 500)

  const [init, setInit] = useState(false)

  useEffect(() => {
    setSubject(`website inquiry: ${metadata.title}`)
    setInit(true)
    return () => {
      setSubject(undefined)
      setInit(false)
      setSpecsActive(false)
    }
  }, [])

  const hasSpecs =
    !!rest.variants ||
    !!rest.finishes ||
    !!rest.leadTime ||
    !!rest.freeformData ||
    !!rest.notes

  return (
    <>
      <Wrapper>
        <TitleColumn className={transitioning ? 'hidden' : ''}>
          <div>
            <Title>{metadata?.title}</Title>
            <RichText value={copy} />
            <Links>
              {hasSpecs && (
                <li
                  className="textButton"
                  onClick={() => setSpecsActive(!specsActive)}
                >
                  Specifications
                </li>
              )}
              {tearsheet?.asset && (
                <li>
                  <Link href={tearsheet.asset.url!} target="_blank">
                    Tearsheet
                  </Link>
                </li>
              )}
              <li
                className="textButton"
                onClick={() => setActiveModal('CONTACT')}
              >
                Inquire
              </li>
            </Links>
          </div>
        </TitleColumn>
        <Images className={transitioning ? 'hidden' : ''}>
          {images.map((image, i) => (
            <Image
              key={`image-${i}`}
              src={image.asset?.url!}
              alt="derp"
              width={image.asset?.metadata?.dimensions?.width!}
              height={image.asset?.metadata?.dimensions?.height!}
            />
          ))}
        </Images>
      </Wrapper>
      {hasSpecs && (
        <Specifications
          {...rest}
          metadata={metadata}
          tearsheet={tearsheet}
          className={
            specsActive
              ? 'active'
              : init && !transitioning
              ? 'initialized'
              : undefined
          }
        />
      )}
    </>
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

  transition: transform 1.45s ease-in-out, opacity 1.4s ease-in-out;
  &.hidden {
    transition: transform 0.5s ease-in-out, opacity 0.45s ease-in-out;
    opacity: 0;
    transform: translateX(-25vw);
  }
`

const Title = styled.h1`
  @media only screen and (min-width: 1024px) {
    margin-bottom: 1em;
  }
  font-size: var(--typeSizeL);
  line-height: var(--typeLineL);
`

const Images = styled.article`
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

  transition: transform 1.45s ease-in-out, opacity 1.4s ease-in-out;
  &.hidden {
    transition: transform 0.5s ease-in-out, opacity 0.45s ease-in-out;
    opacity: 0;
    transform: translateY(25vh);
  }
`

const Links = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
  li {
    position: relative;
    font-size: var(--typeSizeS);
    line-height: var(--typeLineS);
  }
`
