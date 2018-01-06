import React from 'react';
import { headContent } from '../head';

interface IProps {
  assets: any; // todo
  children: any;
}

const HTML = ({ children, assets }: IProps) => (
  <html lang="en">
    <head dangerouslySetInnerHTML={{ __html: headContent(assets) }} />
    {children}
  </html>
);

export default HTML;
