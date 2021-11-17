import SanityImage from './sanityImage'
import Link from 'next/link'
import { styled, colors, typography, mq } from '../styles'

const ProjectCard = ({ title, mainImage, categories, categorySlugs, slug }) => {
  return (
    <Container>
      <Link href={`/projects/${slug}`}>
        <ImageContainer>
          <SanityImage
            slug={slug}
            title={title}
            imageData={mainImage}
            layout={'fill'}
            objectFit={'cover'}
          />
        </ImageContainer>
      </Link>

      <Title>
        <Link href={`/projects/${slug}`}>
          <TitleText>{title}</TitleText>
        </Link>
      </Title>
      <CategoriesContainer>
        {categories &&
          categories.map((c, i) => (
            <Link
              key={`categories${i}`}
              href={`/projects?tag=${categorySlugs[i]}`}>
              <Category>{`#${c.toLowerCase()}`}</Category>
            </Link>
          ))}
      </CategoriesContainer>
    </Container>
  )
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 40,
  paddingRight: 40,
  paddingBottom: 40,
})

const ImageContainer = styled.div(
  {
    position: 'relative',
    borderBottom: 'none',
    cursor: 'pointer',
  },
  mq({
    width: [220, '90vw'],
    height: [(220 / 4) * 3, 'calc(90vw * (3/4))'],
  }),
)

const CategoriesContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mq({
    width: [220, '90vw'],
  }),
)

const Category = styled.a(typography.tinyMono, {
  marginRight: 10,
  color: colors.grey,
  borderBottom: 'none',
  '&:hover': {
    color: colors.green,
    borderBottom: 'none',
  },
})

const Title = styled.h3(
  {},
  mq({
    width: [220, '90vw'],
  }),
)

const TitleText = styled.a({
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
})

export default ProjectCard
