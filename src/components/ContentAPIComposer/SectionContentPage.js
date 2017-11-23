import React from 'react';
import slugify from '~libs/slugify';
import HeadingHero from '~components/HeadingHero';
import VisibleChildWatcher from '~components/VisibleChildWatcher';
import ContentCard from '~components/ContentCard';
import ContentNavigation, {
  generateTitlesFromStream,
} from '~components/ContentNavigation';
import getComponent from './getComponent';

/* eslint-disable react/no-danger */
class SectionContentPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleVisibleChildChange = this.handleVisibleChildChange.bind(this);
    this.state = {
      visibleKey: null,
    };
  }

  handleVisibleChildChange(key) {
    this.setState({ visibleKey: key });
  }

  render() {
    const {
      data: { title, sidebarBody, body, headingImage, contentsInSidebar },
    } = this.props;
    return (
      <div className="Layout Layout--sidebar-left">
        <div>
          <aside>
            {contentsInSidebar ? (
              <ContentNavigation
                items={generateTitlesFromStream(body)}
                activeKey={this.state.visibleKey}
              />
            ) : null}
            {sidebarBody.map(getComponent)}
          </aside>
        </div>
        <div>
          <HeadingHero title={title} imageURL={headingImage.resource} />
          <VisibleChildWatcher onChange={this.handleVisibleChildChange}>
            {body.map(block => (
              <ContentCard anchor={slugify(block.value.heading)}>
                <h2 className="Heading Heading--highlight">
                  {block.value.heading}
                </h2>
                {block.value.body.map(bodyItem => (
                  <div
                    className="Prose"
                    dangerouslySetInnerHTML={{ __html: bodyItem.value }}
                  />
                ))}
              </ContentCard>
            ))}
          </VisibleChildWatcher>
        </div>
      </div>
    );
  }
}
/* eslint-enable react/no-danger */

export default SectionContentPage;
