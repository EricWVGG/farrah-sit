'use client'

import { styled } from '@linaria/react'
import { Button, StringControl, TextControl, TypeL } from '@ui'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLayout } from '@lib'
// import { useShallow } from 'zustand/react/shallow'

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
    formState: { errors, isValid },
  } = useForm<ContactInputs>({
    mode: 'onTouched',
  })

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const subject = useLayout((state) => state.subject)

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
    } catch (e) {
      setSending(false)
      console.log(errors)
      console.error('error sending message', e)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TypeL as="h1">Inquiry</TypeL>
      <Inputs>
        <StringControl
          label="Your Name"
          placeholder="ex. Johnny Appleseed"
          autoComplete="name"
          type="string"
          {...register('name', {
            required: { value: true, message: 'Name is required.' },
            minLength: { value: 2, message: 'Minimum length 2 characters.' },
          })}
          message={errors?.name?.message}
          aria-invalid={errors.name ? 'true' : 'false'}
          disabled={sending}
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
          disabled={sending}
        />
        <StringControl
          label="Subject"
          placeholder="ex. Product"
          type="string"
          autoComplete="off"
          {...register('subject')}
          defaultValue={subject}
          message={errors?.subject?.message}
          disabled={sending}
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
          disabled={sending}
        />
      </Inputs>
      <Button
        label="send"
        invalid={!isValid}
        type="submit"
        disabled={sending}
      />
      <Sent className={sent ? 'active' : ''}>
        <Message>
          <Label>Message Sent!</Label>
        </Message>
      </Sent>
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
  background-color: rgb(var(--surface-primary));
  width: 100%;
  height: 100%;
  box-shadow: 0 0 0 2px rgb(var(--surface-primary));
  opacity: 0;
  transition: opacity 0.24s linear;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: all;
  }
`

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--l2);
`

const Label = styled.div`
  text-transform: uppercase;
  text-align: center;
  color: rgb(var(--text-secondary));
  opacity: 0;
  transform: scale3d(0.48, 0.48, 1) translateY(24px);
  transition: opacity 0.4s linear 0.4s, transform 0.6s ease 0.4s;

  ${Sent}.active & {
    opacity: 1;
    transform: translateY(0) scale3d(1, 1, 1);
  }
`
