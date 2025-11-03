import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import previewPopAction from './src/previewPopAction'
import {deployAction} from './src/deployAction'
import {media} from 'sanity-plugin-media'

const singletonTypes = ['site']

export default defineConfig({
  name: 'default',
  title: 'Farrah Sit',

  projectId: '1hgdeiss',
  dataset: 'production',

  plugins: [structureTool(), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (input, context) => {
      const inputs = ['page', 'project'].includes(context.schemaType)
        ? [...input, previewPopAction(context)]
        : singletonTypes.includes(context.schemaType)
        ? input.filter(
            ({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : input

      if (process.env.SANITY_STUDIO_DEPLOYMENT_HOOK) {
        inputs.push(deployAction(context))
      }

      return inputs
    },
  },
})
