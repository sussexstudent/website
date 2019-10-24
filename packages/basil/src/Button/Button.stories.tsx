import { storiesOf } from '@storybook/react';
import { Button } from './index';

storiesOf('Button', module)
  .add('Default', () => (
    <Button className="Button" href="#">
      Default button
    </Button>
  ))
  .add('Legacy', () => (
    <Button className="Button Button--legacy" href="#">
      Legacy button
    </Button>
  ))
  .add('Yellow', () => (
    <Button className="Button Button--yellow" href="#">
      Yellow button
    </Button>
  ))
  .add('Green', () => (
    <Button className="Button Button--color-green" href="#">
      Green button
    </Button>
  ))
  .add('Red', () => (
    <Button className="Button Button--color-red" href="#">
      Red button
    </Button>
  ))
  .add('End of Card', () => (
    <Button className="Button Button--endOfCard" href="#">
      End of card button
    </Button>
  ))
  .add('Start', () => (
    <Button className="Button Button--start" href="#">
      Start button
    </Button>
  ));
