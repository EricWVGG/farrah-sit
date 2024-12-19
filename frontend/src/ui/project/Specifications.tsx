'use client'

import { styled } from '@linaria/react'
import { RichText } from '@ui'
import { useLayout } from '@lib'
import { useShallow } from 'zustand/react/shallow'

export const Specifications = ({
  variants,
  finishes,
  leadTime,
  freeformData,
  notes,
  tearsheet,
  className,
}: { className?: string } & Partial<
  NonNullable<Sanity.ProjectQueryResult>
>) => {
  const setActiveModal = useLayout(useShallow((state) => state.setActiveModal))

  return (
    <Wrapper className={className}>
      <Header>Specifications</Header>
      <Table>
        <tbody>
          {variants?.length === 1 && (
            <tr>
              <Label>Dimensions</Label>
              <td>
                {variants[0].width}w {variants[0].height}h {variants[0].depth}d
              </td>
            </tr>
          )}
          {variants && variants.length > 1 && (
            <tr>
              <Label>Dimensions</Label>
              <td>
                <ul>
                  {variants.map((variant) => (
                    <li key={variant._key}>
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
              <Label>Finishes</Label>
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
            freeformData.map((item) =>
              !item.value ? null : (
                <tr key={item._key}>
                  <Label>{item.title}</Label>
                  <td>
                    <RichText value={item.value} />
                  </td>
                </tr>
              ),
            )}
        </tbody>
      </Table>

      {notes && <RichText value={notes} />}

      {tearsheet?.asset?.url && (
        <BottomLink>
          <a href={tearsheet.asset.url}>Download Tearsheet</a>
        </BottomLink>
      )}

      <BottomLink className="textButton">
        <span onClick={() => setActiveModal('CONTACT')}>
          Inquire for more information
        </span>
      </BottomLink>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: fixed;
  z-index: var(--layer-specifications);
  top: calc(var(--header-height) * 1.25);
  right: 0;
  width: 100%;
  max-width: 400px;
  overflow-y: auto;

  padding: 80px 80px;

  transition: transform 1.25s ease-in-out;
  right: -400px;

  &.initialized {
    transform: translateX(-40px);
    @media only screen and (min-width: 1024px) {
      transform: translateX(-40px);
    }
  }
  &.active {
    z-index: var(--layer-popout);
    transform: translateX(-440px);
  }

  background: var(--alabaster);
  box-shadow: 20px 20px 0 rgb(225, 225, 225);
`

const Header = styled.h2`
  font-size: var(--typeSizeXL);
  line-height: var(--typeLineXL);
  margin-bottom: 1em;
`

const Table = styled.table`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto;
  gap: 10px 20px;
  tbody,
  tr {
    display: contents;
  }
`

const Label = styled.th`
  font-weight: normal;
  text-align: right;
`

const BottomLink = styled.p`
  margin-top: 2em;
`
