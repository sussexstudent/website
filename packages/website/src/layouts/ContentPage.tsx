import React from 'react';
import { ContentPage } from '../containers/content/ContentPage';

interface Props {
  path: string;
}

const ContentPageContainer: React.FC<Props> = ({ path }) => {
  return <ContentPage path={path} />;
};

export default ContentPageContainer;
