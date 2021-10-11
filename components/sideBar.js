import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled, colors, spaces, mq } from '../styles'

const SideBar = ({ projectSlugs, explorationSlugs }) => {
  const router = useRouter()
  return (
    <Container>
      <div>
        <ul>
          <LinkContainer>
            <LinkButton
              path={'/'}
              name={'Laura Juo-Hsin Chen'}
              currentPathname={router.asPath}
            />
          </LinkContainer>

          <LinkContainer>
            <LinkButton
              path={'/projects'}
              name={'Projects'}
              currentPathname={router.asPath}
            />
          </LinkContainer>

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
        </ul>
      </div>
    </Container>
  )
}

const LinkButton = ({ path, name, currentPathname }) => {
  return (
    <li>
      <Link href={path}>
        <Button isCurrent={path === currentPathname}>{name}</Button>
      </Link>
    </li>
  )
}

const Container = styled.div(
  {
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    width: 300,
    paddingRight: 400,
    overflowY: 'auto',
    overflowX: 'hidden',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  mq({
    padding: spaces.small,
    paddingRight: 0,
  }),
)

const LinkContainer = styled.ol(
  mq({
    paddingBottom: spaces.small,
  }),
)

const Button = styled.a({ color: colors.green, marginBottom: 5 }, props => ({
  color: props.isCurrent ? props.theme.highlightColor : 'black',
}))

const SubButtonContainer = styled.ol({
  listStyle: 'decimal',
  padding: '0px 10px 20px 60px',
})

export default SideBar
