export interface PageParameters {
  params: { slug: string }
}

export interface ProjectPageParams {
  params: { projectType: string; slug?: string }
}

export type SlugParams = { slug?: string }

export * from './sanity-groq'
