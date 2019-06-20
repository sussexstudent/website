import React from 'react';
import { Page } from '../types';
import { Sectionbar, SectionbarItem } from '../../../components/Sectionbar';
import { Link } from 'react-router-dom';

interface IOutletIndex extends Page<Page[]> {}

interface IOutletPage extends Page {

  section: IOutletIndex;
}

interface OfficerOverviewPageProps {
  page: IOutletPage;
}

export const OfficerOverviewPage: React.FC<OfficerOverviewPageProps> = ({ page }) => {

  return (
    <div>
      <Sectionbar title={page.section.title} titleLink={page.section.path}>
        {page.section.subPages.map((page) => (
          <SectionbarItem key={page.path}>
            <Link to={page.path}>{page.title}</Link>
          </SectionbarItem>
        ))}
      </Sectionbar>


      <div className="LokiContainer">
        <h1>Officer page</h1>
      </div>
    </div>
  );
};
