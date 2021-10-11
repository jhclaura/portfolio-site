import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { useMemo } from 'react'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import { projectQuery, projectSlugsQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../lib/sanity.server'
import SanityImage from '../../components/sanityImage'
import ProjectCard from '../../components/projectCard'
import { styled } from '../../styles'
import ProjectContent from '../../components/projectContent'

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

const Project = ({ data = {}, preview }) => {
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
    const allSlugCurrents = allProjectSlugs.map(slug => slug.slug)
    // console.log(allSlugCurrents)
    const { previous, next } = findPreviousAndNextPosts(slug, allSlugCurrents)
    // console.log(allSlugs[previous].slug, allSlugs[next].slug)
    return [
      previous > -1 ? allProjectSlugs[previous].slug : undefined,
      next > -1 ? allProjectSlugs[next].slug : undefined,
    ]
  }, [slug, allProjectSlugs])

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
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
              {/* <div>{project.title}</div>
              <SanityImage
                title={project.title}
                imageData={project.mainImage}
              />
              <PostBody content={project.content} /> */}
            </article>
            {/* <SectionSeparator />
            <CardsContainer>
              {moreProjects.map((p, i) => (
                <ProjectCard key={`p_c_${i}`} {...p} />
              ))}
            </CardsContainer> */}
          </>
        )}
      </Container>
    </Layout>
  )
}

const CardsContainer = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingTop: 70,
  justifyContent: 'center',
})

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
