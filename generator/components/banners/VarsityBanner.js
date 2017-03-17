import React from 'react';

const varsityStyle = `
  .VarsityBanner {
    display: block;
    background-image: url(/pageassets/varsity.jpg);
    background-position: center center;
    background-size: cover;
    height: 300px;
  }

  @media screen and (min-width: 900px) {
    .VarsityBanner {
      height: 400px;
    }
  }
`;

function VarsityBanner() {
  return (
    <a className="VarsityBanner" href="https://www.sussexstudent.com/ents/event/2694/">
      <style dangerouslySetInnerHTML={{ __html: varsityStyle }} />
      <span className="u-h">Varsity 2017</span>
    </a>

  );
}

export default VarsityBanner;
