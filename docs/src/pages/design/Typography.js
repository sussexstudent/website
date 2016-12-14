import React from 'react';
import Path from '../../components/Path';

function ColoursPage() {
  return (
    <div>
      <h1>Typography</h1>
      <p>Core colours are located in <Path location="css/core/colors.css" />.</p>
    </div>
  );
}

ColoursPage.title = 'Typography';
ColoursPage.slug = 'type';

export default ColoursPage;
