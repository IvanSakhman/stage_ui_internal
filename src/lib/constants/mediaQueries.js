// same breakpoints as antd uses, https://github.com/ant-design/ant-design/blob/master/components/_util/responsiveObserve.ts#L8

const SCREEN = {
  xs: '@media screen and (max-width: 575px)',
  sm: '@media screen and (min-width: 576px)',
  md: '@media screen and (min-width: 768px)',
  lg: '@media screen and (min-width: 992px)',
  xl: '@media screen and (min-width: 1281px)', // antd uses 1200, MDPI screens are 1280 though :/
  xxl: '@media screen and (min-width: 1600px)'
}

export const MEDIA = { screen: SCREEN }
