import React from 'react';
import OrgansiationCard from '../OrgansiationCard';

export default function OrgansiationGrid(props) {
  const { organsiations } = props;
  return (
    <ul className="OrgansiationGrid">
      {organsiations.map(org => <OrgansiationCard org={org} key={org.id} />)}
    </ul>
  );
}

const orgShape = React.PropTypes.shape({
  link: React.PropTypes.string,
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.shape({
    src: React.PropTypes.string,
  }),
});

OrgansiationGrid.propTypes = {
  organsiations: React.PropTypes.arrayOf(orgShape).isRequired,
};
