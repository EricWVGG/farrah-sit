import { defineField, defineType } from 'sanity'

export const metadata = defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: any) => doc.metadata.title,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      description: 'Description copy for search engines and social shares.',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning(),
      hidden: ({ document }) => document?._type === 'event',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      title: 'Prevent search engines from indexing this page.',
      initialValue: false,
    }),
  ],
})
