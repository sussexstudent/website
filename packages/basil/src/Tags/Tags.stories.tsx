import { storiesOf } from '@storybook/react';
import { Storybase } from '../../../website/src/components/Storybase';
import { Tag, Tags } from '../../../website/src/components/Tags/index';

storiesOf('Tags', module)
  .addDecorator(Storybase())
  .add('empty', () => (
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
  ));
