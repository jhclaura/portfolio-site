import BlockContent from '@sanity/block-content-to-react'
import ReactPlayer from 'react-player'
import { useMemo } from 'react'
import { isMobile } from 'react-device-detect'

import SanityImage from './sanityImage'
import Link from 'next/link'
import { styled, colors, typography, mq, spaces, fonts } from '../styles'
import ImageFancyBox from './ImageFancyBox'
import { sanityConfig } from '../lib/config'
import { urlForImage } from '../lib/sanity'
import Carousel from './carousel'

const leftColumnSerializer = {
  types: {
    block: props => {
      const { style = 'normal' } = props.node
      if (style === 'normal') {
        return <Paragraph>{props.children}</Paragraph>
      } else if (style === 'metadata') {
        return <MetadataParagraph>{props.children}</MetadataParagraph>
      }
      return BlockContent.defaultSerializers.types.block(props)
    },
    image: props => {
      if (props.node.width && props.node.height)
        return (
          <SanityImage
            title={props.node.alt}
            imageData={props.node}
            layout={'fixed'}
            width={props.node.width}
            height={props.node.height}
            objectFit="contain"
          />
        )
      else
        return (
          <SanityImage
            title={props.node.alt}
            imageData={props.node}
            layout={'fixed'}
            width={150}
            height={150}
            objectFit="contain"
          />
        )
    },
  },
}

const rigthColumnSerializer = {
  marks: {
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark
      const href = `/${slug.current}`
      return <a href={href}>{children}</a>
    },
    link: ({ mark, children }) => {
      // Read https://css-tricks.com/use-target_blank/
      const { blank, href } = mark
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      )
    },
  },
  types: {
    video: ({ node }) => {
      return <VideoWithCaption video={node} />
    },
    block: props => {
      const { style = 'normal' } = props.node
      if (style === 'normal') {
        return <Paragraph>{props.children}</Paragraph>
      } else if (style === 'metadata') {
        return <MetadataParagraph>{props.children}</MetadataParagraph>
      }
      return BlockContent.defaultSerializers.types.block(props)
    },
    image: props => {
      return <ImageWithCaption image={props.node} />
    },
    imageBlock: props => {
      const { images } = props.node
      return (
        <ImageBLockContainer>
          <ThumbImageBlockContainer>
            {images.map((img, index) => (
              <ThumbImageContainer
                key={`imgBlock${index}`}
                paddingRight={images.length > 1 && index !== images.length - 1}
                paddingLeft={images.length > 1 && index !== 0}>
                <Image image={img} />
              </ThumbImageContainer>
            ))}
          </ThumbImageBlockContainer>
          <ImageCaptionOffsetContainer>
            <ImageCaptionContainer>
              <ImageCaption>{props.node.caption}</ImageCaption>
            </ImageCaptionContainer>
          </ImageCaptionOffsetContainer>
        </ImageBLockContainer>
      )
    },
    flickr: ({ node }) => {
      const { url, previewImage } = node
      return (
        <ColumnsContainer>
          <RightColumnContainer>
            <a data-flickr-embed="true" data-header="true" href={url}>
              <img src={previewImage} />
            </a>
            <script
              async
              src="//embedr.flickr.com/assets/client-code.js"
              charSet="utf-8"
            />
          </RightColumnContainer>
        </ColumnsContainer>
      )
    },
  },
}

