import { create } from '@storybook/theming';
import {colors} from "../../src/projects/app/vars";

export default create({
  base: 'light',

  colorPrimary: colors.brandYellow,
  colorSecondary: colors.brandBlue,

  // UI
  appContentBg: colors.greyBackground,
  appBg: 'white',
  appBorderColor: colors.greySlate,
  appBorderRadius: 6,

  // Typography
  fontBase: 'Larsseit, Helvetica',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: colors.greySlate,
  barSelectedColor: colors.greyWinter,
  barBg: colors.greySummer,

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Sussex Student',
  brandUrl: 'https://sussexstudent.com',
  brandImage: 'https://du9l8eemj97rm.cloudfront.net/branding-s18/android-chrome-512x512.png',
});
