import { defineType } from 'sanity'
import styled from 'styled-components'

export const richText = defineType({
  name: 'richText',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',

      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
      },
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
    },
  ],
})
