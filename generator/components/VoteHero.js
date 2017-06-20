import React from 'react';

/* eslint-disable */
const svg = (
  <svg
    width="310px"
    height="43px"
    viewBox="0 0 310 43"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="VoteNow" fillRule="nonzero" fill="#283582">
        <polygon
          id="Shape"
          points="25.39 41.69 15.808 41.69 0.303 1.038 10.93 1.038 19.699 24.906 20.57 27.811 21.499 24.906 30.268 1.038 40.895 1.038"
        />
        <path
          d="M83.582,21.306 C83.582,33.559 74.755,42.444 62.27,42.444 C49.784,42.444 40.957,33.559 40.957,21.306 C40.957,9.111 49.784,0.284 62.27,0.284 C74.754,0.284 83.582,9.111 83.582,21.306 Z M51.409,21.306 C51.409,28.159 55.533,33.095 62.269,33.095 C69.005,33.095 73.129,28.158 73.129,21.306 C73.129,14.512 69.005,9.634 62.269,9.634 C55.533,9.634 51.409,14.512 51.409,21.306 Z"
          id="Shape"
        />
        <polygon
          id="Shape"
          points="120.112 10.389 107.801 10.389 107.801 41.691 97.754 41.691 97.754 10.389 85.442 10.389 85.442 1.039 120.111 1.039 120.111 10.389"
        />
        <polygon
          id="Shape"
          points="148.221 10.389 134.051 10.389 134.051 16.196 146.072 16.196 146.072 25.547 134.051 25.547 134.051 32.34 148.221 32.34 148.221 41.691 124.005 41.691 124.005 1.039 148.221 1.039"
        />
        <polygon
          id="Shape"
          points="202.463 41.69 192.417 41.69 178.305 20.61 176.737 17.763 176.737 41.69 166.69 41.69 166.69 1.038 176.736 1.038 190.79 22.351 192.417 25.254 192.417 1.038 202.463 1.038"
        />
        <path
          d="M250.956,21.306 C250.956,33.559 242.128,42.444 229.644,42.444 C217.158,42.444 208.331,33.559 208.331,21.306 C208.331,9.111 217.158,0.284 229.644,0.284 C242.128,0.284 250.956,9.111 250.956,21.306 Z M218.783,21.306 C218.783,28.159 222.906,33.095 229.643,33.095 C236.379,33.095 240.502,28.158 240.502,21.306 C240.502,14.512 236.379,9.634 229.643,9.634 C222.906,9.634 218.783,14.512 218.783,21.306 Z"
          id="Shape"
        />
        <polygon
          id="Shape"
          points="297.474 41.69 286.615 41.69 281.156 22.002 280.634 19.158 280.17 22.002 274.711 41.69 263.852 41.69 251.947 1.038 262.515 1.038 268.904 24.209 269.427 27.17 269.891 24.209 275.989 1.038 285.339 1.038 291.437 24.209 291.843 27.17 292.424 24.209 298.812 1.038 309.381 1.038"
        />
      </g>
    </g>
  </svg>
);
/* eslint-enable */

const VoteHero = () =>
  <a className="FlexibleHero FlexibleHero--link VoteHero" href="/vote">
    <div className="VoteHero__container">
      <div>Get involved.</div>
      <div>Be part of making change happen.</div>
      <div className="VoteHero__button">{svg}</div>
      <div>
        Voting for the Union elections and referenda closes Fri 3rd March at
        5pm.
      </div>
    </div>
  </a>;

export default VoteHero;
