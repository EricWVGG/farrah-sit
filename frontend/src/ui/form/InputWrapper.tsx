import { styled } from '@linaria/react'

export const InputWrapper = styled.div<{
  disabled?: boolean
}>`
  position: relative;

  textarea,
  select,
  input {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 100%;
    height: 48px;
    padding: 12px 12px 0 12px;

    border: 0px;
    outline: none;
    font-size: var(--typeSizeS);
    line-height: var(--typeLineS);
    background: var(--mercury);
    box-shadow: var(--surface-light-shadow);

    transform: translate3d(0, 0, 0);
    transition: background-color 0.25s linear;
    will-change: transform;
    appearance: none;

    &::placeholder {
      transition: opacity 0.25s linear;
    }

    &:-webkit-contacts-auto-fill-button,
    &:-webkit-credentials-auto-fill-button {
      margin-top: -12px;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  textarea {
    height: auto;
    min-height: 120px;
    padding-top: 23px;
    padding-bottom: 16px;
    padding-left: 12px;
  }

  textarea,
  input {
    &:hover {
    }
    &:focus {
      background: var(--soft-peach);
    }

    &::placeholder {
      opacity: 0;
    }
    &:focus::placeholder {
      opacity: 1;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active,
    &:autofill,
    &:autofill:hover,
    &:autofill:focus,
    &:autofill:active {
      -webkit-background-clip: text;
    }

    &:-webkit-contacts-auto-fill-button {
    }

    &:-moz-selection {
      text-shadow: none;
    }
    &:selection {
      text-shadow: none;
    }
  }
`
