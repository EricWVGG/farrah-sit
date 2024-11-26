import { defineField, defineType } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'navigationLink' }],
    }),
  ],
})
