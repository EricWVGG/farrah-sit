import {defineType, defineField} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',

  fields: [
    defineField({
      name: 'metadata',
      type: 'metadata',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'projectType',
      type: 'string',
      options: {
        list: ['lighting', 'objects', 'collaborations'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'copy',
      title: 'Description',
      type: 'richText',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'tearsheet',
      type: 'file',
    }),

    defineField({
      name: 'variants',
      type: 'array',
      of: [{type: 'variant'}],
    }),

    defineField({
      name: 'finishes',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'leadTime',
      type: 'string',
    }),

    defineField({
      name: 'freeformData',
      title: 'Misc. Data Items',
      type: 'array',
      of: [
        {
          type: 'labelWithRichText',
        },
      ],
    }),

    defineField({
      name: 'notes',
      title: 'notes',
      type: 'richText',
    }),
  ],

  preview: {
    select: {
      title: 'metadata.title',
      subtitle: 'projectType',
      media: 'metadata.image',
    },
  },
})
