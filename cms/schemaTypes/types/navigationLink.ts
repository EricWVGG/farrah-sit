import {defineType, defineField} from 'sanity'

export const navigationLink = defineType({
  name: 'navigationLink',
  title: 'NavigationLink',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Optional if internal reference',
    }),

    defineField({
      name: 'linkType',
      type: 'string',
      options: {
        list: [
          {
            title: 'Within this site',
            value: 'internal',
          },
          {
            title: 'External link',
            value: 'external',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),

    defineField({
      name: 'destination',
      type: 'reference',
      to: [{type: 'page'}, {type: 'project'}],
      // validation: (Rule) => Rule.required(),
      hidden: ({parent}) => !!parent?.linkType && parent.linkType === 'external',
    }),

    defineField({
      name: 'externalUrl',
      title: 'URL',
      type: 'string',
      hidden: ({parent}) => !!parent?.linkType && parent.linkType !== 'external',
    }),

    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      hidden: ({document}) => document?.name !== 'Splash',
    }),
  ],
})
