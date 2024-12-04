import localFont from 'next/font/local'

export const robinson = localFont({
  src: [
    {
      path: '../../public/fonts/Robinson-Light-Web.woff2',
      style: 'normal',
      weight: '300',
    },
  ],
  preload: true,
  variable: '--robinson',
})
