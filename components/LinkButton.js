import Link from 'next/link'
import { styled, colors, mq } from '../styles'

const LinkButton = ({ path, name, currentPathname, isTitle, url }) => {
  return (
    <li>
      {url ? (
        <>
          {isTitle ? (
            <TitleButton
              isCurrent={path === currentPathname}
              href={url}
              target="_blank">
              {name}
            </TitleButton>
          ) : (
            <Button
              isCurrent={path === currentPathname}
              href={url}
              target="_blank">
              {name}
            </Button>
          )}
        </>
      ) : (
        <>
          <Link href={path}>
            {isTitle ? (
              <TitleButton isCurrent={path === currentPathname}>
                {name}
              </TitleButton>
            ) : (
              <Button isCurrent={path === currentPathname}>{name}</Button>
            )}
          </Link>
        </>
      )}
    </li>
  )
}

const Button = styled.a(
  {
    color: colors.green,
    marginBottom: 5,
  },
  props => ({
    color: props.isCurrent ? props.theme.highlightColor : 'black',
  }),
  mq({
    fontSize: [16, 24],
  }),
)

const TitleButton = styled(Button)({
  fontSize: 24,
})

export default LinkButton
