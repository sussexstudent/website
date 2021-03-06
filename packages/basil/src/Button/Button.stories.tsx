import React from 'react';

import { Button } from './index';

export default { title: 'Form|Button' };

export const Default: React.FC = () => (
  <Button className="Button" href="#">
    Default button
  </Button>
);

export const EndOfCard: React.FC = () => (
  <Button className="Button Button--endOfCard" href="#">
    Default button
  </Button>
);

export const Start: React.FC = () => (
  <Button className="Button Button--start" href="#">
    Start button
  </Button>
);

export const Danger: React.FC = () => (
  <Button className="Button Button--color-red" href="#">
    Red button
  </Button>
);

export const Confirm: React.FC = () => (
  <Button className="Button Button--color-green" href="#">
    Green button
  </Button>
);
