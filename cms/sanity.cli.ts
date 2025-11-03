import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '1hgdeiss',
    dataset: 'production',
  },
  studioHost: 'farrahsit',
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    appId: 'n8snqd0has40bb77739266d1',
    autoUpdates: true,
  },
})
