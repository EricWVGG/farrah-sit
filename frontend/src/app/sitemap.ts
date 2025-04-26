// import { fetchSanity, groq } from '@/lib/sanity/fetch'
// import { BASE_URL } from '@const'
// import type { MetadataRoute } from 'next'
// import { getPostsByType } from '@/queries'
// import { getBlockDateParts } from '@lib'
//
// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const allPagesQuery = groq`
//     {
//       'pages': *[
//         _type == 'page' &&
//         !(metadata.slug.current in ['404']) &&
//         metadata.noIndex != true
//       ]|order(metadata.slug.current){
//         'url': $baseUrl + select(metadata.slug.current == 'index' => '', metadata.slug.current),
//         'lastModified': _updatedAt,
//         'priority': select(
//           metadata.slug.current == 'index' => 1,
//           0.5
//         ),
//       },
//
//       'projects': *[_type == 'portfolio.project' && metadata.noIndex != true && postType == 'project']|order(name){
//         'url': $baseUrl + 'project/' + metadata.slug.current,
//         'lastModified': _updatedAt,
//         'priority': 0.4
//       },
//
//       'photo': *[_type == 'portfolio.project' && metadata.noIndex != true && postType == 'photo']|order(name){
//         'url': $baseUrl + 'photo/' + metadata.slug.current,
//         'lastModified': _updatedAt,
//         'priority': 0.2
//       },
//
//       'illustration': *[_type == 'portfolio.project' && metadata.noIndex != true && postType == 'illustration']|order(name){
//         'url': $baseUrl + 'illustration/' + metadata.slug.current,
//         'lastModified': _updatedAt,
//         'priority': 0.2
//       },
//     }`
//   const allPages = await fetchSanity<Record<string, MetadataRoute.Sitemap>>(
//     allPagesQuery,
//     {
//       params: {
//         baseUrl: BASE_URL + '/',
//       },
//     },
//   )
//
//   const blogPosts = await getPostsByType('blog')
//
//   let parsedPosts = blogPosts
//     .filter((blogPost) => !blogPost.metadata?.noIndex)
//     .map((blogPost) => {
//       const { year, month, day } = getBlockDateParts(
//         blogPost.publishDate ?? '1999-01-01',
//       )
//       return {
//         url: `/blog/${year}/${month}/${day}/${blogPost.metadata?.slug?.current}`,
//         lastModified: blogPost._updatedAt,
//         priority: 0.3,
//       }
//     })
//
//   return [...Object.values(allPages).flat(), ...parsedPosts]
// }
