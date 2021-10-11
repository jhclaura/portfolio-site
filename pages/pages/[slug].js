import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PageBody from '../../components/pageBody'
import Header from '../../components/header'
import PageHeader from '../../components/pageHeader'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import {
  pageQuery,
  pageSlugsQuery,
  allIndexSlugsQuery,
} from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../lib/sanity.server'
import PageContent from '../../components/pageContent'

export default function Page({ data = {}, preview, portfolio }) {
  const router = useRouter()

  const slug = data?.page?.slug
  const {
    data: { page, morePages },
  } = usePreviewSubscription(pageQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview} projectSlugs={portfolio}>
      <Container>
        {/* <Header /> */}
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{page.title} | Laura Juo-Hsin Chen</title>
                {/* {page.coverImage && (
                  <meta
                    key="ogImage"
                    property="og:image"
                    content={urlForImage(page.coverImage)
                      .width(1200)
                      .height(627)
                      .fit('crop')
                      .url()}
                  />
                )} */}
              </Head>
              {/* <PageHeader title={page.title} coverImage={page.coverImage} /> */}
              <PageContent {...page} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { page, morePages } = await getClient(preview).fetch(pageQuery, {
    slug: params.slug,
  })
  const { portfolio } = await getClient(preview).fetch(allIndexSlugsQuery)

  return {
    props: {
      preview,
      data: {
        page,
        morePages: overlayDrafts(morePages),
      },
      portfolio,
    },
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(pageSlugsQuery)
  return {
    paths: paths.map(slug => ({ params: { slug } })),
    fallback: true,
  }
}
