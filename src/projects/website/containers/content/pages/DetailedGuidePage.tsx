import React from 'react';
import { Page, StreamFieldData } from '~website/containers/content/types';
import ContentNavigation from '~components/ContentNavigation';
import { RelatedContent } from '~website/components/RelatedContent';
import { StaffOwners } from '~website/components/StaffOwners';
import StreamField from '~website/containers/content/StreamField';
import { RouteComponent } from '~types/routes';
import { KBContentBreadcrumbBar } from '~website/components/KBContentBreadcrumbBar';
import { Switch, Route } from 'react-router-dom';

interface DetailPageSection extends Page {
  content: StreamFieldData;
}
interface DetailPage extends Page<DetailPageSection[]> {
  content: StreamFieldData;
  relatedLinks: StreamFieldData;
  staffOwners: StreamFieldData;

  root: Page;
  category: Page;
}

interface IProps {
  page: DetailPage; // todo
}

const DetailedGuideSection: React.SFC<
  { page: DetailPageSection } & RouteComponent
> = (props) => <StreamField items={props.page.content} page={props.page} />;

class DetailedGuidePage extends React.Component<IProps> {
  render() {
    const {
      page: { relatedLinks, staffOwners, subPages, path },
      page,
    } = this.props;
    return (
      <div className="LokiContainer">
        <KBContentBreadcrumbBar page={page} />

        <h1 className="type-trafalgar">{page.title}</h1>
        <div className="LayoutContent">
          <div className="LayoutContent__toc">
            <ContentNavigation
              title="Sections"
              items={subPages.map((subPage: DetailPageSection) => ({
                name: subPage.title,
                to: path + subPage.slug,
                anchor: subPage.slug,
                children: [],
              }))}
            />
          </div>
          <div className="LayoutContent__main">
            <Switch>
              <Route
                component={DetailedGuideSection}
                key={subPages[0].slug}
                path={path}
                page={subPages[0]}
                exact
              />
              {subPages.map((subPage) => (
                <Route
                  component={DetailedGuideSection}
                  key={subPage.slug}
                  path={path + subPage.slug}
                  page={subPage}
                />
              ))}
            </Switch>
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

export default DetailedGuidePage;
