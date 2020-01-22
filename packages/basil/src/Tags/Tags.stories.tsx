import React from 'react';
import { Tag, Tags } from '../../../website/src/components/Tags/index';

export default { title: 'Tags' };
export const Standard: React.FC = () => (
  <Tags>
    <Tag>
      <a href="#">Awesome</a>
    </Tag>
    <Tag>
      <a href="#">Foo</a>
    </Tag>
    <Tag>
      <a href="#">Thing</a>
    </Tag>
  </Tags>
);
