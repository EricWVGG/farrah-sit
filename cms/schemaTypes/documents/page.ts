import {defineType, defineField} from 'sanity'

export const page = defineType({
  name: 'page',
  type: 'document',

  fields: [
    defineField({
      name: 'metadata',
      type: 'metadata',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'copy',
      title: 'Content',
      description: 'Optional',
      type: 'richText',
      hidden: ({parent}) => parent.metadata?.slug.current !== 'about',
    }),

    defineField({
      name: 'projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      hidden: ({parent}) => ['home', 'about'].includes(parent.metadata?.slug.current),
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
