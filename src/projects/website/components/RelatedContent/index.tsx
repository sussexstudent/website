import React from 'react';
import {InternalAppLink} from "~components/InternalAppLink";
import {StreamFieldData} from "~website/containers/content/types";

interface RelatedContentProps {
  relatedContent: StreamFieldData
}


export const RelatedContent = ({ relatedContent }: RelatedContentProps) => (
  <div>
    {relatedContent.map((linkSection: any) => (
      <div>
        <h3>{linkSection.value.name || 'Related pages'}</h3>
        <ul>
          {linkSection.value.links.map((link: any) => (
            <li>
              <InternalAppLink key={link.id} to={link.value.link.path}>{link.value.link.title}</InternalAppLink>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
