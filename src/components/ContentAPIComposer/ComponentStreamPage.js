import React from 'react';
import getComponent from './getComponent';

const ComponentStreamPage = ({ data: { body }, data }) => (
  <div>
    {body.map((component, index) => getComponent(component, data, index))}
  </div>
);

export default ComponentStreamPage;
