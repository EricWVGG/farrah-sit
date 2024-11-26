import { styled, type StyledComponent } from '@linaria/react'
import type { PropsWithChildren } from 'react'

export function InjectSpan(S: StyledComponent<any>) {
  return function InjectSpanRender({ children, ...rest }: PropsWithChildren) {
    return (
      <S {...rest}>
        <Label>{children}</Label>
      </S>
    )
  }
}

const Label = styled.span`
  position: relative;
  display: inline;
  white-space: pre-line;
`
