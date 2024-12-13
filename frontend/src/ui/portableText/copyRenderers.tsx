import { TypeXL, TypeL, TypeM, TypeS } from './Text'
import { styled } from '@linaria/react'
import type { PropsWithChildren } from 'react'
import Link from 'next/link'

interface ICopyRenderers {
  text: string
  className?: string
  value?: { href: string }
}

export const copyRenderers = {
  block: {
    xLarge: (props: PropsWithChildren) => <TypeXL {...props} />,
    large: (props: PropsWithChildren) => <TypeL {...props} />,
    normal: (props: PropsWithChildren) => <TypeM {...props} as="p" />,
    small: (props: PropsWithChildren) => <TypeS {...props} />,
    // blockquote: (props: PropsWithChildren) => <Blockquote {...props} />,
  },
  marks: {
    em: (props: PropsWithChildren) => <Italic {...props} />,
    link: ({ text, value, className }: ICopyRenderers) =>
      value?.href.substring(0, 1) === '/' ? (
        <CopyLink href={value?.href} className={className}>
          {text}
        </CopyLink>
      ) : (
        <a
          target="_blank"
          rel="noreferrer"
          href={value?.href}
          className={className}
        >
          {text}
        </a>
      ),
  },
}

const CopyLink = (props: any) => {
  return <Link {...props} />
}

const Italic = styled.em`
  font-style: italic;
`
