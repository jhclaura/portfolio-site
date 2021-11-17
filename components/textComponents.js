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
