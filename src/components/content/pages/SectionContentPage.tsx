import React from 'react';
import slugify from '~libs/slugify';
import HeadingHero from '~components/HeadingHero';
import VisibleChildWatcher from '~components/VisibleChildWatcher';
import ContentCard from '~components/ContentCard';
import ContentNavigation, {
  generateTitlesFromStream,
} from '~components/ContentNavigation';
import StreamField from '~components/content/StreamField';
import { Page } from '~components/content/types';
import { FalmerImage } from '../../../types/events';
import { OneImage } from '~components/OneImage';

interface IProps {
  page: Page<{
    title: string;
    sidebarBody: any;
    body: any;
    headingImage: FalmerImage;
    headingImageAsHero: boolean;
    contentsInSidebar: boolean;
  }>;
}

interface IState {
  visibleKey: null | string;
}

class SectionContentPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.handleVisibleChildChange = this.handleVisibleChildChange.bind(this);
    this.state = {
      visibleKey: null,
    };
  }

  handleVisibleChildChange(key: string) {
    this.setState({ visibleKey: key });
  }

  render() {
    const {
      page: {
        title,
        data: {
          sidebarBody,
          body,
          headingImageAsHero,
          headingImage,
          contentsInSidebar,
        },
      },
      page,
    } = this.props;
    return (
      <div className="Layout Layout--sidebar-left">
        <div>
          <aside>
            {contentsInSidebar ? (
              <ContentNavigation
                items={generateTitlesFromStream(body)}
                activeKey={this.state.visibleKey || undefined}
              />
            ) : null}
            <StreamField page={page} items={sidebarBody} />
          </aside>
        </div>
        <div>
          {headingImageAsHero ? (
            <div style={{ marginBottom: '1rem' }}>
              <OneImage
                src={headingImage.resource}
                aspectRatio={headingImage}
                alt={title}
              />
            </div>
          ) : (
            <HeadingHero title={title} imageURL={headingImage.resource} />
          )}

          <VisibleChildWatcher onChange={this.handleVisibleChildChange}>
            {body.map((
              block: any, // todo
            ) => (
              <ContentCard anchor={slugify(block.value.heading)} bleed>
                {block.value.headingImage ? (
                  <div>
                    <OneImage
                      src={block.value.headingImage.resource}
                      aspectRatio={block.value.headingImage}
                      alt={block.value.heading}
                    />
                  </div>
                ) : (
                  <div className="ContentCard__content">
                    <h2 className="Heading Heading--highlight">
                      {block.value.heading}
                    </h2>
                  </div>
                )}
                <div className="ContentCard__content">
                  {block.value.body.map((
                    bodyItem: any, // todo
                  ) => (
                    <div
                      className="Prose"
                      dangerouslySetInnerHTML={{ __html: bodyItem.value }}
                    />
                  ))}
                </div>
              </ContentCard>
            ))}
          </VisibleChildWatcher>
        </div>
      </div>
    );
  }
}

export { SectionContentPage };
