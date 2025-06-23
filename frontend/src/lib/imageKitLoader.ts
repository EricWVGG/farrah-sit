interface IImageKitLoader {
  src: string
  width: number
  quality?: number
}

export const cdnUrl = (src: string, withTransforms: boolean = false): URL => {
  const isImage = src.includes('images')
  const sourceURL = isImage
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
    : `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
  const newUrl =
    isImage && withTransforms
      ? `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}/images/__TRANSFORMS__`
      : isImage
      ? `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}/images`
      : `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}/files`
  return new URL(src.replace(sourceURL, newUrl))
}

export const imageKitLoader = ({ src, width, quality }: IImageKitLoader) => {
  let fixedFilename = cdnUrl(src, true) || src

  const seoFilename = fixedFilename.searchParams.get('dl')
  if (!!seoFilename) {
    fixedFilename.searchParams.delete('dl')
    const [filename] = seoFilename.split('.')
    fixedFilename = new URL(`${fixedFilename}/${filename}.webp`)
  }

  const transforms = [`w-${width}`, 'f-webp']
  if (quality) {
    transforms.push(`q-${quality}`)
  }
  return fixedFilename
    .toString()
    .replace('__TRANSFORMS__', `tr:${transforms.join(',')}`)
}

export default imageKitLoader
