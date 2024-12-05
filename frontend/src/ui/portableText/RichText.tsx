import { PortableText } from 'next-sanity'
import { copyRenderers } from './'
import { PortableTextBlock } from '@portabletext/types'

export const RichText = ({
  value,
}: {
  value: PortableTextBlock | Sanity.RichText | null
}) =>
  !value ? null : (
    <PortableText
      value={value as PortableTextBlock}
      components={copyRenderers}
    />
  )
