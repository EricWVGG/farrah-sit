import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',

  fields: [
    defineField({
      name: 'metadata',
      type: 'metadata',
    }),

    defineField({
      name: 'copy',
      title: 'Description',
      type: 'richText',
    }),

    defineField({
      name: 'images',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    defineField({
      name: 'tearsheet',
      type: 'file',
    }),
  ],

  preview: {
    select: {
      title: 'metadata.title',
      media: 'metadata.image',
    },
  },
})
