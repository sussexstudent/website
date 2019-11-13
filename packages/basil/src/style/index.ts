export const TYPE_PRIMARY =
  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
export const TYPE_SECONDARY = `'Larsseit', ${TYPE_PRIMARY}`;

export const COLORS = {
  BRAND_GREEN: '#1db8a4',
  BRAND_BLUE: '#27428c',
  BRAND_RED: '#ee534f',
  BRAND_PINK: '#fdd2c6',
  BRAND_CORAL: '#f1766d',
  BRAND_CORAL__LIGHT: '#f8b2b0',
  BRAND_PRIMARY: '#27363e',

  GREY_SAD_SLATE: 'rgba(38, 38, 38, 1)',
  GREY_SLATE: '#323232',
  GREY_WORST_WINTER: '#636363',
  GREY_WINTER: '#9b9b9b',
  GREY_SPRING: '#ececec',
  GREY_SUMMER: '#f5f5f5',
  GREY_BG: '#fafafa',

  EXTERNAL_TWITTER: '#50abf1',
  EXTERNAL_SNAPCHAT: '#fff900',

  WHITE: '#ffffff',
  BLACK: '#000000',
};

export const MQ = Object.entries({
  Small: 480,
  Medium: 768,
  Large: 960,
  ExtraLarge: 1100,
}).reduce((map, [name, value]) => {
  map[name] = `@media (min-width: ${value}px)`;
  return map;
}, ({} as any) as { [name: string]: string });

export enum Layers {
  Header_sideSearch = 155,
  Header_backdrop__isSearch = 152,
  Header_advertBar = 151,
  Header_mobile = 150,
  Header_sideMenu = 140,
  Header_backdrop = 130,
  Search_headerNav__mobile = 125,
  Search_input = 120,
  MobileSearch = 150,
  Search_headerNav = 115,
  Search_header = 110,
  Search = 100,
  Modal = 100,
  ModalBack = 75,
  Search_backdrop = 75,
  GlobalNotice = 65,
  UserBar_dropdown = 50,
  Sticky_sectionHeaderMonth = 41,
  Sticky_sectionHeaderDay = 40,
  FauxLinkBreakout = 4,
  FauxLink = 3,
  Tweet_quoted = 2,
  Tweet_link = 1,
  Tweet_backLink = 0,
}
