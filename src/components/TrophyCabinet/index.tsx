import React from 'react';
import ContentCard from '~components/ContentCard';
import { Award } from '~components/TrophyCabinet/Award';
import LeafStudentVoice from '../../icons/leaf-student-voice.svg';
import LeafSocial from '../../icons/leaf-social.svg';

export class TrophyCabinet extends React.Component {
  render() {
    return (
      <ContentCard>
        <h3>Trophy Cabinet</h3>
        <ul className="TrophyCabinet__awards List--reset">
          <li>
            <Award color={'#D7AF46'} title={'Student Voice'} subtitle={'Gold'}>
              <LeafStudentVoice />
            </Award>
          </li>
          <li>
            <Award color={'#8C9198'} title={'Social'} subtitle={'Silver'}>
              <LeafSocial />
            </Award>
          </li>
        </ul>
      </ContentCard>
    );
  }
}

export default TrophyCabinet;
