import { styled, colors, typography, mq, spaces } from '../styles'

export const CategoriesContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mq({
    width: [220, '90vw'],
  }),
)

export const Category = styled.a(typography.tinyMono, {
  marginRight: 10,
  color: colors.grey,
  borderBottom: 'none',
  '&:hover': {
    color: colors.green,
    borderBottom: 'none',
  },
})

export const TitleContainer = styled.div(
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

export const Container = styled.div(
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

export const Title = styled.div(
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
