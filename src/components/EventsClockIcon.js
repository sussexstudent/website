import React from 'react';

/* eslint-disable */
export default class SVG extends React.Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        {...this.props}
      >
        <defs>
          <path id="a" d="M0 .008v18.056h18V.008H0z" />
        </defs>
        <g fill="none" fillRule="evenodd">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" />
          </mask>
          <path
            fill="#27428C"
            stroke="#27428C"
            strokeWidth=".3"
            d="M8.944.92C4.46.92.81 4.562.81 9.037c0 4.474 3.649 8.115 8.134 8.115 4.486 0 8.135-3.64 8.135-8.115S13.43.92 8.944.92zm0 15.69c-4.186 0-7.592-3.398-7.592-7.574 0-4.177 3.406-7.574 7.592-7.574 4.187 0 7.593 3.397 7.593 7.574 0 4.176-3.406 7.574-7.593 7.574z"
            mask="url(#b)"
          />
          <path
            fill="#27428C"
            stroke="#27428C"
            strokeWidth=".3"
            d="M8.944 2.544a.27.27 0 0 0-.27.27v6.222H4.605a.27.27 0 1 0 0 .54h4.338a.27.27 0 0 0 .272-.27V2.814a.27.27 0 0 0-.272-.27z"
          />
        </g>
      </svg>
    );
  }
}
/* eslint-enable */
