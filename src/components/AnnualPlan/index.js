import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import HydroLeaf from '~components/HydroLeaf';
import Image from '~components/Image';

function OfficerPlan(props) {
  return (
    <div
      className="AnnualPlan__slide"
      style={{
        padding: 15,
        minHeight: 100,
      }}
    >
      <div className="AnnualPlan__content">
        <ul className="AnnualPlan__points" style={{ color: props.accent }}>
          {props.points.map(pointPair => <li>{pointPair[0]}</li>)}
        </ul>
        <div
          className="AnnualPlan__footer"
          style={{ backgroundColor: props.accentBackground }}
        >
          <Image
            className="AnnualPlan__footer-image"
            type="bg"
            src={props.image}
            customParams={{ sat: -100 }}
          />
          <div>
            <div>{props.name}</div>
            <div>{props.position}</div>
            <div style={{ color: props.accent }}>
              Run by students, for students
            </div>
          </div>
        </div>
      </div>
      <Image
        className="AnnualPlan__image"
        type="bg"
        src={props.image}
        customParams={{ sat: -100 }}
      />
    </div>
  );
}

function AnnualPlan() {
  return (
    <div className="AnnualPlan">
      <h1 style={{ textTransform: 'uppercase' }}>{`Students' Union Annual Priorities`}</h1>
      <em>Swipe right to view the officers annual priorities</em>
      <SwipeableViews enableMouseEvents>
        <OfficerPlan
          name="Frida"
          position="President"
          points={[
            ['Books', 'fuseh risdnflkj erd ggfnjg re'],
            ['Buses', 'fuseh risdnflkj erd ggfnjg re'],
            ['Better union', 'fuseh risdnflkj erd ggfnjg re'],
          ]}
          accent="#00509a"
          accentBackground="#99b9d7"
          image="/original_images/16664de397694b5ea5e194b0a1fa73dc"
        />
        <OfficerPlan
          name="Sarah"
          position="Posgraduate Ed."
          points={[
            ['Protestival', 'fuseh risdnflkj erd ggfnjg re'],
            ['Free Education', 'fuseh risdnflkj erd ggfnjg re'],
            ['Postgrad Mental Health Support', 'fuseh risdnflkj erd ggfnjg re'],
          ]}
          accent="#d91b5c"
          accentBackground="#f0a4be"
          image="/original_images/f07caf2bb1114cb8a18dd49a6e9e1045"
        />
        <OfficerPlan
          name="Lulah"
          position="Undergraduate Ed."
          points={[
            ['Equality', 'fuseh risdnflkj erd ggfnjg re'],
            ['Fair Assessment', 'fuseh risdnflkj erd ggfnjg re'],
            ['International Student Support', 'fuseh risdnflkj erd ggfnjg re'],
          ]}
          accent="#f05d5a"
          accentBackground="#f9bebd"
          image="/original_images/241b436e49524d8da68faf1f1f83c4b6"
        />
        <OfficerPlan
          name="Aisling"
          position="Undergraduate Ed."
          points={[
            ['Equality', 'fuseh risdnflkj erd ggfnjg re'],
            ['Fair Assessment', 'fuseh risdnflkj erd ggfnjg re'],
            ['International Student Support', 'fuseh risdnflkj erd ggfnjg re'],
          ]}
          accent="#f3b94f"
          accentBackground="#fae3b9"
          image="/original_images/8da8156f2e0e40b4878dcbea569ce2b5"

        />
        <OfficerPlan
          name="Lucy"
          position="Actives"
          points={[
            ['Sports', 'fuseh risdnflkj erd ggfnjg re'],
            ['Representation', 'fuseh risdnflkj erd ggfnjg re'],
            ['Student-led Union', 'fuseh risdnflkj erd ggfnjg re'],
          ]}
          accent="#0ab9a4"
          accentBackground="#9de3db"
          image="/original_images/4759cccd3b3f4ed4813a260cc0d4833f"
        />
        <OfficerPlan
          name="Grainne"
          position="Welfare officer"
          points={[
            ['Welfare', 'fuseh risdnflkj erd ggfnjg re'],
            ['Scrapped caps', 'fuseh risdnflkj erd ggfnjg re'],
            ['Good night out scheme', 'fuseh risdnflkj erd ggfnjg re'],
          ]}
          accent="#cf77b0"
          accentBackground="#ecc9df"
          image="/original_images/f774e88f695344fd957a46e4dfefc3bc"
        />
      </SwipeableViews>
    </div>
  );
}

export default HydroLeaf({ disableSSR: true, name: 'AnnualPlan' })(AnnualPlan);
