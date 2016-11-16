import React from 'react';
import Path from '../../components/Path';
import Color from '../../components/Color';

function ColoursPage() {
  return (
    <div>
      <h1>Colours</h1>
      <Color color="#27428c" name="" cssVar="color__blue" />
      <Color color="#fdd2c6" name="" cssVar="color__pink" />
      <Color color="#ee534f" name="" cssVar="color__red" />
      <Color color="#1db8a4" name="" cssVar="color__green" />
      <Color color="#ffdb7a" name="" cssVar="color__yellow" />

      <p>Core colours are located in <Path location="css/core/colors.css" />.</p>
    </div>
  );
}

ColoursPage.title = 'Colours';
ColoursPage.slug = 'colours';

export default ColoursPage;
