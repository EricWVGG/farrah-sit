import {
  initializeDeployment,
  checkDeployment,
} from 'sanity-plugin-nextjs-do-deploy/next'

const digitalOceanAppId = process.env.DIGITAL_OCEAN_APP_ID
const digitalOceanToken = process.env.DIGITAL_OCEAN_TOKEN

export const POST = initializeDeployment(digitalOceanToken, digitalOceanAppId)

export const GET = checkDeployment(digitalOceanToken, digitalOceanAppId)
