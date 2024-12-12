import type {DocumentActionsContext} from 'sanity'
import {VscEye} from 'react-icons/vsc'

const previewPopAction =
  ({schemaType, documentId}: DocumentActionsContext) =>
  () => ({
    label: 'Preview',
    icon: VscEye,
    onHandle: () => {
      const url = new URL('/api/draft', process.env.SANITY_STUDIO_PREVIEW_URL)
      url.searchParams.set('_id', `drafts.${documentId}`)
      url.searchParams.set('_type', schemaType)
      window.open(url, '_blank')?.focus()
    },
  })

export default previewPopAction
