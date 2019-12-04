// DEPRECIATED: Use ../HeadingHero
import React from 'react';

interface HeadingImageProps {
  imageURL: string;
  title: string;
  description?: string;
}

export const HeadingImage: React.FC<HeadingImageProps> = ({
  imageURL,
  title,
  description,
}) => (
  <div
    className="HeadingImage"
    style={{
      backgroundImage: `url(${imageURL}?thumbnail=true&height=700&width=2000&resize_type=CropToFit)`,
    }}
  >
    <h1 className="HeadingImage__title">{title}</h1>
    {description ? (
      <div>
        <div className="HeadingImage__desc">{description}</div>
      </div>
    ) : null}
  </div>
);
