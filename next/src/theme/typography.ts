import { type TypeDictionary } from '@/lib/typography/types'

// ref: http://text-crop.eightshapes.com/?typeface-selection=custom-font&typeface=Lekton&custom-typeface-name=Haptik&custom-typeface-url=https%3A%2F%2Fmarz.wvgg.co%2Ffonts%2Ftemp.css&custom-typeface-weight=500&custom-typeface-style=normal&weight-and-style=700&size=100&line-height=1.25&top-crop=26&bottom-crop=156
const typefaces = {
  haptik: {
    name: 'gt-haptik',
    typeface: 'var(--haptik)',
    backupTypefaces:
      '"Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
    cropFontSize: 100,
    cropLineHeight: 1.25,
    topCrop: 26,
    bottomCrop: 156,
  },
}

/* weight reference:
 * 100: extralight
 * 200: light
 * 300: book
 * 400: regular
 * 500: medium
 * 600: semibold
 * 700: bold
 * 800: black
 * 900: extrablack
 */

// these values must reflect typography.scss
// they are now only used to feed into the crop tool
// it would be nice to figure out a way to make the crop tool use the scss file… hm…
export const dictionary: TypeDictionary = {
  large: {
    ...typefaces.haptik,
    defaultWeight: 500,
    m: {
      size: 1.6,
      line: 3,
    },
    l: {
      size: 2.52,
      line: 3.6,
    },
    xl: {
      size: 3,
      line: 4,
    },
  },
  extraLarge: {
    ...typefaces.haptik,
    defaultWeight: 500,
    m: {
      size: 1.6,
      line: 3,
    },
    l: {
      size: 2.52,
      line: 3.6,
    },
    xl: {
      size: 3,
      line: 4,
    },
  },
  medium: {
    ...typefaces.haptik,
    defaultWeight: 500,
    m: {
      size: 1.6,
      line: 3,
    },
    l: {
      size: 2.52,
      line: 3.6,
    },
    xl: {
      size: 3,
      line: 4,
    },
  },
  small: {
    ...typefaces.haptik,
    defaultWeight: 500,
    m: {
      size: 1.6,
      line: 3,
    },
    l: {
      size: 2.52,
      line: 3.6,
    },
    xl: {
      size: 3,
      line: 4,
    },
  },
  extraSmall: {
    ...typefaces.haptik,
    defaultWeight: 500,
    m: {
      size: 1.6,
      line: 3,
    },
    l: {
      size: 2.52,
      line: 3.6,
    },
    xl: {
      size: 3,
      line: 4,
    },
  },
}
