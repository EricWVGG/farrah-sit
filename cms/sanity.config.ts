import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {sanityPluginNextjsDoDeploy} from 'sanity-plugin-nextjs-do-deploy/sanity'

export default defineConfig({
  name: 'default',
  title: 'Farrah Sit',

  projectId: '1hgdeiss',
  dataset: 'production',

  plugins: [
    structureTool(),
    media(),
    visionTool(),
    sanityPluginNextjsDoDeploy({
      estimatedDeploymentDurationMessage: 'Est. 5 minutes',
      apiEndpoint: 'http://localhost:3000/api/deploy',
      debug: true,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
