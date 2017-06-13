import React from 'react';

const ContentCard = ({ anchor = null, children }) => (
  <div className="ContentCard">
    {anchor !== null
      ? <span className="u-position-anchor" id={anchor} />
      : null}
    {children}
  </div>
);

ContentCard.propTypes = {
  children: React.PropTypes.node.isRequired,
};

ContentCard.description = `
  A simple card for seperating different sections visually.
`;

ContentCard.examples = {
  standard: (
    <ContentCard>
      <p>Hello there!</p>
    </ContentCard>
  ),
};

ContentCard.level = 'block';

export default ContentCard;