const serializers = {
  marks: {
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark
      const href = `/${slug.current}`
      return <a href={href}>{children}</a>
    },
    link: ({ mark, children }) => {
      // Read https://css-tricks.com/use-target_blank/
      const { blank, href } = mark
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      )
    },
  },
  types: {
    image: props => {
      return <ImageWithCaption image={props.node} />
    },
    imageSlide: props => {
      return (
        <ColumnsContainer>
          <CarouselContainer>
            <Carousel
              slides={props.node.images.map((image, index) => (
                <div
                  className="carousel__slide"
                  style={{ width: '80%' }}
                  key={`c_slide${index}`}>
                  <SlideImageButton
                    data-fancybox="gallery-slides"
                    data-src={urlForImage(image)}
                    data-caption={image.caption}
                    className="button button--secondary">
                    <SanityImage
                      title={image.alt}
                      imageData={image}
                      layout="fill"
                      objectFit="cover"
                    />
                  </SlideImageButton>
                </div>
              ))}
            />
          </CarouselContainer>
        </ColumnsContainer>
      )
    },
    video: ({ node }) => {
      const { url } = node
      const isNative = useMemo(() => {
        return (
          url.search('facebook') === -1 &&
          url.search('vimeo') === -1 &&
          url.search('youtube') === -1 &&
          url.search('youtu.be') === -1
        )
      }, [url])
      return (
        <ColumnsContainer>
          <RightColumnContainer>
            <PlayerWrapper isNative={isNative}>
              <ReactPlayer
                url={url}
                width="100%"
                height={isNative ? 'auto' : '100%'}
                style={{
                  position: isNative ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                }}
                config={{
                  vimeo: {
                    playerOptions: {
                      controls: true,
                    },
                  },
                  file: {
                    attributes: {
                      controls: true,
                    },
                  },
                }}
              />
            </PlayerWrapper>
          </RightColumnContainer>
        </ColumnsContainer>
      )
    },
    block: props => {
      const { style = 'normal' } = props.node
      if (style === 'normal') {
        return (
          <ColumnsContainer>
            {/* <LeftColumnContainer /> */}
            <RightColumnContainer>
              <Paragraph>{props.children}</Paragraph>
            </RightColumnContainer>
          </ColumnsContainer>
        )
      } else if (style === 'blockquote') {
        return (
          <ColumnsContainer>
            {/* <LeftColumnContainer /> */}
            <RightColumnContainer>
              <Paragraph>
                <Quote>
                  <QuoteMark>“</QuoteMark>
                  <blockquote>{props.children}</blockquote>
                </Quote>
              </Paragraph>
            </RightColumnContainer>
          </ColumnsContainer>
        )
      }
      return BlockContent.defaultSerializers.types.block(props)
    },
    contentColumns: ({ node }) => {
      const { columns, withDivider } = node
      return (
        <SectionContainer withDivider={withDivider}>
          {columns.map((column, index) => (
            <SectionColumnsContainer key={index}>
              <LeftColumnContainer>
                {column.title && (
                  <BlockContent
                    blocks={column.title}
                    serializers={leftColumnSerializer}
                    projectId={sanityConfig.projectId}
                    dataset={sanityConfig.dataset}
                  />
                )}
              </LeftColumnContainer>
              <RightColumnContainer>
                {column.body && (
                  <BlockContent
                    blocks={column.body}
                    serializers={rigthColumnSerializer}
                    projectId={sanityConfig.projectId}
                    dataset={sanityConfig.dataset}
                  />
                )}
              </RightColumnContainer>
            </SectionColumnsContainer>
          ))}
        </SectionContainer>
      )
    },
    imageBlock: props => {
      const { images } = props.node
      return (
        <ImageBLockContainer>
          <ThumbImageBlockContainer>
            {images.map((img, index) => (
              <ThumbImageContainer
                key={`imgBlock${index}`}
                paddingRight={images.length > 1 && index !== images.length - 1}
                paddingLeft={images.length > 1 && index !== 0}>
                <Image image={img} />
              </ThumbImageContainer>
            ))}
          </ThumbImageBlockContainer>
          <ImageCaptionOffsetContainer>
            <ImageCaptionContainer>
              <ImageCaption>{props.node.caption}</ImageCaption>
            </ImageCaptionContainer>
          </ImageCaptionOffsetContainer>
        </ImageBLockContainer>
      )
    },
    flickr: ({ node }) => {
      const { url, previewImage } = node
      return (
        <ColumnsContainer>
          <RightColumnContainer>
            <a data-flickr-embed="true" data-header="true" href={url}>
              <img src={previewImage} />
            </a>
            <script
              async
              src="//embedr.flickr.com/assets/client-code.js"
              charSet="utf-8"
            />
          </RightColumnContainer>
        </ColumnsContainer>
      )
    },
  },
}

