import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { getClient } from '../lib/sanity.server'

const SanityImage = ({
  className,
  title,
  imageData,
  layout,
  objectFit,
  width,
  height,
  customImageBuilder,
}) => {
  const imageProps = useNextSanityImage(getClient(), imageData, {
    imageBuilder: customImageBuilder,
  })

  const image = imageData ? (
    layout && objectFit ? (
      <>
        {layout === 'fill' && objectFit === 'contain' ? (
          <Image
            alt={title}
            className={className}
            src={imageProps.src}
            loader={imageProps.loader}
            layout={layout}
            objectFit={objectFit}
            sizes="(max-width: 800px) 100vw, 800px"
          />
        ) : (
          <Image
            alt={title}
            className={className}
            src={imageProps.src}
            loader={imageProps.loader}
            layout={layout}
            objectFit={objectFit}
            width={width}
            height={height}
            sizes="(max-width: 800px) 100vw, 800px"
          />
        )}
      </>
    ) : (
      <Image
        alt={title}
        className={className}
        {...imageProps}
        sizes="(max-width: 800px) 100vw, 800px"
      />
    )
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return image
}

export default SanityImage
