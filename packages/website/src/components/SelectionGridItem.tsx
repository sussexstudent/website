import React from 'react';
import { AspectRatio, OneImage } from './OneImage';
import { InternalAppLink } from './InternalAppLink';
import convert from 'htmr';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import FauxRouterLink, { InnerLink } from './FauxInternalAppLink';

interface SelectionGridItemProps {
  link: string;
  imageURL: string;
  title: string;
  description: string;
}

export const SelectionGridItem: React.FC<SelectionGridItemProps> = ({
  link,
  imageURL,
  title,
  description,
}) => (
  <li className="SelectionGrid__item SelectionGrid--underneath" key={link}>
    <div className="SelectionGrid__link">
      <OneImage
        className="SelectionGrid__image"
        src={imageURL}
        alt=""
        aspectRatio={AspectRatio.r20by9}
      />
      <div className="SelectionGrid__title">{title}</div>
      {description !== '' ? (
        <div
          css={[
            type(TypeSize.BodyCopy, Typeface.Primary),
            { '& p': { marginTop: 0 } },
          ]}
        >
          {convert(description, {transform: {
            a: ({ href, children }) => <InnerLink to={href ?? ''}>{children}</InnerLink>
          }})}
          <div>
            <InternalAppLink to={link}>Find out more »</InternalAppLink>
          </div>
        </div>
      ) : null}
      <FauxRouterLink href={link} />
    </div>
  </li>
);
