/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type LabelWithRichText = {
  _type: 'labelWithRichText'
  title: string
  value?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
    listItem?: 'bullet' | 'number'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }>
}

export type Variant = {
  _type: 'variant'
  title: string
  width?: number
  height?: number
  depth?: number
}

export type SiteSettings = {
  _id: string
  _type: 'siteSettings'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  description?: string
  keywords?: string
  shareImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
}

export type Navigation = {
  _id: string
  _type: 'navigation'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name: string
  links?: Array<
    {
      _key: string
    } & NavigationLink
  >
}

export type NavigationLink = {
  _type: 'navigationLink'
  label?: string
  linkType?: 'internal' | 'external'
  destination?:
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'page'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'project'
      }
  externalUrl?: string
  images?: Array<{
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
    _key: string
  }>
}

export type Project = {
  _id: string
  _type: 'project'
  _createdAt: string
  _updatedAt: string
  _rev: string
  metadata: Metadata
  projectType: 'lighting' | 'objects' | 'collaborations'
  copy: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
    listItem?: 'bullet' | 'number'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }>
  images: Array<{
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
    _key: string
  }>
  tearsheet?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.fileAsset'
    }
    _type: 'file'
  }
  variants?: Array<
    {
      _key: string
    } & Variant
  >
  finishes?: Array<string>
  leadTime?: string
  freeformData?: Array<
    {
      _key: string
    } & LabelWithRichText
  >
  notes?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
    listItem?: 'bullet' | 'number'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }>
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type Page = {
  _id: string
  _type: 'page'
  _createdAt: string
  _updatedAt: string
  _rev: string
  metadata: Metadata
  copy?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
    listItem?: 'bullet' | 'number'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }>
  projects?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'project'
  }>
}

export type Metadata = {
  _type: 'metadata'
  title: string
  slug: Slug
  description?: string
  poster?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  noIndex?: boolean
}

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type Slug = {
  _type: 'slug'
  current: string
  source?: string
}

export type RichText = Array<{
  children?: Array<{
    marks?: Array<string>
    text?: string
    _type: 'span'
    _key: string
  }>
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
  listItem?: 'bullet' | 'number'
  markDefs?: Array<{
    href?: string
    _type: 'link'
    _key: string
  }>
  level?: number
  _type: 'block'
  _key: string
}>

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | Geopoint
  | LabelWithRichText
  | Variant
  | SiteSettings
  | Navigation
  | NavigationLink
  | Project
  | SanityFileAsset
  | Page
  | Metadata
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | Slug
  | RichText
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ../frontend/src/query/getMetadata.ts
// Variable: metadataQuery
// Query: *[(_type == 'page' || _type == 'project') && metadata.slug.current == $slug][0]{    metadata {      ...,      poster {  ...,  asset-> {    metadata {      lqip,      blurHash,      dimensions    },    url  }}    }  }
export type MetadataQueryResult = {
  metadata: {
    _type: 'metadata'
    title: string
    slug: Slug
    description?: string
    poster: {
      asset: {
        metadata: {
          lqip: string | null
          blurHash: string | null
          dimensions: SanityImageDimensions | null
        } | null
        url: string | null
      } | null
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
    } | null
    noIndex?: boolean
  }
} | null

// Source: ../frontend/src/query/getNavigation.ts
// Variable: navigationQuery
// Query: *[_type == 'navigation' && name == $name][0]{    links[] {      ...,      label,      externalUrl,      destination -> {        metadata {          slug {            current          }        }      },      images[] {  ...,  asset-> {    metadata {      lqip,      blurHash,      dimensions    },    url  }}    }  }
export type NavigationQueryResult = {
  links: Array<{
    _key: string
    _type: 'navigationLink'
    label: string | null
    linkType?: 'external' | 'internal'
    destination: {
      metadata: {
        slug: {
          current: string
        }
      }
    } | null
    externalUrl: string | null
    images: Array<{
      asset: {
        metadata: {
          lqip: string | null
          blurHash: string | null
          dimensions: SanityImageDimensions | null
        } | null
        url: string | null
      } | null
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
      _key: string
    }> | null
  }> | null
} | null

// Source: ../frontend/src/query/getPage.ts
// Variable: pageQuery
// Query: *[_type == 'page' && metadata.slug.current == $slug][0]{    metadata {      ...,      poster {  ...,  asset-> {    metadata {      lqip,      blurHash,      dimensions    },    url  }}    },    copy,    projects[] -> {      _id,      projectType,      images[] {  ...,  asset-> {    metadata {      lqip,      blurHash,      dimensions    },    url  }},      metadata {        title,        description,        slug {          current        }      }    },  }
export type PageQueryResult = {
  metadata: {
    _type: 'metadata'
    title: string
    slug: Slug
    description?: string
    poster: {
      asset: {
        metadata: {
          lqip: string | null
          blurHash: string | null
          dimensions: SanityImageDimensions | null
        } | null
        url: string | null
      } | null
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
    } | null
    noIndex?: boolean
  }
  copy: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal'
    listItem?: 'bullet' | 'number'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }> | null
  projects: Array<{
    _id: string
    projectType: 'collaborations' | 'lighting' | 'objects'
    images: Array<{
      asset: {
        metadata: {
          lqip: string | null
          blurHash: string | null
          dimensions: SanityImageDimensions | null
        } | null
        url: string | null
      } | null
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
      _key: string
    }>
    metadata: {
      title: string
      description: string | null
      slug: {
        current: string
      }
    }
  }> | null
} | null

