import React from 'react';
import bind from 'bind-decorator';
import slugify from '@ussu/common/src/libs/slugify';
import HeadingHero from '../../../components/HeadingHero';
import VisibleChildWatcher from '../../../components/VisibleChildWatcher';
import {
  ContentCard,
  ContentCardContent,
} from '../../../components/ContentCard';
import ContentNavigation, {
  generateTitlesFromStream,
} from '../../../components/ContentNavigation';
import StreamField from '../StreamField';
import { Page } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';
import { OneImage } from '../../../components/OneImage';
import { Heading, HeadingLevel } from '../../../components/Heading';

interface ISectionContentPage extends Page {
  title: string;
  sidebarBody: any;
  body: any;
  headingImage: FalmerImage;
  headingImageAsHero: boolean;
  contentsInSidebar: boolean;
}

export interface SectionContentPageProps {
  page: ISectionContentPage;
}

interface IState {
  visibleKey: null | string;
}

class SectionContentPage extends React.Component<
  SectionContentPageProps,
  IState
> {
  state = {
    visibleKey: null,
  };

  @bind
  handleVisibleChildChange(key: string) {
    this.setState({ visibleKey: key });
  }

  render() {
    const {
      page: {
        title,
        sidebarBody,
        body,
        headingImageAsHero,
        headingImage,
        contentsInSidebar,
      },
      page,
    } = this.props;
    return (
      <div className="LokiContainer">
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
                    <ContentCardContent>
                      <Heading level={HeadingLevel.h2}>
                        {block.value.heading}
                      </Heading>
                    </ContentCardContent>
                  )}
                  <ContentCardContent>
                    {block.value.body.map((
                      bodyItem: any, // todo
                    ) => (
                      <div
                        className="Prose"
                        dangerouslySetInnerHTML={{ __html: bodyItem.value }}
                      />
                    ))}
                  </ContentCardContent>
                </ContentCard>
              ))}
            </VisibleChildWatcher>
          </div>
        </div>
      </div>
    );
  }
}

export { SectionContentPage };
