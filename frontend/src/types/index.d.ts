export interface PageParameters {
  params: { slug: string }
}

export interface ProjectPageParams {
  params: { projectType: string; slug?: string }
}

export type SlugParams = { slug?: string }

// note: member of array
declare global {
  type Member<A> = A extends readonly (infer T)[] ? T : never
}

export * from './sanity-groq'
