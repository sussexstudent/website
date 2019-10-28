import { storiesOf } from '@storybook/react';
import { Button } from './index';

storiesOf('Button', module).add('All buttons', () => (
  <div>
    <Button className="Button" href="#">
      Default button
    </Button>
    <Button className="Button Button--legacy" href="#">
      Legacy button
    </Button>
    <Button className="Button Button--yellow" href="#">
      Yellow button
    </Button>
    <Button className="Button Button--color-green" href="#">
      Green button
    </Button>
    <Button className="Button Button--color-red" href="#">
      Red button
    </Button>
    <Button className="Button Button--endOfCard" href="#">
      End of card button
    </Button>
    <Button className="Button Button--start" href="#">
      Start button
    </Button>
  </div>
));
