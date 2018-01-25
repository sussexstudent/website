import React from 'react';
import { storiesOf } from '@storybook/react';
// @ts-ignore
import { withKnobs, number } from '@storybook/addon-knobs/react';
import {BreadcrumbBar} from "~components/BreadcrumbBar/index";

const crumbs = [
  <a href="https://sussexstudent.com/" key="kb">Knowledge Base</a>,
  <a href="https://sussexstudent.com/" key="acc">Accounts</a>,
  <a href="https://sussexstudent.com/" key="login">Log in issues</a>,
  <a href="https://sussexstudent.com/" key="reactive">Reactivating your account</a>,
];

storiesOf('BreadcrumbBar', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const level = number('levels', 3, { range: true, min: 1, max: crumbs.length, step: 1});
    return (
      <BreadcrumbBar>
        {crumbs.slice(0, level)}
      </BreadcrumbBar>
    );
  });
