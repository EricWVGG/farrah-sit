import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  type: 'document',

  fields: [
    defineField({
      name: 'metadata',
      type: 'metadata',
    }),

    defineField({
      name: 'projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
  ],

  preview: {
    select: {
      title: 'metadata.title',
      subtitle: 'publishDate',
      media: 'metadata.image',
    },
  },
})
