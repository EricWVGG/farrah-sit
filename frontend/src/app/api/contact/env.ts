export const smtp_user = assertValue(
  process.env.SMTP_USER,
  'Missing environment variable: SMTP_USER',
)

export const smtp_password = assertValue(
  process.env.SMTP_PASSWORD,
  'Missing environment variable: SMTP_PASSWORD',
)

export const smtp_server = assertValue(
  process.env.SMTP_SERVER,
  'Missing environment variable: SMTP_SERVER',
)

export const smtp_port = parseInt(
  assertValue(process.env.SMTP_PORT, 'Missing environment variable: SMTP_PORT'),
)

export const smtp_secure = !!assertValue(
  process.env.SMTP_SECURE,
  'Missing environment variable: SMTP_SECURE',
)

export const recipient = assertValue(
  process.env.CONTACT_EMAIL,
  'Missing environment variable: CONTACT_EMAIL',
)

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
