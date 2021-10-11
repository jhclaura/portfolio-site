import CoverImage from './cover-image'
import PostTitle from './post-title'

export default function PageHeader({ title, coverImage }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} image={coverImage} />
      </div>
    </>
  )
}
