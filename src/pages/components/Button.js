import React from 'react';
import Playground, { PlaygroundState } from '../../components/Playground';

const standardMarkup = `
  <button class="Button">Take the survey</button>
`;

const warningMarkup = `
  <button class="Button Button--warning">Take the survey</button>
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
    </div>
  );
}

ButtonComponentPage.title = 'Button';
ButtonComponentPage.slug = 'button';

export default ButtonComponentPage;
