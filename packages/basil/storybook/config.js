import {Storybase} from "@ussu/website/src/components/Storybase";

if (module.hot) {
  module.hot.accept();
}

import { configure, addDecorator } from '@storybook/react';
import '../../common/src/css/main.css';

//addParameters({
 // options: { theme: unionTheme}
//});


addDecorator(Storybase());

configure(require.context('../src', true, /\.stories\.tsx$/), module);

