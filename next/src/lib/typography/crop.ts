import { type TypeDefinitionParameters } from './types'

export const textCrop = (
  dict: TypeDefinitionParameters,
  options?: { lineHeight?: number },
) => {
  // Convert typography dictionary line height into em.
  // Using "desktop" because it has the largest type thus the largest precision.
  const adjustedLineHeight = options?.lineHeight || dict.l.line / dict.l.size

  const { cropFontSize, cropLineHeight, topCrop, bottomCrop } = dict

  const dynamicTopCrop =
    (Math.max(
      topCrop + (adjustedLineHeight - cropLineHeight) * (cropFontSize / 2),
      0,
    ) /
      cropFontSize) *
    -1

  const dynamicBottomCrop =
    (Math.max(
      bottomCrop + (adjustedLineHeight - cropLineHeight) * (cropFontSize / 2),
      0,
    ) /
      cropFontSize) *
    -1

  return `
    display: inline-block;
		margin: 0;

		&::before,
		&::after {
			display: block;
			height: 0;
			width: 0;
			pointer-events: none;
		}

		&::before {
			content: ' ';
			margin-bottom: ${dynamicTopCrop}em;
		}

		&::after {
			content: ' ';
			margin-top: ${dynamicBottomCrop}em;
		}
	`
}
