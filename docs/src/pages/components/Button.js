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


function ButtonComponentPage() {
  return (
    <div>
      <h1>Button</h1>
      <p>Buttons are used for actions. For example</p>

      <button className="Button">Take the survey</button>

      <h2>Modifiers</h2>

      <Playground>
        <PlaygroundState name="Standard" markup={standardMarkup} />
        <PlaygroundState name="Warning" markup={warningMarkup} />
      </Playground>

      <h2>Accessibility</h2>
      <ul>
        <li><code>{'role="button"'}</code> should be required for the button.</li>
      </ul>
    </div>
  );
}

ButtonComponentPage.title = 'Button';
ButtonComponentPage.slug = 'button';

export default ButtonComponentPage;
