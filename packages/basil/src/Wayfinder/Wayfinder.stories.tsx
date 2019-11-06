import {
  Wayfinder,
  WayfinderItem,
  WayfinderTopLevel,
  WayfinderSecondLevel,
  WayfinderThirdLevel,
} from '@ussu/website/src/components/Wayfinder';

export default { title: 'Page|Wayfinder' };

export const Level1Stub = () => (
  <Wayfinder>
    <WayfinderTopLevel title={'Get involved'} to={'#'} />
  </Wayfinder>
);

export const Level1WithChildren = () => (
  <Wayfinder>
    <WayfinderTopLevel title={'Get involved'} to={'#'}>
      <WayfinderItem to={'/sos'}>Societies</WayfinderItem>
      <WayfinderItem to={'/sports'}>Sports</WayfinderItem>
      <WayfinderItem to={'/vol'}>Volunteering</WayfinderItem>
    </WayfinderTopLevel>
  </Wayfinder>
);

export const Level2WithChildren = () => (
  <Wayfinder>
    <WayfinderTopLevel title={'Get involved'} to={'#'}>
      <WayfinderItem to={'/'}>Societies</WayfinderItem>
      <WayfinderItem to={'/sports'}>Sports</WayfinderItem>
      <WayfinderItem to={'/vol'}>Volunteering</WayfinderItem>
    </WayfinderTopLevel>
    <WayfinderSecondLevel title={'Societies'} to={'/'}>
      <WayfinderItem to={'/discover'}>Discover</WayfinderItem>
      <WayfinderItem to={'/handbook'}>Handbook</WayfinderItem>
      <WayfinderItem to={'/you-groups'}>Your Groups</WayfinderItem>
    </WayfinderSecondLevel>
  </Wayfinder>
);

export const Level3WithChildren = () => (
  <Wayfinder>
    <WayfinderTopLevel title={'Get involved'} to={'#'}>
      <WayfinderItem to={'/'}>Societies</WayfinderItem>
      <WayfinderItem to={'/sports'}>Sports</WayfinderItem>
      <WayfinderItem to={'/vol'}>Volunteering</WayfinderItem>
    </WayfinderTopLevel>
    <WayfinderSecondLevel title={'Societies'} to={'/'}>
      <WayfinderItem to={'/discover'}>Discover</WayfinderItem>
      <WayfinderItem to={'/handbook'}>Handbook</WayfinderItem>
      <WayfinderItem to={'/you-groups'}>Your Groups</WayfinderItem>
    </WayfinderSecondLevel>
    <WayfinderThirdLevel title={'Handbook'} to={'/'}>
      <WayfinderItem to={'/Guides'}>Guides</WayfinderItem>
      <WayfinderItem to={'/handbook'}>Reference</WayfinderItem>
      <WayfinderItem to={'/you-groups'}>Start a socieity</WayfinderItem>
    </WayfinderThirdLevel>
  </Wayfinder>
);
