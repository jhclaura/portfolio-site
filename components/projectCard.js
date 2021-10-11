import Date from '../components/date'
import CoverImage from './cover-image'
import SanityImage from './sanityImage'
import Link from 'next/link'
import { styled, colors } from '../styles'

const ProjectCard = ({ title, mainImage, categories, slug }) => {
  return (
    <Container>
      <Link href={`/projects/${slug}`}>
        {/* <a aria-label={title}> */}
        <ImageContainer>
          <SanityImage
            slug={slug}
            title={title}
            imageData={mainImage}
            layout={'fill'}
            objectFit={'cover'}
          />
        </ImageContainer>
        {/* </a> */}
      </Link>

      <Title>
        <Link href={`/projects/${slug}`}>
          <TitleText>{title}</TitleText>
        </Link>
      </Title>
      <CategoriesContainer>
        {categories &&
          categories.map((c, i) => (
            <Category key={`categories${i}`}>{`#${c.toLowerCase()}`}</Category>
          ))}
      </CategoriesContainer>
    </Container>
  )
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 60,
  paddingBottom: 40,
})

const ImageContainer = styled.div({
  position: 'relative',
  width: 220,
  height: (220 / 4) * 3,
  // aspectRatio: 4 / 3,
  // minHeight: (300 / 4) * 3,
  borderBottom: 'none',
  cursor: 'pointer',
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

const Title = styled.h3({
  width: 220,
})

const TitleText = styled.a({
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
})

export default ProjectCard
