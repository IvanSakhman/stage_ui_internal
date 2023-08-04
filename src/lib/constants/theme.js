import { COLORS } from './index'

const customMenuTokens = {
  topNavBackground: COLORS.ternaryDark,
  topNavTextDefault: COLORS.white,
  topNavTextActive: COLORS.navLink,
  sideMenuBackground: COLORS.ternary,
  sideMenuSubMenuBackground: COLORS.ternaryDark,
  sideMenuItemDefault: COLORS.sideMenuDefault,
  sideMenuItemOpen: COLORS.white,
  sideMenuItemActive: COLORS.navLink
}

export default {
  token: {
    colorText: COLORS.text,
    colorPrimary: COLORS.primary,
    colorSuccess: COLORS.success,
    colorError: COLORS.error,
    colorInfo: COLORS.info,
    colorWarning: COLORS.warning,
    ...customMenuTokens,
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontFamilyCode: 'IBM Plex Mono, source-code-pro, monospace',
    Button: {
      controlOutlineWidth: '0' // disable Button box-shadow
    }
  }
}
