import React from 'react';
import Image from '../../Image';

function ImageTreatmentPreview({ image }) {
  const treatments = [
    {
      size: 'square',
      name: 'Square (1:1)',
    },
    {
      size: '43',
      name: 'Postcard (4:3)',
    },
    {
      size: 'wide',
      name: 'Wide (5:3)',
    },
    {
      size: 'ultra-wide',
      name: 'Ultra wide (20:9)',
    },
  ];
  return (
    <div className="ImageTreatmentPreview">
      <ul className="ImageTreatmentPreview__list">
        {treatments.map(treatment => (
          <li>
            <figure className="ImageTreatmentPreview__figure">
              <div
                className={`u-responsive-ratio u-responsive-ratio--${
                  treatment.size
                }`}
              >
                <Image
                  className="ResponsiveImage"
                  alt=""
                  src={image.resource}
                />
              </div>
              <figcaption className="ImageTreatmentPreview__caption">
                {treatment.name}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageTreatmentPreview;
