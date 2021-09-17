import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'

import Container from '../components/container'
import Layout from '../components/layout'
import {
  allProjectsQuery,
  projectFullSlugsQuery,
  explorationFullSlugsQuery,
} from '../lib/queries'
import { getClient } from '../lib/sanity.server'
import { theme, styled, mq, spaces } from '../styles/index.js'
import ProjectCard from '../components/projectCard'

export default function Index({
  allProjects,
  allProjectSlugs,
  preview,
  allExplorationSlugs,
}) {
  console.log(allProjects)
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
  const allProjectSlugs = await getClient(preview).fetch(projectFullSlugsQuery)
  const allExplorationSlugs = await getClient(preview).fetch(
    explorationFullSlugsQuery,
  )
  return {
    props: { allProjects, preview, allProjectSlugs, allExplorationSlugs },
  }
}
