import React from 'react';
import { css } from '@emotion/core';
import {colors} from "../colors";


interface IProps {
  href: string;
  children: any;
}

const cardShadow = {
  boxShadow: '0 -3px 5px rgba(30, 30, 30, 0.1)',
  '&:hover': {
    boxShadow: '0 -3px 8px rgba(30, 30, 30, 0.1)',
    },
  '&:active': {
    boxShadow: '0 -3px 2px rgba(30, 30, 30, 0.1)',
    }
  };

// const buttonStyles = css`
//   border-bottom: 10px ${colors.BrandBlue};
//
//   &:hover {
//     background: ${colors.BrandGreen};
//   }
//
//   ${cardShadow}
// `;

const buttonObjectStyles = css({
  borderBottom: `10px ${colors.BrandBlue}`,
  "&:hover": {
    background: colors.BrandGreen
  }
}, cardShadow);


export const ButtonLink: React.FC<IProps> = ({ href, children }) => {
  return (
    <a css={buttonObjectStyles} href={href}>
      {children}
    </a>
  );
};

