import React from 'react';
import ContentCard from '../ContentCard/index';
import BackBar from '../BackBar/index';

function OfficerPage() {
  return (
    <div className="Layout">
      <BackBar href="/about-us/full-time-elected-officers">
        Full-time Elected Officers
      </BackBar>
      <ContentCard>
        Picture
        <h1 className="Heading Heading--highlight">Officer name</h1>
        <div className="Prose">
          <p>
            The Welfare Officer is responsible for any non-academic concerns
            students have; these range from issues with campus accommodation to
            campaigning for mental health and trans* equality.
          </p>
          <p>
            The Welfare Officer defends the interests of marginalised student
            groups within the Students’ Union and the University in order to
            ensure that students can make the most of their time here at Sussex.
          </p>
        </div>
      </ContentCard>
      <div />
    </div>
  );
}

export default OfficerPage;
