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
  ],

  preview: {
    select: {
      title: 'metadata.title',
      subtitle: 'projectType',
      media: 'metadata.image',
    },
  },
})
