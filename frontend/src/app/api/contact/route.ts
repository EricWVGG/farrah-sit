import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import {
  recipient,
  smtp_user,
  smtp_password,
  smtp_server,
  smtp_port,
  smtp_secure,
} from './env'
import type { ContactInputs } from '../../../ui/modals/Contact'

interface SendgridError {
  statusCode?: number
  message?: string
}

function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[],
): body is T {
  return Object.keys(body).every(
    (key) => fields.includes(key) && !!body[key].trim(),
  )
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactInputs = await req.json()
    if (!isValidBody<ContactInputs>(req.body, ['name', 'email', 'message'])) {
      return NextResponse.json({ message: 'Missing input' }, { status: 401 })
    }

    const transporter = nodemailer.createTransport({
      host: smtp_server,
      port: smtp_port,
      secure: smtp_secure,
      auth: {
        user: smtp_user,
        pass: smtp_password,
      },
    })

    const response = await transporter.sendMail({
      from: `"website contact form" <${smtp_user}>`,
      replyTo: `"${body.name}" <${body.email}>`,
      to: recipient,
      subject: 'Contact Form submission',
      text: JSON.stringify(body, null, 2),
      html: `<dl>
        ${Object.keys(body)
          .map(
            (key) =>
              `<dt>${key}</dt><dd>${body[key as keyof ContactInputs]}</dd>`,
          )
          .join()}
        </dl>`,
    })

    return NextResponse.json({ message: response, status: 200 })
  } catch (error) {
    console.log('error', error)
    const knownError = error as SendgridError
    return NextResponse.json({ message: knownError }, { status: 402 })
  }
}
