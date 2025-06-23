export const imageFragment = `
{
  ...,
  asset-> {
    originalFilename,
    metadata {
      lqip,
      blurHash,
      dimensions
    },
    url
  }
}
`

export const fileFragment = `
{
  ...,
  asset-> {
    originalFilename,
    url
  }
}
`
