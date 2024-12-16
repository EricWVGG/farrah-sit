import { styled } from '@linaria/react'
import {
  forwardRef,
  useId,
  type ComponentProps,
  type ForwardedRef,
} from 'react'
import { InputWrapper, Label, Message } from './'

const CustomTextareaControl = (
  {
    required,
    label,
    className,
    message,
    ...props
  }: InputProps<ComponentProps<'textarea'>>,
  ref: ForwardedRef<HTMLTextAreaElement>,
) => {
  const id = useId()
  return (
    <Wrapper className={className}>
      <TextareaWrapper disabled={props.disabled}>
        <textarea name={id} ref={ref} rows={3} {...props} />

        <StyledLabel htmlFor={id}>
          {label}
          {required ? ' *' : ''}
        </StyledLabel>

        <Message message={message} />
      </TextareaWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`

const StyledLabel = styled(Label)`
  textarea ~ & {
    height: 48px;
  }

  textarea:focus ~ &,
  textarea:not(:placeholder-shown) ~ &,
  textarea:required:valid ~ &,
  &.valid {
    transform: translate3d(0, -11px, 0) scale3d(0.8, 0.8, 1);
  }
`

const TextareaWrapper = styled(InputWrapper)`
  position: relative;
  textarea {
    height: 120px;
  }
`

export const TextControl = forwardRef(CustomTextareaControl)
