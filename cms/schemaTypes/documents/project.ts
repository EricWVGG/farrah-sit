import {defineType, defineField} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'overview', default: true},
    {name: 'description'},
    {name: 'media'},
    {name: 'data'},
  ],

  fields: [
    defineField({
      name: 'metadata',
      type: 'metadata',
      validation: (rule) => rule.required(),
      group: 'overview',
    }),

    defineField({
      name: 'projectType',
      type: 'string',
      options: {
        list: ['lighting', 'objects', 'collaborations'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      group: 'description',
    }),

    defineField({
      name: 'copy',
      title: 'Description',
      type: 'richText',
      validation: (rule) => rule.required(),
      group: 'description',
    }),

    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      validation: (rule) => rule.required(),
      group: 'media',
    }),

    defineField({
      name: 'outline',
      description: 'SVG file outlining the shape of the product.',
      type: 'file',
      group: 'media',
    }),

    defineField({
      name: 'documents',
      type: 'array',
      of: [{type: 'documentWithFile'}, {type: 'catalogReference'}],
      group: 'media',
    }),

    defineField({
      name: 'variants',
      type: 'array',
      of: [{type: 'variant'}],
      group: 'data',
    }),

    defineField({
      name: 'finishes',
      title: 'Materials',
      type: 'array',
      of: [{type: 'string'}],
      group: 'data',
    }),

    defineField({
      name: 'leadTime',
      type: 'string',
      group: 'data',
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
      group: 'data',
    }),

    defineField({
      name: 'notes',
      title: 'notes',
      type: 'richText',
      group: 'overview',
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
