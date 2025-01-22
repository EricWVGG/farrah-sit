'use client'

import { useLiveQuery } from '@sanity/preview-kit'
import { Project } from '@ui'
import { projectQuery } from '@query'

interface IPreviewProject {
  project: Sanity.ProjectQueryResult
  params: Record<string, string>
}

export const ProjectPreview = ({
  project: initialProject,
  params,
}: IPreviewProject) => {
  const [project, loading] = useLiveQuery(initialProject, projectQuery, params)
  return loading ? <div>Loading…</div> : <Project project={project!} />
}
