import {defineType, defineField} from 'sanity'

export const labelWithRichText = defineType({
  name: 'labelWithRichText',
  title: 'freeformDataItem',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'value',
      type: 'richText',
    }),
  ],
})
