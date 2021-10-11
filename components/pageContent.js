import BlockContent from '@sanity/block-content-to-react'
import ReactPlayer from 'react-player'

import { styled, colors, typography, mq, spaces } from '../styles'
import ImageFancyBox from './ImageFancyBox'
import { sanityConfig } from '../lib/config'

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

const Container = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 800,
    marginLeft: 'auto',
  },
  mq({
    padding: spaces.small,
  }),
)

const TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
})

const Title = styled.div(
  typography.smallSans,
  { width: 800, marginLeft: 'auto', position: 'relative', textAlign: 'center' },
  mq({
    padding: spaces.small,
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
