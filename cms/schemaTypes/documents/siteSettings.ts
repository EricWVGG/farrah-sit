import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site settings',
  groups: [{name: 'overview', default: true}, {name: 'content'}],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Name',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'shareImage',
      title: 'Default Social Share Image',
      type: 'image',
      group: 'overview',
      description: '1600x900 pixels',
    }),

    defineField({
      name: 'catalog',
      type: 'file',
      group: 'overview',
    }),
  ],
})
