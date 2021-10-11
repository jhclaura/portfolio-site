import groq from 'groq'

const postFields = `
  _id,
  name,
  title,
  publishedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const allPostsQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) | [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) | [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

const pageFields = `
  _id,
  name,
  title,
  publishedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
`

export const pageQuery = `
{
  "page": *[_type == "page" && slug.current == $slug] | order(_updatedAt desc) | [0] {
    content,
    ${pageFields}
  },
  "morePages": *[_type == "page" && slug.current != $slug] | order(date desc, _updatedAt desc) | [0...2] {
    content,
    ${pageFields}
  }
}`

export const pageSlugsQuery = `
*[_type == "page" && defined(slug.current)][].slug.current
`

export const pageBySlugQuery = `
*[_type == "page" && slug.current == $slug][0] {
  ${pageFields}
}
`

const projectFields = `
  title,
  "slug": slug.current,
  metadata,
  "categories": categories[]->title,
  excerpt,
  mainImage,
  "images": images[] {
    asset != null => {
      "url": asset->url,
      ...
    },
    images != null => {
      "images": images[] {
        "url": asset->url,
        ...
      }
    },
  },
  content,
`

export const allProjectsQuery = groq`
  *[_type == "projectList" && slug.current == 'portfolio'] {
    title,
    "projects": projects[]->{
      ${projectFields}
    }
  } [0]
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`

export const projectFullSlugsQuery = groq`
  *[_type == "projectList" && slug.current == 'portfolio'] {
    "slugs": projects[]->{
      title,
      "slug": slug.current,
    }
  } [0].slugs
`

export const explorationFullSlugsQuery = groq`
  *[_type == "projectList" && slug.current == 'explorations'] {
    "slugs": projects[]->{
      title,
      "slug": slug.current,
    }
  } [0].slugs
`

export const projectQuery = groq`
  {
    "project": *[_type == "project" && slug.current == $slug] | [0] {
      ${projectFields}
    },
    "moreProjects": *[_type == "project" && slug.current != $slug] | order(date desc, _updatedAt desc) | [0...3] {
      ${projectFields}
    },
    "allProjectSlugs": *[_type == "projectList" && slug.current == 'portfolio'] {
      "slugs": projects[]->{
        title,
        "slug": slug.current,
      }
    } [0].slugs,
    "allExplorationSlugs": *[_type == "projectList" && slug.current == 'explorations'] {
      "slugs": projects[]->{
        title,
        "slug": slug.current,
      }
    } [0].slugs
  }
`

export const allIndexSlugsQuery = groq`
  {
    "portfolio": *[_type == "projectList" && slug.current == 'portfolio'] {
      "slugs": projects[]->{
        title,
        "slug": slug.current,
      }
    } [0].slugs,
  }
`
