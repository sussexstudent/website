import React from 'react';
import Playground, { PlaygroundState } from '../../components/Playground';

const standardMarkup = `
<a href="/survey" class="Button" role="button">
  Take the survey
</a>
`;

const warningMarkup = `
<a href="/survey" class="Button Button--warning" role="button">
  Take the survey
</a>
`;
const externalMarkup = `
<a href="/survey" class="Button Button--external" role="button">
  Take the survey
</a>
`;

function TrailComponentPage() {
  return (
    <div className="App__content-container">
      <h1>Trail Grid</h1>
      <p>
        Trail is our simple fraction based grid. Usually we will have have
        unique layouts for anything more complex.
      </p>
      <div className="Trail">
        <div className="Trail__row Trail__row--11">
          <div>Hello there</div>
          <div>And here!</div>
        </div>
      </div>

      <h2>Modifiers</h2>

      <Playground>
        <PlaygroundState name="Standard" markup={standardMarkup} />
        <PlaygroundState name="Warning" markup={warningMarkup} />
        <PlaygroundState name="External" markup={externalMarkup} />
      </Playground>
    </div>
  );
}

TrailComponentPage.title = 'Trail';
TrailComponentPage.slug = 'trail';

export default TrailComponentPage;
