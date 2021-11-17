import Link from 'next/link'
import { styled, mq, spaces, typography, colors } from '../styles'
import ProjectCard from './projectCard'

const ProjectCards = ({ projects, currentTag }) => {
  const tags = currentTag === undefined ? undefined : currentTag.split(',')
  return (
    <>
      <TagsContainer>
        {tags && (
          <>
            <TagContainer>
              <div>{`☞ `}</div>
              {tags.map((t, i) => (
                <Category key={`tagKey${i}`}>{`#${t}`}</Category>
              ))}
            </TagContainer>
            <TagContainer>
              <div>{`☞ `}</div>
              <Link href={`/`}>
                <Category>#all</Category>
              </Link>
            </TagContainer>
          </>
        )}
      </TagsContainer>
      <CardsContainer>
        {projects.map((p, index) => (
          <ProjectCard key={index} {...p} />
        ))}
      </CardsContainer>
    </>
  )
}

const TagsContainer = styled.div(
  {
    display: 'flex',
    height: 50,
    maxWidth: (220 + 80) * 3,
    margin: 'auto',
    justifyContent: 'space-between',
  },
  mq({
    paddingTop: 20,
    paddingLeft: [40, 20],
    paddingRight: [40, 20],
  }),
)

const TagContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
})

const CardsContainer = styled.div(
  {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mq({
    paddingTop: spaces.medium,
    paddingBottom: spaces.medium,
  }),
)

const Category = styled.a(typography.tinyMono, {
  marginLeft: 10,
  color: colors.grey,
  borderBottom: 'none',
  '&:hover': {
    color: colors.green,
    borderBottom: 'none',
  },
})

export default ProjectCards
