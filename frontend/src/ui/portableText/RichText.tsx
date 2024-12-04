import { PortableText } from 'next-sanity'
import { copyRenderers } from './'

export const RichText = ({ value }: { value: any }) => (
  <PortableText value={value} components={copyRenderers} />
)
