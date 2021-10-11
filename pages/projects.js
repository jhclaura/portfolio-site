import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'

import Container from '../components/container'
import Layout from '../components/layout'
import {
  allProjectsQuery,
  projectFullSlugsQuery,
  explorationFullSlugsQuery,
  allIndexSlugsQuery,
} from '../lib/queries'
import { getClient } from '../lib/sanity.server'
import { theme, styled, mq, spaces } from '../styles/index.js'
import ProjectCard from '../components/projectCard'

export default function Index({ allProjects, preview, portfolio }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout preview={preview} projectSlugs={portfolio}>
        <Head>
          <title>Laura Juo-Hsin Chen</title>
        </Head>
        <Container>
          <CardsContainer>
            {allProjects.projects.map((p, index) => (
              <ProjectCard key={index} {...p} />
            ))}
          </CardsContainer>
        </Container>
      </Layout>
    </ThemeProvider>
  )
}

const CardsContainer = styled.div(
  {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1000,
    margin: 'auto',
  },
  mq({
    padding: spaces.medium,
  }),
)

export async function getStaticProps({ preview = false }) {
  const allProjects = await getClient(preview).fetch(allProjectsQuery)
  const { portfolio } = await getClient(preview).fetch(allIndexSlugsQuery)
  return {
    props: { allProjects, preview, portfolio },
  }
}
