import { styled } from '@linaria/react'
import { forwardRef, type ComponentProps, type ForwardedRef } from 'react'
import { InputWrapper, Label, Message } from './'

const CustomStringControl = (
  { label, className, message, ...props }: InputProps<ComponentProps<'input'>>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <Wrapper className={className}>
      <InputWrapper disabled={props.disabled}>
        <input {...props} ref={ref} name={props.name} />

        <Label htmlFor={props.name}>
          {label}
          {props.required ? ' *' : ''}
        </Label>
      </InputWrapper>
      <Message message={message} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;

  &.focused input {
    border-color: rgba(var(--surface-inv-tertiary)) !important;
  }
`

export const StringControl = forwardRef(CustomStringControl)
