import React from 'react';
import HeadingHero from '../HeadingHero';
import ContentCard from '../../../../generator/components/ContentCard';

function ContentNavigation({ items }) {
  return (
    <ContentCard>
      <h3>Navigation</h3>
      <ul>
        {items.map(item => (
          <li>
            <a href={`#${item.anchor}`}>{item.name}</a>
          </li>
        ))}
      </ul>
    </ContentCard>
  );
}

function anchorize(text) {
  return text.replace(' ', '-').toLowerCase();
}

function generateTitlesFromStream(body) {
  return body.map(block => {
    const heading = block.value.heading;
    return { name: heading, anchor: anchorize(heading) };
  });
}

function SectionContentPage({
  data: { title, sidebarBody, body, contentsInSidebar },
}) {
  return (
    <div className="Layout Layout--sidebar-left">
      <div>
        <aside>
          {contentsInSidebar
            ? <ContentNavigation items={generateTitlesFromStream(body)} />
            : null}
          {sidebarBody.map(() => <h2>block</h2>)}
        </aside>
      </div>
      <div>
        <HeadingHero title={title} />
        {body.map(block => (
          <ContentCard anchor={anchorize(block.value.heading)}>
            <h2 className="Heading Heading--highlight">
              {block.value.heading}
            </h2>
          </ContentCard>
        ))}
      </div>
    </div>
  );
}

export default SectionContentPage;
