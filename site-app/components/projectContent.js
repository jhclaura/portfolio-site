import BlockContent from '@sanity/block-content-to-react'
import ReactPlayer from 'react-player'

import Date from './date'
import CoverImage from './cover-image'
import SanityImage from './sanityImage'
import Link from 'next/link'
import { styled, colors, typography, mq, spaces } from '../styles'
import ImageFancyBox from './ImageFancyBox'

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

const MetadataBlockRenderer = props => {
  const { style = 'normal' } = props.node

  if (style === 'normal') {
    return <Metadata>{props.children}</Metadata>
  }

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props)
}

const ProjectContent = (project = {}) => {
  return (
    <>
      <TitleContainer>
        <Title>
          <Link href={`/projects/${project.previousProject}`}>
            <LeftArrow>{'<'}</LeftArrow>
          </Link>
          {project.title}
          <Link href={`/projects/${project.nextProject}`}>
            <RightArrow>{'>'}</RightArrow>
          </Link>
        </Title>
      </TitleContainer>

      <Container>
        {project.content && (
          <BlockContent blocks={project.content} serializers={serializers} />
        )}

        <ImageContainer>
          <SanityImage title={project.title} imageData={project.mainImage} />
        </ImageContainer>

        {project.images && project.images.length > 0 && (
          <ImageFancyBox options={{ infinite: false }}>
            <ThumbImageButtonContainer>
              {project.images.map((image, index) => {
                if (image._type === 'image')
                  return (
                    <ThumbImageButton
                      key={index}
                      data-fancybox="gallery"
                      data-src={image.url}
                      className="button button--secondary">
                      <ThumbImageContainer>
                        <SanityImage imageData={image} />
                      </ThumbImageContainer>
                    </ThumbImageButton>
                  )
                else if (image._type === 'imageBlock')
                  return (
                    <ThumbImageBlockContainer>
                      {image.images.map((img, imgIndex) => (
                        <ThumbImageButton
                          key={imgIndex}
                          data-fancybox="gallery"
                          data-src={img.url}
                          className="button button--secondary">
                          <ThumbImageContainer
                            paddingRight={
                              image.images.length > 1 &&
                              imgIndex !== image.images.length - 1
                            }
                            paddingLeft={
                              image.images.length > 1 && imgIndex !== 0
                            }>
                            <SanityImage imageData={img} />
                          </ThumbImageContainer>
                        </ThumbImageButton>
                      ))}
                    </ThumbImageBlockContainer>
                  )
              })}
            </ThumbImageButtonContainer>
          </ImageFancyBox>
        )}

        {project.metadata && (
          <BlockContent
            blocks={project.metadata}
            // serializers={{ types: { block: MetadataBlockRenderer } }}
          />
        )}
      </Container>

      <TitleContainer>
        <Title>
          <Link href={`/projects/${project.previousProject}`}>
            <LeftArrow>{'<'}</LeftArrow>
          </Link>
          {project.title}
          <Link href={`/projects/${project.nextProject}`}>
            <RightArrow>{'>'}</RightArrow>
          </Link>
        </Title>
      </TitleContainer>
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

const LeftArrow = styled.a({
  position: 'absolute',
  left: -10,
})

const RightArrow = styled.a({
  position: 'absolute',
  right: -10,
})

const Metadata = styled.div(typography.tinyMono, {
  fontWeight: 300,
  paddingBottom: 10,
})

const CategoriesContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
})

const Category = styled.div({
  paddingRight: 10,
  fontFamily: 'Cutive Mono',
  fontWeight: 300,
  fontSize: 14,
  color: colors.grey,
})

const PlayerWrapper = styled.div(
  {
    position: 'relative',
    paddingTop: `${100 / (1280 / 720)}%`,
  },
  mq({
    marginBottom: spaces.small,
  }),
)

const ImageContainer = styled.div(
  {},
  mq({
    paddingBottom: spaces.small,
  }),
)

const Paragraph = styled.div({
  paddingBottom: 10,
})

const ThumbImageBlockContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
})

const ThumbImageButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  // flexWrap: 'wrap',
  flex: 1,
})

const ThumbImageButton = styled.button({
  flex: 1,
})

const ThumbImageContainer = styled.div(
  {},
  mq({
    paddingBottom: spaces.small,
  }),
  props => ({
    paddingRight: props.paddingRight ? 10 : 0,
    paddingLeft: props.paddingLeft ? 10 : 0,
  }),
)

export default ProjectContent
