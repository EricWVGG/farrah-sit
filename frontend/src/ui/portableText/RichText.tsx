import { styled } from '@linaria/react'
import { PortableText } from 'next-sanity'
import { copyRenderers } from './'
import { PortableTextBlock } from '@portabletext/types'

export const RichText = ({
  value,
}: {
  value: PortableTextBlock | Sanity.RichText | null
}) =>
  !value ? null : (
    <TextWrapper>
      <PortableText
        value={value as PortableTextBlock}
        components={copyRenderers}
      />
    </TextWrapper>
  )

const TextWrapper = styled.div`
  display: contents;
  p {
    margin-bottom: 1em;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`
