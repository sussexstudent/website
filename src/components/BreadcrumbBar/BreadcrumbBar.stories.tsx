import React from 'react';
import { storiesOf } from '@storybook/react';
import {BreadcrumbBar} from "~components/BreadcrumbBar/index";

storiesOf('BreadcrumbBar', module)
  .add('one level', () => (
    <BreadcrumbBar>
      <a href="https://sussexstudent.com/">Knowledge Base</a>
    </BreadcrumbBar>
  ))
  .add('multiple levels', () => (
    <BreadcrumbBar>
      <a href="https://sussexstudent.com/">Knowledge Base</a>
      <a href="https://sussexstudent.com/">Accounts</a>
      <a href="https://sussexstudent.com/">Reactivating your account</a>
    </BreadcrumbBar>
  ))
