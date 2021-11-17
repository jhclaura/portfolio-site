import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled, colors, mq } from '../styles'

const TitleHeader = () => {
  const router = useRouter()

  return (
    <Container>
      <Link href={'/'}>
        <TitleButton isCurrent={router.asPath === '/'}>
          {'Laura Juo-Hsin Chen'}
        </TitleButton>
      </Link>
    </Container>
  )
}

const Container = styled.div(
  {},
  mq({
    // paddingBottom: 30,
  }),
)

const Button = styled.a(
  {
    color: colors.green,
    marginBottom: 5,
  },
  props => ({
    color: props.isCurrent ? props.theme.highlightColor : 'black',
  }),
)

const TitleButton = styled(Button)({
  fontSize: 24,
})

export default TitleHeader
