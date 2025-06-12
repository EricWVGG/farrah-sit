'use client'

import { styled } from '@linaria/react'
import { RichText } from '@ui'
import { useLayout, cdnUrl } from '@lib'
import { useShallow } from 'zustand/react/shallow'

export const Specifications = ({
  variants,
  finishes,
  leadTime,
  freeformData,
  notes,
  documents,
  className,
  catalogLink,
}: {
  className?: string
  catalogLink?: string
} & Partial<NonNullable<Sanity.ProjectQueryResult>>) => {
  const setActiveModal = useLayout(useShallow((state) => state.setActiveModal))

  return (
    <Wrapper className={className}>
      <Table>
        <tbody>
          {variants?.length === 1 && (
            <>
              <tr>
                <Label>Dimensions</Label>
                <td>
                  {variants[0].width}&#34; w, {variants[0].height}&#34; h,{' '}
                  {variants[0].depth}&#34; d
                </td>
              </tr>
              <tr>
                <Label>Metric</Label>
                <td>
                  {Math.ceil(variants[0].width! * 2.54)}cm w,{' '}
                  {Math.ceil(variants[0].height! * 2.54)}cm h,{' '}
                  {Math.ceil(variants[0].depth! * 2.54)}cm d
                </td>
              </tr>
            </>
          )}
          {variants && variants.length > 1 && (
            <tr>
              <Label>Dimensions</Label>
              <td>
                <ul>
                  {variants.map((variant, i) => (
                    <li key={`variant-${i}`}>
                      {variant.title}: {variant.width}w {variant.height}h{' '}
                      {variant.depth}d
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          )}

          {finishes && finishes?.length > 0 && (
            <tr>
              <Label>Materials</Label>
              <td>
                <ul>
                  {finishes.map((finish, i) => (
                    <li key={`finish-${i}`}>{finish}</li>
                  ))}
                </ul>
              </td>
            </tr>
          )}

          {leadTime && (
            <tr>
              <Label>Lead Time</Label>
              <td>{leadTime}</td>
            </tr>
          )}

          {freeformData &&
            freeformData.length > 0 &&
            freeformData.map((item, i) =>
              !item.value ? null : (
                <tr key={`freeform-${i}`}>
                  <Label>{item.title}</Label>
                  <td>
                    <RichText value={item.value} />
                  </td>
                </tr>
              ),
            )}
        </tbody>
        <tfoot>
          {notes && (
            <tr>
              <th></th>
              <td>
                <RichText value={notes} />
              </td>
            </tr>
          )}

          {documents?.map((document, i) => (
            <tr key={`document-${i}`}>
              <th></th>
              <td>
                {document._type === 'documentWithFile' ? (
                  <a
                    href={cdnUrl(document.document?.asset?.url!)}
                    target="_blank"
                  >
                    {document.label}
                  </a>
                ) : (
                  <a href={cdnUrl(catalogLink)} target="_blank">
                    Catalog
                  </a>
                )}
              </td>
            </tr>
          ))}

          <tr>
            <th></th>
            <td>
              <span
                className="textButton"
                onClick={() => setActiveModal('CONTACT')}
              >
                Inquire
              </span>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: fixed;
  z-index: var(--layer-specifications);
  top: var(--header-height);
  @media only screen and (min-width: 744px) {
    top: calc(var(--header-height) * 1.25);
  }
  right: 0;
  width: 100%;
  max-width: 500px;
  max-height: calc(100dvh - var(--header-height) * 1.25);
  overflow-y: auto;

  padding: 80px 80px;

  transition: transform 0.35s ease-in-out;
  right: -500px;

  &.active {
    z-index: var(--layer-popout);
    transform: translateX(-540px);
  }

  background: var(--alabaster);
  box-shadow: 20px 20px 0 rgb(225, 225, 225);
`

const Table = styled.table`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto;
  gap: 15px 20px;
  tbody,
  tfoot,
  tr {
    display: contents;
  }
  th,
  td,
  li,
  p {
    font-size: var(--typeSizeS);
    line-height: var(--typeLineS);
  }
`

const Label = styled.th`
  font-weight: normal;
  text-align: right;
`
