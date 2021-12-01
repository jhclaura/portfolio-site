import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { useMemo } from 'react'
import { NextSeo } from 'next-seo'

import Container from '../../components/container'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { projectQuery, projectSlugsQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import ProjectContent from '../../components/projectContent'
import { HOST } from '../../lib/constants'

const findPreviousAndNextPosts = (slug, allSlugs) => {
  if (!slug || !allSlugs) return { previous: -1, next: -1 }
  const postIndex = allSlugs.indexOf(slug)
  const previousIndex =
    postIndex - 1 < 0
      ? allSlugs.length === 2
        ? -1
        : allSlugs.length - 1
      : postIndex - 1
  const nextIndex =
    postIndex + 1 >= allSlugs.length
      ? allSlugs.length === 2
        ? -1
        : 0
      : postIndex + 1
  return { previous: previousIndex, next: nextIndex }
}

const Project = ({ data = {}, preview, metaTitle, metaImage, metaExcerpt }) => {
  const router = useRouter()

  const slug = data?.project?.slug
  const {
    data: { project, allProjectSlugs },
  } = usePreviewSubscription(projectQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  const [previousProject, nextProject] = useMemo(() => {
    if (!allProjectSlugs) {
      return [undefined, undefined]
    }
    const allSlugCurrents = allProjectSlugs.map(slug => slug.slug)
    const { previous, next } = findPreviousAndNextPosts(slug, allSlugCurrents)
    return [
      previous > -1 ? allProjectSlugs[previous].slug : undefined,
      next > -1 ? allProjectSlugs[next].slug : undefined,
    ]
  }, [slug, allProjectSlugs])

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <NextSeo
        title={`${metaTitle} | Laura Juo-Hsin Chen`}
        description={metaExcerpt}
        openGraph={{
          url: `${HOST}${router.asPath}`,
          images: [
            {
              url: `${urlForImage(metaImage)
                .width(1200)
                .height(627)
                .fit('crop')
                .url()}`,
              width: 1200,
              height: 627,
              alt: `${metaTitle} Image`,
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <Layout
        preview={preview}
        projectSlugs={data?.allProjectSlugs}
        explorationSlugs={data?.allExplorationSlugs}>
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <Head>
                  <title>{project.title} | Laura Juo-Hsin Chen</title>
                  {project.mainImage && (
                    <meta
                      key="ogImage"
                      property="og:image"
                      content={urlForImage(project.mainImage)
                        .width(1200)
                        .height(627)
                        .fit('crop')
                        .url()}
                    />
                  )}
                </Head>

                <ProjectContent
                  {...project}
                  previousProject={previousProject}
                  nextProject={nextProject}
                />
              </article>
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { project, allProjectSlugs } = await getClient(preview).fetch(
    projectQuery,
    {
      slug: params.slug,
    },
  )

  return {
    props: {
      preview,
      data: {
        project,
        allProjectSlugs,
      },
      metaTitle: project.title,
      metaImage: project.mainImage,
      metaExcerpt: project.excerpt,
    },
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(projectSlugsQuery)
  return {
    paths: paths.map(slug => ({ params: { slug } })),
    fallback: true,
  }
}

export default Project
