export interface PageParameters {
  params: { slug: string }
}

export interface ProjectPageParams {
  projectType: string
  slug?: string
}

export type SlugParams = { slug?: string }

declare global {
  // note: member of array
  type Member<A> = A extends readonly (infer T)[] ? T : never

  type ImageFragment = {
    asset: {
      metadata: {
        lqip: string | null
        blurHash: string | null
        dimensions: Sanity.SanityImageDimensions | null
      } | null
      url: string | null
    } | null
    hotspot?: Sanity.SanityImageHotspot
    crop?: Sanity.SanityImageCrop
    _type: 'image'
    _key: string
  }

  type InputProps<T> = T & {
    label: string
    message?: string
    setValue?: (props: unknown) => void
  }
}

export * from './sanity-groq'
