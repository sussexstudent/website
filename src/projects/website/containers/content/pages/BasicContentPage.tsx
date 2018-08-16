import React from 'react';
import {Page, StreamFieldData} from "~website/containers/content/types";
import StreamField from "~website/containers/content/StreamField";

interface IBasicContentPage extends Page {
  content: StreamFieldData;
}

interface BasicContentPageProps {
  page: IBasicContentPage;
}

export const BasicContentPage: React.SFC<BasicContentPageProps> = ({ page }) => (
  <div className="LokiContainer">
    <h1>{page.title}</h1>
    <StreamField page={page} items={page.content} />
  </div>
);
