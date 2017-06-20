import React from 'react';
import ActivitiesParser from './parse';
import ActivitiesApp from '../../components/ActivitiesApp';

const activitiesParser = new ActivitiesParser(
  document.querySelector('.msl_organisation_list')
);

const ActivitiesContainer = () =>
  <ActivitiesApp
    organsiationMap={activitiesParser.getOrgMap()}
    organsiationList={activitiesParser.getAllOrgs()}
    allIds={activitiesParser.getAllOrgIds()}
  />;

export default ActivitiesContainer;
