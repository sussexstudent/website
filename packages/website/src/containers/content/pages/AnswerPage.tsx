import React from 'react';
import { Page, StreamFieldData } from '../types';
import StreamField from '../../content/StreamField';
import { getHeadingsFromStreamField } from '../utils';
import ContentNavigation from '../../../components/ContentNavigation';
import slugify from '@ussu/common/src/libs/slugify';
import { RelatedContent } from '../../../components/RelatedContent';
import { StaffOwners } from '../../../components/StaffOwners';
import { KBContentBreadcrumbBar } from '../../../components/KBContentBreadcrumbBar';
import { format } from 'date-fns';

interface IAnswerPage extends Page {
  content: StreamFieldData;
  relatedLinks: StreamFieldData;
  staffOwners: StreamFieldData;

  root: Page;
  category: Page;
}

interface IProps {
  page: IAnswerPage;
}

const AnswerPage: React.FC<IProps> = ({
  page: { content, relatedLinks, staffOwners },
  page,
}) => {
  const headings = getHeadingsFromStreamField(content);

  return (
    <div className="LokiContainer">
      <KBContentBreadcrumbBar page={page} />
      <h1 className="type-trafalgar">{page.title}</h1>
      <div className="LayoutContent">
        <div className="LayoutContent__toc">
          {headings.length > 0 && (
            <ContentNavigation
              title="Navigation"
              items={headings.map((heading) => ({
                name: heading,
                anchor: slugify(heading),
                children: [],
              }))}
            />
          )}
          <div>
            Last updated at {format(new Date(page.lastPublishedAt), 'dd/MM/yy')}
          </div>
        </div>
        <div className="LayoutContent__main type-body-copy">
          <StreamField items={content} page={page} />
        </div>

        <aside className="LayoutContent__aside ContentSidebar">
          <div>
            <RelatedContent relatedContent={relatedLinks} />
          </div>

          <div>
            <StaffOwners staff={staffOwners} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AnswerPage;
