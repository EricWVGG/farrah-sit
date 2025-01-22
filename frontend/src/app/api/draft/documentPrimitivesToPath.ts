import { getAllContentIndex } from '@query'

export const documentPrimitivesToPath = async ({
  _id,
  _type,
}: {
  _id: string
  _type: 'page' | 'project'
}) => {
  const allContent = await getAllContentIndex()

  const document = allContent.find(
    (item) => item._id === _id.replace('drafts.', '') && item._type === _type,
  ) // todo: ^ this is clunky

  if (!document) throw new Error('Document not found')

  const path =
    document._type === 'project'
      ? `/${document.projectType}/${document.metadata?.slug?.current}/preview`
      : `/${document.metadata?.slug?.current}/preview`

  return new URL(path, process.env.NEXT_PUBLIC_URL)
}
