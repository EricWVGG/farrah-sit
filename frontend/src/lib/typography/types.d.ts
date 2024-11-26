type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

export type TypeDictionary = Record<string, TypeDefinitionParameters>

type SizeSet = {
  size: number
  line: number
  letterSpacing?: number
}

export type TypeDefinitionParameters = {
  name: string
  typeface: string
  backupTypefaces: string
  cropFontSize: number
  cropLineHeight: number
  topCrop: number
  bottomCrop: number

  defaultWeight: number
  xl: SizeSet
  l: SizeSet
  m: SizeSet
}

export interface CropProps {
  topCrop: number
  bottomCrop: number
  cropFontSize: number
  cropLineHeight: number
}

export type TypographyOptions = {
  weight?: number
  italic?: boolean
  crop?: boolean
  lineHeight?: number
  align?: 'left' | 'right' | 'center'
}
