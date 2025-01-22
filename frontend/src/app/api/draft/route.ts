import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const drafts = await draftMode()
    drafts.enable()

    return new NextResponse(null, {
      status: 307,
      headers: {
        Location: '/',
      },
    })
  } catch (e) {
    console.log('error starting draft mode')
    return new NextResponse('Not found', { status: 404 })
  }
}
