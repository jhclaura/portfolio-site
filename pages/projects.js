import { useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@emotion/react'

import Container from '../components/container'
import Layout from '../components/layout'
import { allProjectsQuery, allIndexSlugsQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'
import { theme } from '../styles/index.js'
import ProjectCards from '../components/projectCards'

export default function Index({ allProjects, preview, portfolio }) {
  const router = useRouter()
  const { tag } = router.query
  console.log(tag)
  const [projects, currentTag] = useMemo(() => {
    if (tag) {
      const tags = tag.split(',')
      const filteredProjects = allProjects.projects.filter(project =>
        tags.every(t => project.categorySlugs.includes(t)),
      )
      return filteredProjects.length > 0
        ? [filteredProjects, tag]
        : [allProjects.projects, undefined]
    } else {
      return [allProjects.projects, undefined]
    }
  }, [tag])

  return (
    <ThemeProvider theme={theme}>
      <Layout preview={preview} projectSlugs={portfolio}>
        <Head>
          <title>Laura Juo-Hsin Chen</title>
        </Head>
        <Container>
          <ProjectCards projects={projects} currentTag={currentTag} />
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
