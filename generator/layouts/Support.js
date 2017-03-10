import React from 'react';
import SelectionGridItem from '../components/SelectionGridItem';

const Support = () => (
  <div className="Container">
    <ul className="SelectionGrid">
      <SelectionGridItem
        title="University Issues"
        link="/support/university-issues"
        imageURL="/pageassets/support/uni-issues.jpg"
      />
      <SelectionGridItem
        title="Zero tolerance"
        link="/support/zero-tolerance/"
        imageURL="/pageassets/support/zero-tolernace.jpg"
      />
      <SelectionGridItem
        title="Complain to the University"
        link="/support/complaints-against-the-university/"
        imageURL="/pageassets/support/complain-to-university.jpg"
      />
      <SelectionGridItem
        title="Complain to the Students’ Union"
        link="/about-us/contact-us/make-a-complaint/"
        imageURL="/pageassets/support/complain-to-su.jpg"
      />
      <SelectionGridItem
        title="Help if you're worried about someone"
        link="http://www.sussex.ac.uk/studentlifecentre/issues/informationforstudentsworriedaboutotherstudents"
        imageURL="/pageassets/support/support1.jpg"
      />
      <SelectionGridItem
        title="Help in a crisis"
        link="http://www.sussex.ac.uk/studentlifecentre/issues/crisis"
        imageURL="/pageassets/support/support2.jpg"
      />
    </ul>
  </div>
);

export default Support;
