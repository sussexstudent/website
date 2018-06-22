import React from 'react';
import { storiesOf } from '@storybook/react';
import { Storybase } from '~components/Storybase';
import { Tag, Tags } from '~components/Tags/index';

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
