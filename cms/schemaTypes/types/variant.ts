import {defineType, defineField} from 'sanity'

export const variant = defineType({
  name: 'variant',
  title: 'Variant',
  type: 'object',
  initialValue: {
    title: 'standard',
  },

  fieldsets: [
    {
      name: 'dimensions',
      description: 'use inches',
      options: {
        columns: 3,
      },
    },
  ],

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'width',
      type: 'number',
      fieldset: 'dimensions',
    }),

    defineField({
      name: 'height',
      type: 'number',
      fieldset: 'dimensions',
    }),

    defineField({
      name: 'depth',
      type: 'number',
      fieldset: 'dimensions',
    }),
  ],
})
