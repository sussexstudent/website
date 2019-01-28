import React from 'react';
import cx from 'classnames';
import FauxLink from '~components/FauxLink';
import { OneImageBackground } from '~components/OneImage';

export enum HighlightTheme {
  BlackOnYellow = 'b_y',
  WhiteOnBlack = 'w_b',
}

interface IProps {
  link: string;
  imageUrl: string;
  heading: string;
  theme?: HighlightTheme;
}

const HighlightTextBox: React.FC<IProps> = (props) => (
  <div className="BentoBox">
    <FauxLink href={props.link} />
    <OneImageBackground
      className="BentoBox__background-image"
      src={props.imageUrl}
    >
      <div style={{ paddingLeft: '1rem', paddingBottom: '1rem' }}>
        <h2
          className={cx(
            'Heading Heading--highlight type-trafalgar',
            `Heading--highlight-${
              props.theme ? props.theme : HighlightTheme.BlackOnYellow
            }`,
          )}
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
