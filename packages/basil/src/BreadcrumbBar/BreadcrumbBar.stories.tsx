import React from 'react';

import { BreadcrumbBar } from '../../../website/src/components/BreadcrumbBar/index';

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

export default { title: 'Navigation|BreadcrumbBar' };

export const normal = () => <BreadcrumbBar>{crumbs}</BreadcrumbBar>;
