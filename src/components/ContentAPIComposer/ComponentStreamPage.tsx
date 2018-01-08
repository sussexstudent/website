import React from 'react';
import getComponent from './getComponent';
import {CMSDocument} from "../../types/content";

const ComponentStreamPage = ({ data: { body }, data }: { data: CMSDocument }) => (
  <div>
    {body.map((component, index) => getComponent(component, data, index))}
  </div>
);

export default ComponentStreamPage;
