import React from 'react';
import FauxLink from '~components/FauxLink';
import { OneImageBackground } from '~components/OneImage';

interface IProps {
  link: string;
  imageUrl: string;
  heading: string;
}

const HighlightTextBox: React.SFC<IProps> = (props) => (
  <div className="BentoBox">
    <FauxLink href={props.link} />
    <OneImageBackground
      className="BentoBox__background-image"
      src={props.imageUrl}
    >
      <div style={{ paddingLeft: '1rem', paddingBottom: '1rem' }}>
        <h2
          className="Heading Heading--highlight type-trafalgar"
          style={{ marginBottom: '1rem' }}
        >
          {props.heading}
        </h2>
      </div>
    </OneImageBackground>
    {props.children}
  </div>
);

export { HighlightTextBox };
