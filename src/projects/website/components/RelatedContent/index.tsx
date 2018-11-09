import React from 'react';
import { InternalAppLink } from '~components/InternalAppLink';
import { StreamFieldData } from '~website/containers/content/types';

interface RelatedContentProps {
  relatedContent: StreamFieldData;
}

export const RelatedContent = ({ relatedContent }: RelatedContentProps) => (
  <div>
    {relatedContent.map((linkSection: any) => (
      <div>
        <h3>{linkSection.value.name || 'Related pages'}</h3>
        <ul>
          {linkSection.value.links.map((link: any) => (
            <li>
              {link.type === 'internal_link' && <InternalAppLink key={link.id} to={link.value.link.path}>
                {link.value.title || link.value.link.title}
              </InternalAppLink>}
              {link.type === 'external_link' && <a key={link.id} href={link.value.link.path} target={link.value.target}>
                {link.value.title}
              </a>}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
