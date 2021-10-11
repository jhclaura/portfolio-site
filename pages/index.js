import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import { allIndexSlugsQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../styles/index.js'

export default function Index({ portfolio, preview }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout preview={preview} projectSlugs={portfolio}>
        <Head>
          <title>Laura Juo-Hsin Chen</title>
        </Head>
        <Container>
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.publishedAt}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )} */}
        </Container>
      </Layout>
    </ThemeProvider>
  )
}

export async function getStaticProps({ preview = false }) {
  const { portfolio } = await getClient(preview).fetch(allIndexSlugsQuery)
  return {
    props: { portfolio, preview },
  }
}