const ProjectContent = (project = {}) => {
  return (
    <>
      <TitleContainer>
        <Title>
          {/* <Link href={`/projects/${project.previousProject}`}>
            <LeftArrow>{'<'}</LeftArrow>
          </Link> */}
          <div>{project.title}</div>
          <Link href={`/projects/${project.nextProject}`}>
            <RightArrow>{'>'}</RightArrow>
          </Link>
        </Title>
      </TitleContainer>

      <ImageFancyBox
        options={{
          infinite: false,
        }}>
        <Container>
          {project.content && (
            <BlockContent
              blocks={project.content}
              serializers={serializers}
              projectId={sanityConfig.projectId}
              dataset={sanityConfig.dataset}
            />
          )}

          {project.images && project.images.length > 0 && (
            <ThumbImageButtonContainer>
              {project.images.map((image, index) => {
                if (image._type === 'image')
                  return (
                    <ThumbImageContainer key={`thumbImg${index}`}>
                      <ColumnsContainer key={index}>
                        {image.caption && (
                          <LeftColumnContainer></LeftColumnContainer>
                        )}

                        <RightColumnForImageContainer>
                          <ImageCaptionOffsetContainer>
                            <ImageCaptionContainer>
                              <ImageCaption>{image.caption}</ImageCaption>
                            </ImageCaptionContainer>
                          </ImageCaptionOffsetContainer>

                          <ImageItemContainer>
                            <ImageButton
                              key={index}
                              data-fancybox="gallery"
                              data-src={image.url}
                              data-caption={image.caption}
                              className="button button--secondary">
                              <SanityImage imageData={image} />
                            </ImageButton>
                          </ImageItemContainer>
                        </RightColumnForImageContainer>
                      </ColumnsContainer>
                    </ThumbImageContainer>
                  )
                else if (image.images)
                  return (
                    <ThumbImageBlockContainer>
                      {image.images.map((img, imgIndex) => (
                        <ImageButton
                          key={`imgButton${imgIndex}`}
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
                            {imgIndex === 0 ? (
                              <ImageWithCaption image={img} />
                            ) : (
                              <SanityImage imageData={img} />
                            )}
                          </ThumbImageContainer>
                        </ImageButton>
                      ))}
                    </ThumbImageBlockContainer>
                  )
              })}
            </ThumbImageButtonContainer>
          )}

          {project.caseStudy && (
            <>
              <MakingOfTitle>
                <div>{`Making Of ${project.title}`}</div>
              </MakingOfTitle>
              <BlockContent
                blocks={project.caseStudy}
                serializers={serializers}
                projectId={sanityConfig.projectId}
                dataset={sanityConfig.dataset}
              />
            </>
          )}
        </Container>
      </ImageFancyBox>

      <TitleContainer>
        <Title>
          {/* <Link href={`/projects/${project.previousProject}`}>
            <LeftArrow>{'<'}</LeftArrow>
          </Link> */}
          <div>{project.title}</div>
          <Link href={`/projects/${project.nextProject}`}>
            <RightArrow>{'>'}</RightArrow>
          </Link>
        </Title>
      </TitleContainer>
    </>
  )
}

const Image = ({ image }) => {
  return (
    <ImageItemContainer>
      <ImageButton
        data-fancybox="gallery"
        data-src={urlForImage(image)}
        data-caption={image.caption}
        className="button button--secondary">
        {image.width && image.height ? (
          <SanityImage
            title={image.alt}
            imageData={image}
            layout={'fixed'}
            width={image.width}
            height={image.height}
            objectFit="contain"
          />
        ) : (
          <SanityImage title={image.alt} imageData={image} />
        )}
      </ImageButton>
    </ImageItemContainer>
  )
}

const ImageWithCaption = ({ image }) => {
  return (
    <ColumnsContainer>
      <ImageItemContainer>
        <ImageButton
          data-fancybox="gallery"
          data-src={urlForImage(image)}
          data-caption={image.caption}
          className="button button--secondary">
          {image.width && image.height ? (
            <SanityImage
              title={image.alt}
              imageData={image}
              layout={'fixed'}
              width={image.width}
              height={image.height}
              objectFit="contain"
            />
          ) : (
            <SanityImage title={image.alt} imageData={image} />
          )}
        </ImageButton>
      </ImageItemContainer>

      <ImageCaptionOffsetContainer>
        <ImageCaptionContainer>
          <ImageCaption>{image.caption}</ImageCaption>
        </ImageCaptionContainer>
      </ImageCaptionOffsetContainer>
    </ColumnsContainer>
  )
}

const VideoWithCaption = ({ video }) => {
  const isNative = useMemo(() => {
    return (
      video.url.search('facebook') === -1 &&
      video.url.search('vimeo') === -1 &&
      video.url.search('youtube') === -1 &&
      video.url.search('youtu.be') === -1
    )
  }, [video.url])

  return (
    <ColumnsContainer>
      <ImageItemContainer>
        <PlayerWrapper isNative={isNative}>
          <ReactPlayer
            url={video.url}
            width="100%"
            height={isNative ? 'auto' : '100%'}
            style={{
              position: isNative ? 'relative' : 'absolute',
              top: 0,
              left: 0,
            }}
            playsinline={true}
            playing={isMobile ? false : true}
            config={{
              vimeo: {
                playerOptions: {
                  controls: true,
                },
              },
              file: {
                attributes: {
                  muted: true,
                  loop: true,
                  autoplay: true,
                  controls: true,
                },
              },
            }}
          />
        </PlayerWrapper>
      </ImageItemContainer>

      <ImageCaptionOffsetContainer>
        <ImageCaptionContainer>
          <ImageCaption>{video.caption}</ImageCaption>
        </ImageCaptionContainer>
      </ImageCaptionOffsetContainer>
    </ColumnsContainer>
  )
}

const TitleContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
  },
  mq({
    paddingTop: 20,
    paddingRight: [60, 20],
    paddingLeft: [60, 20],
  }),
)

const Container = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
  mq({
    paddingBottom: [60, 20],
    paddingRight: [60, 20],
    paddingLeft: [60, 20],
  }),
)

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
  }),
)

const MakingOfTitle = styled.div(
  {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    fontSize: 24,
    justifyContent: 'space-between',
    borderBottom: '1px solid',
  },
  mq({
    paddingTop: 360,
    paddingBottom: spaces.small,
  }),
)

const LeftArrow = styled.a({
  position: 'absolute',
  left: 10,
})

const RightArrow = styled.a({})

const PlayerWrapper = styled.div(
  {
    position: 'relative',
    display: 'flex',
    flex: 1,
  },
  props => ({
    paddingTop: props.isNative ? 0 : `${100 / (1280 / 720)}%`,
  }),
)

const SectionContainer = styled.div(
  {
    paddingTop: 30,
    // paddingBottom: 15,
  },
  props => ({
    borderTop: props.withDivider ? '1px solid' : 'none',
    marginTop: props.withDivider ? 30 : 0,
  }),
)

const ColumnsContainer = styled.div(
  {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  mq({
    flexDirection: ['row', 'column'],
  }),
)

const SectionColumnsContainer = styled(ColumnsContainer)(
  mq({
    paddingBottom: spaces.small,
  }),
)

const LeftColumnContainer = styled.div({
  flex: 1,
})

const RightColumnContainer = styled.div({ flex: 2.5 })

const RightColumnForImageContainer = styled(RightColumnContainer)({
  position: 'relative',
  flexDirection: 'row',
})

const ImageBLockContainer = styled.div(
  {
    display: 'flex',
    position: 'relative',
  },
  mq({
    flexDirection: ['row', 'column'],
  }),
)

const ImageCaptionOffsetContainer = styled.div(
  {
    display: 'flex',
  },
  mq({
    paddingBottom: 5,
    paddingTop: 5,
    position: ['absolute', 'relative'],
    width: [150, 'unset'],
    height: ['100%', 'unset'],
    left: [-150, 'unset'],
  }),
)

const ImageCaptionContainer = styled.div(
  {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  mq({
    justifyContent: ['flex-end', 'center'],
    alignItems: ['flex-end', 'center'],
  }),
)

const ImageCaption = styled.div(
  typography.tinyMono,
  { whiteSpace: 'pre-wrap' },
  mq({
    paddingRight: [20, 0],
    textAlign: ['right', 'center'],
  }),
)

const ImageItemContainer = styled(RightColumnContainer)(
  { display: 'flex' },
  mq({
    paddingBottom: 5,
    paddingTop: 5,
  }),
)

const Paragraph = styled.div({
  paddingBottom: 20,
})

const MetadataParagraph = styled(Paragraph)(typography.tinyMono)

const Quote = styled.div({
  display: 'flex',
  flexDirection: 'row',
  fontFamily: fonts.ballpoint,
  fontSize: 17,
})

const QuoteMark = styled.div({
  fontSize: 60,
  lineHeight: 0.5,
  paddingRight: 5,
  color: 'darkgray',
})

const ThumbImageBlockContainer = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
})

const ThumbImageButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
})

const ImageButton = styled.button({
  flex: 1,
  border: 'none',
})

const SlideImageButton = styled.button({
  border: 'none',
  position: 'relative',
  width: '100%',
  height: 450,
})

const ThumbImageContainer = styled.div(
  { flex: 1 },
  mq({
    // paddingBottom: spaces.small,
  }),
  props => ({
    paddingRight: props.paddingRight ? 5 : 0,
    paddingLeft: props.paddingLeft ? 5 : 0,
  }),
)

const CarouselContainer = styled.div(
  {
    flex: 1,
  },
  mq({
    paddingBottom: spaces.small,
  }),
)

export default ProjectContent
