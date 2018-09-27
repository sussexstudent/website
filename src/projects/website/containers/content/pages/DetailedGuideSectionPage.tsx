import React from 'react';
import { Page, StreamFieldData } from '~website/containers/content/types';
import ContentNavigation from '~components/ContentNavigation';
import { RelatedContent } from '~website/components/RelatedContent';
import { StaffOwners } from '~website/components/StaffOwners';
import StreamField from '~website/containers/content/StreamField';
import {BreadcrumbBar} from "~components/BreadcrumbBar";
import {Link} from 'react-router-dom';

interface DetailPage extends Page<DetailPageSection[]> {
  content: StreamFieldData;
  relatedLinks: StreamFieldData;
  staffOwners: StreamFieldData;

  root: Page;
  category: Page;

}

interface DetailPageSection extends Page {
  content: StreamFieldData;
  parentPage: DetailPage
}


interface IProps {
  page: DetailPageSection; // todo
}

const DetailedGuideSection: React.SFC<
  { page: DetailPageSection }
> = (props) => <StreamField items={props.page.content} page={props.page} />;

class DetailedGuideSectionPage extends React.Component<IProps> {
  render() {
    const {
      page: { parentPage: {
        subPages,
        relatedLinks,
        staffOwners,
      } },
      page,
    } = this.props;
    return (
      <div className="LokiContainer">
        <BreadcrumbBar>
          <Link key={page.parentPage.root.path} to={page.parentPage.root.path}>
            {page.parentPage.root.title}
          </Link>
          <Link key={page.parentPage.category.path} to={page.parentPage.category.path}>
            {page.parentPage.category.title}
          </Link>
          <Link key={page.parentPage.path} to={page.parentPage.path}>
            {page.parentPage.title}
          </Link>
          <Link key={page.path} to={page.path}>
            {page.title}
          </Link>
        </BreadcrumbBar>

        <h2 className="type-great-primer">{page.parentPage.title}</h2>
        <h1 className="type-trafalgar" style={{ marginTop: '0.5rem', }}>{page.title}</h1>
        <div className="LayoutContent">
          <div className="LayoutContent__toc">
            <ContentNavigation
              title="Sections"
              items={subPages.map((subPage: DetailPageSection) => ({
                name: subPage.title,
                to: subPage.path,
                anchor: subPage.slug,
                children: [],
              }))}
            />
          </div>
          <div className="LayoutContent__main">
            <DetailedGuideSection page={page} />
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
  }
}

export default DetailedGuideSectionPage;