// Source: ../frontend/src/query/getProject.ts
// Variable: projectQuery
// Query: *[_type == 'project' && metadata.slug.current == $slug][0]{    metadata,    copy,    projectType,    images[] {  ...,  asset-> {    metadata {      lqip,      blurHash,      dimensions    },    url  }},    tearsheet {  ...,  asset-> {    url  }},    variants[],    finishes[],    leadTime,    freeformData[],    notes  }
export type ProjectQueryResult = {
  metadata: Metadata
  copy: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal'
    listItem?: 'bullet' | 'number'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }>
  projectType: 'collaborations' | 'lighting' | 'objects'
  images: Array<{
    asset: {
      metadata: {
        lqip: string | null
        blurHash: string | null
        dimensions: SanityImageDimensions | null
      } | null
      url: string | null
    } | null
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
    _key: string
  }>
  tearsheet: {
    asset: {
      url: string | null
    } | null
    _type: 'file'
  } | null
  variants: Array<
    {
      _key: string
    } & Variant
  > | null
  finishes: Array<string> | null
  leadTime: string | null
  freeformData: Array<
    {
      _key: string
    } & LabelWithRichText
  > | null
  notes: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal'
    listItem?: 'bullet' | 'number'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }> | null
} | null

// Source: ../frontend/src/query/getProjectIndex.ts
// Variable: projectIndexQuery
// Query: *[_type == 'project']{    _id,    projectType,    metadata {      title,      description,      slug {        current      }    }  }
export type ProjectIndexQueryResult = Array<{
  _id: string
  projectType: 'collaborations' | 'lighting' | 'objects'
  metadata: {
    title: string
    description: string | null
    slug: {
      current: string
    }
  }
}>

// Source: ../frontend/src/query/getSiteSettings.ts
// Variable: siteSettingsQuery
// Query: *[_type == 'siteSettings' && title == 'Farrah Sit'][0]{    title,    description,    shareImage {  ...,  asset-> {    metadata {      lqip,      blurHash,      dimensions    },    url  }}  }
export type SiteSettingsQueryResult = {
  title: string | null
  description: string | null
  shareImage: {
    asset: {
      metadata: {
        lqip: string | null
        blurHash: string | null
        dimensions: SanityImageDimensions | null
      } | null
      url: string | null
    } | null
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  } | null
} | null

// Query TypeMap
import '@sanity/client'
declare module '@sanity/client' {
  interface SanityQueries {
    "\n  *[(_type == 'page' || _type == 'project') && metadata.slug.current == $slug][0]{\n    metadata {\n      ...,\n      poster \n{\n  ...,\n  asset-> {\n    metadata {\n      lqip,\n      blurHash,\n      dimensions\n    },\n    url\n  }\n}\n\n    }\n  }\n": MetadataQueryResult
    "\n  *[_type == 'navigation' && name == $name][0]{\n    links[] {\n      ...,\n      label,\n      externalUrl,\n      destination -> {\n        metadata {\n          slug {\n            current\n          }\n        }\n      },\n      images[] \n{\n  ...,\n  asset-> {\n    metadata {\n      lqip,\n      blurHash,\n      dimensions\n    },\n    url\n  }\n}\n\n    }\n  }\n": NavigationQueryResult
    "\n  *[_type == 'page' && metadata.slug.current == $slug][0]{\n    metadata {\n      ...,\n      poster \n{\n  ...,\n  asset-> {\n    metadata {\n      lqip,\n      blurHash,\n      dimensions\n    },\n    url\n  }\n}\n\n    },\n    copy,\n    projects[] -> {\n      _id,\n      projectType,\n      images[] \n{\n  ...,\n  asset-> {\n    metadata {\n      lqip,\n      blurHash,\n      dimensions\n    },\n    url\n  }\n}\n,\n      metadata {\n        title,\n        description,\n        slug {\n          current\n        }\n      }\n    },\n  }\n": PageQueryResult
    "\n  *[_type == 'project' && metadata.slug.current == $slug][0]{\n    metadata,\n    copy,\n    projectType,\n    images[] \n{\n  ...,\n  asset-> {\n    metadata {\n      lqip,\n      blurHash,\n      dimensions\n    },\n    url\n  }\n}\n,\n    tearsheet \n{\n  ...,\n  asset-> {\n    url\n  }\n}\n,\n    variants[],\n    finishes[],\n    leadTime,\n    freeformData[],\n    notes\n  }\n": ProjectQueryResult
    "\n  *[_type == 'project']{\n    _id,\n    projectType,\n    metadata {\n      title,\n      description,\n      slug {\n        current\n      }\n    }\n  }\n": ProjectIndexQueryResult
    "\n  *[_type == 'siteSettings' && title == 'Farrah Sit'][0]{\n    title,\n    description,\n    shareImage \n{\n  ...,\n  asset-> {\n    metadata {\n      lqip,\n      blurHash,\n      dimensions\n    },\n    url\n  }\n}\n\n  }\n": SiteSettingsQueryResult
  }
}
