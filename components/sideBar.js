import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import Div100vh from 'react-div-100vh'
import { styled, spaces, mq } from '../styles'
import LinkButton from './LinkButton'
import TitleHeader from './titleHeader'

const SideBar = ({ projectSlugs }) => {
  const router = useRouter()

  return (
    <SidebarContainer isMobile={isMobile}>
      <TitleHeader />

      <List>
        {/* <LinkContainer>
          <div>Projects</div>
        </LinkContainer> */}

        {projectSlugs && (
          <SubButtonContainer>
            {projectSlugs.map((s, i) => (
              <LinkButton
                key={`p_sub_${i}`}
                path={`/projects/${s.slug}`}
                name={s.title}
                currentPathname={router.asPath}
              />
            ))}
          </SubButtonContainer>
        )}

        <LinkContainer>
          <LinkButton
            path={'/pages/about'}
            name={'About'}
            currentPathname={router.asPath}
          />
        </LinkContainer>
      </List>
    </SidebarContainer>
  )
}

const SidebarContainer = styled(Div100vh)(
  {
    position: 'fixed',
    top: 0,
    left: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    backgroundColor: 'white',
  },
  mq({
    padding: ['20px 20px 20px 40px', '15px 20px 20px'],
    width: ['30vw', '100vw'],
  }),
)

const List = styled.ul({
  paddingTop: 30,
})

const LinkContainer = styled.ol(
  mq({
    paddingBottom: spaces.small,
  }),
)

const SubButtonContainer = styled.ol({
  listStyle: 'decimal',
  padding: '0px 10px 20px 60px',
})

export default SideBar
