import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { getClient } from '../lib/sanity.server'

const SanityImage = ({ title, imageData, layout, objectFit }) => {
  const imageProps = useNextSanityImage(getClient(), imageData)

  const image = imageData ? (
    layout && objectFit ? (
      <Image
        alt={`Cover Image for ${title}`}
        src={imageProps.src}
        loader={imageProps.loader}
        layout={layout}
        objectFit={objectFit}
        sizes="(max-width: 800px) 100vw, 800px"
      />
    ) : (
      <Image
        alt={`Cover Image for ${title}`}
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
