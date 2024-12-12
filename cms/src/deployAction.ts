import type {DocumentActionsContext} from 'sanity'
import {VscRocket} from 'react-icons/vsc'

const deployAction = (_: DocumentActionsContext) => () => ({
  label: 'Deploy',
  icon: VscRocket,
  onHandle: async () => {
    await fetch(process.env.SANITY_STUDIO_DEPLOYMENT_HOOK!, {mode: 'no-cors'})
  },
})

export {deployAction, deployActionTemp}
