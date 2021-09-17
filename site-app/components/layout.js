import Alert from '../components/alert'
import SideBar from '../components/sideBar'
import Meta from '../components/meta'
import { styled } from '../styles/index.js'

export default function Layout({
  preview,
  children,
  projectSlugs,
  explorationSlugs,
}) {
  return (
    <>
      <Meta />
      <SideBar
        projectSlugs={projectSlugs}
        explorationSlugs={explorationSlugs}
      />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}

const Container = styled.div({
  minHeight: '100vh',
})
