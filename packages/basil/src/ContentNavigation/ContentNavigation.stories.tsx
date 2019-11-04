import { ContentNavigation } from '../../../website/src/components/ContentNavigation/index';
import slugify from '@ussu/common/src/libs/slugify';

const headings = [
  'Navigation child 1',
  'Navigation child 2',
  'Navigation child 3',
  'Navigation child 4',
];

export default { title: 'Content Navigation' };

export const Default = () => (
  <ContentNavigation
    title="Navigation"
    items={headings.map((heading) => ({
      name: heading,
      anchor: slugify(heading),
      children: [],
    }))}
  />
);
