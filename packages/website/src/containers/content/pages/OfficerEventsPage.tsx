import React from 'react';
import { Page } from '../types';

interface IOfficerEventsIndex extends Page<Page[]> {}

interface IOfficerEventsPage extends Page {
  section: IOfficerEventsIndex;
}

export interface OfficerEventsPageProps {
  page: IOfficerEventsPage;
}

export const OfficerEventsPage: React.FC<OfficerEventsPageProps> = ({}) => {
  return <div>test</div>;
};
