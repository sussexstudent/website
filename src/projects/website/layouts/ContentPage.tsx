import React from 'react';
import { ContentPage } from "~components/content/ContentPage";
import HydroLeaf from "~components/HydroLeaf";

class ContentPageContainer extends React.Component<{ path: string }> {
  render() {
    const { path } = this.props;
    return <ContentPage path={path} />;
  }
}

export default HydroLeaf()(ContentPageContainer);
