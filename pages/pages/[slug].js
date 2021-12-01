import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { NextSeo } from 'next-seo'

import Container from '../../components/container'
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
import { HOST } from '../../lib/constants'

export default function Page({
  data = {},
  preview,
  portfolio,
  metaTitle,
  metaImage,
  metaExcerpt,
}) {
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
      <Layout preview={preview} projectSlugs={portfolio}>
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <Head>
                  <title>{page.title} | Laura Juo-Hsin Chen</title>
                </Head>
                <PageContent {...page} />
              </article>
            </>
          )}
        </Container>
      </Layout>
    </>
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
      metaTitle: page.title,
      metaImage: page.coverImage,
      metaExcerpt: page.excerpt,
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
