import React from 'react';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import { Link } from 'react-router-dom';

interface KBContentBreadcrumbBarProps {
  page: any;
}

export const KBContentBreadcrumbBar: React.FC<KBContentBreadcrumbBarProps> = ({
  page,
}) => (
  <BreadcrumbBar>
    <Link key={page.root.path} to={page.root.path}>
      {page.root.title}
    </Link>
    <Link key={page.category.path} to={page.category.path}>
      {page.category.title}
    </Link>
    <Link key={page.path} to={page.path}>
      {page.title}
    </Link>
  </BreadcrumbBar>
);
