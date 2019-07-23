import React from 'react';

const CrossIcon: React.FC<{ height?: string; verticalAlign?: string }> = ({
  height = '21',
  verticalAlign = 'initial',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height={height}
      viewBox="0 0 23 21"
      css={{ verticalAlign: verticalAlign }}
    >
      <g fill="none" fillRule="evenodd">
        <path
          fill="currentcolor"
          d="M11.5 8.456L6.044 3 4 5.044 9.456 10.5 4 15.956 6.044 18l5.456-5.456L16.956 18 19 15.956 13.544 10.5 19 5.044 16.956 3 11.5 8.456z"
        />
      </g>
    </svg>
  );
};

export default CrossIcon;
