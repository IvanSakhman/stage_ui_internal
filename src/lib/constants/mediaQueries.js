// hardcoded breakpoints are the same as antd defines, https://github.com/ant-design/ant-design/blob/master/components/_util/responsiveObserver.ts#L8

import breakpoints from './breakpointsConfig'

const SCREEN = {
  xs: '@media screen and (max-width: 575px)',
  sm: '@media screen and (min-width: 576px)',
  md: '@media screen and (min-width: 768px)',
  lg: `@media screen and (min-width: ${breakpoints.screenLG}px)`,
  xl: `@media screen and (min-width: ${breakpoints.screenXL}px)`,
  xxl: `@media screen and (min-width: ${breakpoints.screenXXL}px)`
}

export const MEDIA = { screen: SCREEN }
