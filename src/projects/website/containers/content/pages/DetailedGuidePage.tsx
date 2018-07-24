import React from 'react';
import { Page, StreamFieldData } from '~website/containers/content/types';
import ContentNavigation from '~components/ContentNavigation';
import { RelatedContent } from '~website/components/RelatedContent';
import { StaffOwners } from '~website/components/StaffOwners';
import StreamField from '~website/containers/content/StreamField';
import { Switch, Route } from 'react-router';

interface DetailPageSection extends Page<{ content: StreamFieldData }> {}
interface DetailPage
  extends Page<{
      content: StreamFieldData;
      relatedLinks: StreamFieldData;
      staffOwners: StreamFieldData;
    }> {
  subPages: DetailPageSection[];
}

interface IProps {
  page: DetailPage; // todo
}

const DetailedGuideSection: React.SFC<{ page: DetailPageSection }> = (
  props,
) => <StreamField items={props.page.data.content} page={props.page} />;

class DetailedGuidePage extends React.Component<IProps> {
  render() {
    const {
      page: {
        data: { content, relatedLinks, staffOwners },
        subPages,
        path,
      },
      page,
    } = this.props;
    console.log({ content });
    return (
      <div className="LokiContainer">
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
                key={subPages[0].slug}
                path={path}
                component={() => <DetailedGuideSection page={subPages[0]} />}
                exact
              />
              {subPages.map((subPage) => (
                <Route
                  key={subPage.slug}
                  path={path + subPage.slug}
                  component={() => <DetailedGuideSection page={subPage} />}
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
