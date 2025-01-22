import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { documentPrimitivesToPath } from './documentPrimitivesToPath'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const _type = searchParams.get('_type') as 'page' | 'project'
  const _id = searchParams.get('_id')

  if (!_type || !_id) return new NextResponse('Invalid params', { status: 400 })

  try {
    const drafts = await draftMode()
    drafts.enable()

    if (!['page', 'project'].includes(_type)) return
    const path = await documentPrimitivesToPath({ _id, _type })

    return new NextResponse(null, {
      status: 307,
      headers: {
        Location: path.toString(),
      },
    })
  } catch (e) {
    console.log('error starting draft mode')
    return new NextResponse('Not found', { status: 404 })
  }
}
