import React from 'react';
import { storiesOf } from '@storybook/react';
import { BreadcrumbBar } from './index';

const crumbs = [
  <a href="https://sussexstudent.com/" key="kb">
    Knowledge Base
  </a>,
  <a href="https://sussexstudent.com/" key="acc">
    Accounts
  </a>,
  <a href="https://sussexstudent.com/" key="login">
    Log in issues
  </a>,
  <a href="https://sussexstudent.com/" key="reactive">
    Reactivating your account
  </a>,
];

storiesOf('BreadcrumbBar', module).add('default', () => {
  return <BreadcrumbBar>{crumbs.slice(0, 3)}</BreadcrumbBar>;
});
