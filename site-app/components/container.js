import { styled } from '../styles'

export default function Container({ children }) {
  return <NarrowContainer>{children}</NarrowContainer>
}

const NarrowContainer = styled.div({
  marginLeft: 400,
  alignItems: 'flex-end',
  marginRight: 50,
  marginBottom: 20,
})
