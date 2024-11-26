# Introduction

This tool introduces negative margins above and below a block of text, in order to make the top and bottom of the block line up flush with the top and bottom of the typeface letterforms.

You can read [https://css-tricks.com/how-to-tame-line-height-in-css/](an overview) of why typefaces line up the way they do, and a general theory on how to "fix" it.

This code is based on the [http://text-crop.eightshapes.com](EightShapes text-crop mixin tool), tailored for our use in styled-components.

## Usage

Use the [http://text-crop.eightshapes.com](EightShapes text-crop mixin tool) to measure our typefaces.

1. Pick a Google font, or fill in a URL to a css file that correctly loads your own typeface.
2. Pick a large-ish size to measure.

- Size is in px.
- To convert (1rem = 16px) to px, multiple by 16.
- ex. 3.5rem \* 16 = 56

3. Fill in the desired line height for that size.

- Line height is em.
- To convert 3.75rem to em, take line / size
- ex. 3.75 / 3.5 = 1.07

4. Record the filled-in size and line height values into the typeface dictionary.

5. Adjust the lines to the desired crop placement.

6. Record the provided topCrop and bottomCrop figures in the typeface dictionary.

## open NextJS to text-crop tool (CORS)

Add to next.config.mjs:

```
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/fonts',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}
```
