'use client'

import { styled } from '@linaria/react'
import Image from 'next/image'
import { RichText } from '@ui'
import { useTimeout } from 'usehooks-ts'
import { useLayout, imageKitLoader, BlurMask, cdnUrl } from '@lib'
import { useShallow } from 'zustand/react/shallow'
import { useEffect, useState, useRef } from 'react'
import { Outline, Specifications } from './'
import { useWindowSize } from 'usehooks-ts'

export const Project = ({
  project,
  catalogLink,
}: {
  project: NonNullable<Sanity.ProjectQueryResult>
  catalogLink?: string
}) => {
  const { metadata, images, copy, documents, outline, ...rest } = project
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
    setSubject(metadata.title)
    setInit(true)
    return () => {
      setSubject(undefined)
      setInit(false)
      setActiveModal(undefined)
    }
  }, [metadata, setActiveModal, setSubject])

  const hasSpecs =
    !!rest.variants ||
    !!rest.finishes ||
    !!rest.leadTime ||
    !!rest.freeformData ||
    !!rest.notes

  const active = activeModal === 'SPECS'

  const { height } = useWindowSize()

  const stickyRef = useRef<HTMLDivElement>(null)
  const sticky =
    !!stickyRef.current &&
    stickyRef.current.getBoundingClientRect().height < height - 120

  return (
    <>
      <Wrapper>
        <TitleColumn className={transitioning ? 'hidden' : ''}>
          <StickyContent ref={stickyRef} className={sticky ? 'sticky' : ''}>
            <Title>{metadata?.title}</Title>
            <RichText value={copy} />
            <Links>
              {hasSpecs && (
                <li className="textButton" onClick={() => toggle('SPECS')}>
                  Specifications
                </li>
              )}
              {documents?.map((document, i) => (
                <li key={`project-document-${i}`}>
                  {document._type === 'documentWithFile' ? (
                    <a
                      href={cdnUrl(
                        `${document.document?.asset?.url!}/${
                          document.document?.asset?.originalFilename
                        }?ik-attachment=true`,
                      ).toString()}
                      download={document.document?.asset?.originalFilename}
                    >
                      {document.label}
                    </a>
                  ) : (
                    <a
                      href={cdnUrl(
                        `${catalogLink}/farrah-sit-catalog.pdf?ik-attachment=true`,
                      ).toString()}
                      download="farrah-sit-catalog.pdf"
                    >
                      Catalog
                    </a>
                  )}
                </li>
              ))}
              <li
                className="textButton"
                onClick={() => setActiveModal('CONTACT')}
              >
                Inquire
              </li>
            </Links>
          </StickyContent>
        </TitleColumn>
        <Images className={transitioning ? 'hidden' : ''}>
          {images.map((image, i) => (
            <ImageWrapper key={`image-${i}`}>
              {image.asset?.metadata?.blurHash && (
                <BlurMask hash={image.asset?.metadata?.blurHash} />
              )}

              <Image
                src={`${image.asset?.url!}?dl=${image.asset?.originalFilename}`}
                alt={`image of ${metadata?.title}`}
                width={image.asset?.metadata?.dimensions?.width!}
                height={image.asset?.metadata?.dimensions?.height!}
                loader={imageKitLoader}
              />
            </ImageWrapper>
          ))}
        </Images>
      </Wrapper>
      {hasSpecs && (
        <Specifications
          {...rest}
          metadata={metadata}
          documents={documents}
          catalogLink={catalogLink}
          className={
            active
              ? 'active'
              : init && !transitioning
              ? 'initialized'
              : undefined
          }
        />
      )}
      {outline && (
        <Outline
          outline={outline}
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

  p {
    font-size: var(--typeSizeS);
    line-height: var(--typeLineS);
    @media only screen and (min-width: 1024px) {
      max-width: 300px;
    }
  }

  transition: opacity 0.3s ease-in-out;
  &.hidden {
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  }
`

const StickyContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media only screen and (min-width: 1024px) {
    top: var(--header-height);
    align-items: flex-start;
    text-align: left;
    &.sticky {
      position: sticky;
    }
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

  transition: transform 0.7s ease-in-out, opacity 0.7s ease-in-out;
  &.hidden {
    transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
    opacity: 0;
    transform: translateY(12.5vh);
  }
`

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  img {
    position: relative;
    z-index: 1;
  }
`

const Links = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media only screen and (min-width: 1024px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  gap: 25px;
  li {
    position: relative;
    font-size: var(--typeSizeS);
    line-height: 1em;
  }
  & .textButton:after {
    opacity: 1;
  }
`
