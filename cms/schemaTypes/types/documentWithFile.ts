import {defineType, defineField} from 'sanity'

export const documentWithFile = defineType({
  name: 'documentWithFile',
  title: 'document',
  type: 'object',

  fields: [
    defineField({
      name: 'label',
      description: '“Tearsheet”, “Case Study”, “Lookbook”, etc.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'document',
      description: 'PDF',
      type: 'file',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const catalogReference = defineType({
  name: 'catalogReference',
  title: 'Catalog',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'label',
      readOnly: true,
    }),
  ],
  initialValue: {
    label: 'This will link to the catalog in Site Settings.',
  },
})
