import React from 'react';
import { FalmerImage } from '~types/events';
import { AspectRatio, OneImage } from '~components/OneImage';

interface IProps {
  image: FalmerImage;
}

const ImageTreatmentPreview: React.FC<IProps> = ({ image }) => {
  const treatments = [
    {
      size: AspectRatio.r1by1,
      name: 'Square (1:1)',
    },
    {
      size: AspectRatio.r16by9,
      name: 'Wide (16:9)',
    },
    {
      size: AspectRatio.r20by9,
      name: 'Ultra wide (20:9)',
    },
  ];
  return (
    <div className="ImageTreatmentPreview">
      <ul className="ImageTreatmentPreview__list">
        {treatments.map((treatment) => (
          <li key={treatment.name}>
            <figure className="ImageTreatmentPreview__figure">
              <OneImage
                aspectRatio={treatment.size}
                src={image.resource}
                alt={treatment.name}
              />
              <figcaption className="ImageTreatmentPreview__caption">
                {treatment.name}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageTreatmentPreview;
