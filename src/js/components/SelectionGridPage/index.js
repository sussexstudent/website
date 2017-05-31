import React from 'react';
import PropTypes from 'prop-types';

function SelectionGridPage({ data }) {
  console.log(data);
  return (
    <div>
      {data.showHeadingHero ? <HeadingHero title={data.title} /> : null}
      <SelectionGrid>
        {}
      </SelectionGrid>

    </div>
  );
}

SelectionGridPage.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.object.isRequired,
};

export default SelectionGridPage;
