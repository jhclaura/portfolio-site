import BlockContent from '@sanity/block-content-to-react'
import ReactPlayer from 'react-player'

import { styled, mq, spaces } from '../styles'
import { sanityConfig } from '../lib/config'
import { TitleContainer, Container } from './sharedComponents'

const serializers = {
  types: {
    video: ({ node }) => {
      const { url } = node
      return (
        <PlayerWrapper>
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            config={{
              vimeo: {
                playerOptions: {
                  controls: true,
                },
              },
            }}
          />
        </PlayerWrapper>
      )
    },
    block: props => {
      const { style = 'normal' } = props.node
      if (style === 'normal') {
        return <Paragraph>{props.children}</Paragraph>
      }
      return BlockContent.defaultSerializers.types.block(props)
    },
  },
}

const PageContent = (page = {}) => {
  return (
    <>
      <TitleContainer>
        <Title>{page.title}</Title>
      </TitleContainer>

      <Container>
        {page.content && (
          <BlockContent
            blocks={page.content}
            serializers={serializers}
            projectId={sanityConfig.projectId}
            dataset={sanityConfig.dataset}
          />
        )}
      </Container>
    </>
  )
}

const Title = styled.div(
  {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    fontSize: 24,
    justifyContent: 'space-between',
    borderBottom: '1px solid',
  },
  mq({
    paddingBottom: spaces.small,
    marginBottom: spaces.small,
  }),
)

const PlayerWrapper = styled.div(
  {
    position: 'relative',
    paddingTop: `${100 / (1280 / 720)}%`,
  },
  mq({
    marginBottom: spaces.small,
  }),
)

const Paragraph = styled.div({
  paddingBottom: 10,
})

export default PageContent
