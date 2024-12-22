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
    activeModal,
    setActiveModal,
    setSubject,
    toggle,
  ] = useLayout(
    useShallow((state) => [
      state.transitioning,
      state.setTransitioning,
      state.activeModal,
      state.setActiveModal,
      state.setSubject,
      state.toggle,
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
      setActiveModal(undefined)
    }
  }, [])

  const hasSpecs =
    !!rest.variants ||
    !!rest.finishes ||
    !!rest.leadTime ||
    !!rest.freeformData ||
    !!rest.notes

  const active = activeModal === 'SPECS'

  return (
    <>
      <Wrapper>
        <TitleColumn className={transitioning ? 'hidden' : ''}>
          <div>
            <Title>{metadata?.title}</Title>
            <RichText value={copy} />
            <Links>
              {hasSpecs && (
                <li className="textButton" onClick={() => toggle('SPECS')}>
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
            active
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
      align-items: flex-end;
      text-align: right;
    }
  }
  p {
    font-size: var(--typeSizeS);
    line-height: var(--typeLineS);
    @media only screen and (min-width: 1024px) {
      max-width: 300px;
    }
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
    font-size: var(--typeSizeS);
    line-height: var(--typeLineS);
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
  flex-direction: column;
  align-items: flex-start;
  @media only screen and (min-width: 1024px) {
    justify-content: flex-end;
    align-items: flex-end;
  }
  gap: 10px;
  li {
    position: relative;
    font-size: var(--typeSizeXS);
    line-height: var(--typeLineXS);
  }
`
