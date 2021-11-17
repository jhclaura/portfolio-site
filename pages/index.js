import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'

import Container from '../components/container'
import Layout from '../components/layout'
import { allProjectsQuery, allIndexSlugsQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'
import { theme } from '../styles/index.js'
import ProjectCards from '../components/projectCards'

export default function Index({ allProjects, preview, portfolio }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout preview={preview} projectSlugs={portfolio}>
        <Head>
          <title>Laura Juo-Hsin Chen</title>
        </Head>
        <Container>
          <ProjectCards projects={allProjects.projects} />
        </Container>
      </Layout>
    </ThemeProvider>
  )
}

export async function getStaticProps({ preview = false }) {
  const allProjects = await getClient(preview).fetch(allProjectsQuery)
  const { portfolio } = await getClient(preview).fetch(allIndexSlugsQuery)
  return {
    props: { allProjects, preview, portfolio },
  }
}
