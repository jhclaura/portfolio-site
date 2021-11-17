import { useTheme as emotionUseTheme } from '@emotion/react'
import { default as emotionStyled } from '@emotion/styled'
import facepaint from 'facepaint'
import Theme, { fonts } from './Themes.js'

export const styled = emotionStyled

export const useTheme = () => {
  return emotionUseTheme()
}

export const mq = facepaint([
  '@media(max-width: 800px)',
  '@media(max-width: 500px)',
  '@media(max-width: 330px)',
])

export const typography = {
  extraLargeSerif: mq({
    fontFamily: fonts.serif,
    fontSize: ['112px', '64px'],
    lineHeight: ['101px', 0.9],
  }),
  largerSerif: mq({
    fontFamily: fonts.serif,
    fontSize: ['5em', '4.5em'],
    lineHeight: [1, 0.9],
  }),
  largeSerif: mq({
    fontFamily: fonts.serif,
    fontSize: ['64px'],
    lineHeight: [0.9],
  }),
  mediumSerif: mq({
    fontFamily: fonts.serif,
    fontSize: ['48px', '36px'],
    lineHeight: [1.2],
  }),
  smallSerif: mq({
    fontFamily: fonts.serif,
    fontSize: ['32px', '18px'],
    lineHeight: [1.2],
  }),
  tinySerif: mq({
    fontFamily: fonts.serif,
    fontSize: ['24px'],
    lineHeight: [1.2],
  }),
  largeSans: mq({
    fontFamily: fonts.sansSerif,
    fontSize: ['64px', '32px'],
    lineHeight: [1.1],
  }),
  mediumSans: mq({
    fontFamily: fonts.sansSerif,
    fontSize: ['42px', '22px'],
    lineHeight: [1.2],
  }),
  smallSans: mq({
    fontFamily: fonts.sansSerif,
    fontSize: ['22px', '16px'],
    lineHeight: [1.3],
  }),
  smallMono: mq({
    fontFamily: fonts.mono,
    fontSize: ['16px', '14px'],
    lineHeight: [1.3],
  }),
  tinyMono: mq({
    fontFamily: fonts.mono,
    fontSize: ['14px', '15px'],
    lineHeight: [1.3, 1.4],
  }),
}

export const spaces = {
  large: [100, 50, 50],
  medium: [60, 30, 30],
  small: [20, 15, 15],
}

export const absoluteCenter = (width, height) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginLeft: -width / 2,
  marginTop: -height / 2,
  width: width,
  height: height,
})

export const absoluteHorizontalCenter = (width, height) => ({
  position: 'absolute',
  left: '50%',
  marginLeft: -width / 2,
  width: width,
  height: height,
})

export const theme = Theme

export { fonts, colors } from './Themes.js'
