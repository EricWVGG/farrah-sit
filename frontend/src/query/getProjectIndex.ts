import { defineQuery } from 'groq'
import { fetchFromSanity } from '@lib'

export const projectIndexQuery = defineQuery(`
  *[_type == 'project']{
    _id,
    projectType,
    metadata {
      title,
      description,
      slug {
        current
      }
    }
  }
`)

export const getProjectIndex = async (draftMode?: boolean) =>
  await fetchFromSanity<Sanity.ProjectIndexQueryResult>(projectIndexQuery, {
    draftMode,
  })
