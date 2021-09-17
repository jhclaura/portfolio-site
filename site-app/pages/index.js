import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import {
  projectFullSlugsQuery,
  explorationFullSlugsQuery,
} from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../styles/index.js'

export default function Index({
  allProjectSlugs,
  allExplorationSlugs,
  preview,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Layout
        preview={preview}
        projectSlugs={allProjectSlugs}
        explorationSlugs={allExplorationSlugs}>
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
  const allProjectSlugs = await getClient(preview).fetch(projectFullSlugsQuery)
  const allExplorationSlugs = await getClient(preview).fetch(
    explorationFullSlugsQuery,
  )
  return {
    props: { allProjectSlugs, allExplorationSlugs, preview },
  }
}
