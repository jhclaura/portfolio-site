import { styled, mq } from '../styles'

export default function Container({ children }) {
  return <NarrowContainer>{children}</NarrowContainer>
}

const NarrowContainer = styled.div(
  {
    alignItems: 'flex-end',
    marginBottom: 50,
  },
  mq({
    marginLeft: ['30vw', 0],
  }),
)
