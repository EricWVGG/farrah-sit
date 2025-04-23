'use client'

import { styled } from '@linaria/react'
import { InputWrapper, Button, StringControl, TextControl } from '@ui'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLayout } from '@lib'
import { useShallow } from 'zustand/react/shallow'

type ContactInputs = {
  name: string
  email: string
  subject?: string
  message: string
}

export const Contact = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactInputs>({
    mode: 'onTouched',
  })

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const [subject, setActiveModal] = useLayout(
    useShallow((state) => [state.subject, state.setActiveModal]),
  )

  const onSubmit: SubmitHandler<ContactInputs> = async () => {
    try {
      const referer = location.protocol + '//' + location.host
      const MAILER_ADDRESS = process.env.NEXT_PUBLIC_MAILER_ADDRESS
      const TOKEN = process.env.NEXT_PUBLIC_MAILER_TOKEN
      if (!MAILER_ADDRESS || !TOKEN) throw new Error('Missing mailer address')
      setSending(true)
      await fetch(MAILER_ADDRESS, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${TOKEN}`,
        },
        body: JSON.stringify({
          ...getValues(),
          subject,
          referer,
        }),
      })
      setSent(true)
      setSending(false)
      reset()
    } catch (e) {
      setSending(false)
      console.log(errors)
      console.error('error sending message', e)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={sent ? 'sent' : ''}>
      <Inputs>
        <StringControl
          label="Subject"
          placeholder="ex. Product"
          type="string"
          autoComplete="off"
          {...register('subject')}
          defaultValue={subject}
          message={errors?.subject?.message}
          disabled={sending || sent}
        />
        <StringControl
          label="Name"
          placeholder="ex. Johnny Appleseed"
          autoComplete="name"
          type="string"
          {...register('name', {
            required: { value: true, message: 'Name is required.' },
            minLength: { value: 2, message: 'Minimum length 2 characters.' },
          })}
          message={errors?.name?.message}
          aria-invalid={errors.name ? 'true' : 'false'}
          disabled={sending || sent}
        />
        <StringControl
          label="Email"
          placeholder="ex. johnny@email.com"
          autoComplete="email"
          type="email"
          {...register('email', {
            required: {
              value: true,
              message: 'Valid email address is required.',
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Valid email address is required.',
            },
          })}
          message={errors?.email?.message}
          aria-invalid={errors.email ? 'true' : 'false'}
          disabled={sending || sent}
        />
        <TextControl
          label="Message"
          placeholder="Type your message here."
          {...register('message', {
            required: { value: true, message: 'A message is required.' },
            minLength: {
              value: 10,
              message: 'Minimum length 10 characters.',
            },
          })}
          message={errors?.message?.message}
          aria-invalid={errors.message ? 'true' : 'false'}
          disabled={sending || sent}
        />
      </Inputs>
      <Button
        label={sending ? 'sending…' : sent ? 'message sent' : 'send'}
        invalid={!isValid}
        type="submit"
        disabled={sending || sent}
      />
      <Sent
        className={sent ? 'active' : ''}
        onClick={() => setActiveModal(undefined)}
      />
    </Form>
  )
}

const Form = styled.form`
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100vw;
  max-width: 100%;
  &.sent ${InputWrapper}, &.sent button {
    opacity: 0.2;
  }
  background: var(--alabaster);
  padding: 65px 20px 20px 20px;
  box-shadow: 20px 20px 0 rgb(225, 225, 225);
`

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Sent = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.24s linear;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: all;
  }
`
