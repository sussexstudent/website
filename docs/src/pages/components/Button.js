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

function ButtonComponentPage() {
  return (
    <div className="App__content-container">
      <h1>Button</h1>
      <p>Buttons are used for actions. For example</p>

      <a href="" className="Button" role="button">
        Take the survey
      </a>

      <h2>Modifiers</h2>

      <Playground>
        <PlaygroundState name="Standard" markup={standardMarkup} />
        <PlaygroundState name="Warning" markup={warningMarkup} />
        <PlaygroundState name="External" markup={externalMarkup} />
      </Playground>

      <h2>Accessibility</h2>
      <ul>
        <li>
          <code>{'role="button"'}</code> should be required for the button.
        </li>
      </ul>
    </div>
  );
}

ButtonComponentPage.title = 'Button';
ButtonComponentPage.slug = 'button';

export default ButtonComponentPage;
