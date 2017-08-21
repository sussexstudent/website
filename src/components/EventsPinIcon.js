import React from 'react';

/* eslint-disable */
export default class SVG extends React.Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="18"
        height="22"
        viewBox="0 0 18 22"
        {...this.props}
      >
        <defs>
          <path id="a" d="M.936.01v23.698h17.813V.01H.936z" />
        </defs>
        <g fill="none" fillRule="evenodd" transform="translate(-2 -1)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" />
          </mask>
          <path
            fill="#27428C"
            stroke="#27428C"
            strokeWidth=".1"
            d="M9.912 5.877A2.728 2.728 0 0 0 7.186 8.6a2.728 2.728 0 0 0 2.726 2.723A2.728 2.728 0 0 0 12.64 8.6a2.728 2.728 0 0 0-2.727-2.723zm0 4.668A1.948 1.948 0 0 1 7.965 8.6a1.948 1.948 0 0 1 3.895 0 1.948 1.948 0 0 1-1.948 1.945z"
            mask="url(#b)"
          />
          <path
            fill="#27428C"
            stroke="#27428C"
            strokeWidth=".1"
            d="M15.124 3.393a7.423 7.423 0 0 0-5.28-2.185c-1.996 0-3.87.776-5.281 2.185-2.61 2.608-2.935 7.513-.703 10.486l5.983 8.632 5.975-8.62c2.241-2.985 1.917-7.89-.694-10.498zm.062 10.043l-5.343 7.707-5.35-7.72c-2.025-2.696-1.735-7.126.62-9.48a6.649 6.649 0 0 1 4.73-1.957 6.65 6.65 0 0 1 4.73 1.958c2.357 2.353 2.647 6.783.613 9.492z"
            mask="url(#b)"
          />
        </g>
      </svg>
    );
  }
}
/* eslint-enable */
