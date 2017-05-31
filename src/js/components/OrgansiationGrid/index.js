import React from 'react';
import PropTypes from 'prop-types';
import OrgansiationCard from '../OrgansiationCard';

export default function OrgansiationGrid(props) {
  const { organsiations } = props;
  return (
    <ul className="OrgansiationGrid">
      {organsiations.map(org => <OrgansiationCard org={org} key={org.id} />)}
    </ul>
  );
}

const orgShape = PropTypes.shape({
  link: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
  }),
});

OrgansiationGrid.propTypes = {
  organsiations: PropTypes.arrayOf(orgShape).isRequired,
};
