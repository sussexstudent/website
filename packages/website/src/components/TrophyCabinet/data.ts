import { GradeMap } from '@ussu/common/src/types/awards';

import LeafCommunity from '../../icons/awards/leaf-community.svg';
import LeafDevelopment from '../../icons/awards/leaf-development.svg';
import LeafSocial from '../../icons/awards/leaf-social.svg';
import LeafStudentVoice from '../../icons/awards/leaf-student-voice.svg';
import LeafTeamSussex from '../../icons/awards/leaf-team-sussex.svg';
import LeafCommunications from '../../icons/awards/leaf-communications.svg';
import LeafFundraising from '../../icons/awards/leaf-fundraising.svg';
import LeafInclusivity from '../../icons/awards/leaf-inclusivity.svg';

export const gradeMap: GradeMap = {
  leaves: [
    { title: 'Bronze', color: '#ab6e37' },
    { title: 'Silver', color: '#8c9198' },
    { title: 'Gold', color: '#D7AF46' },
  ],
};

export const iconMap: { [key: string]: string } = {
  community: LeafCommunity,
  development: LeafDevelopment,
  social: LeafSocial,
  student_voice: LeafStudentVoice,
  team_sussex: LeafTeamSussex,
  communications: LeafCommunications,
  fundraising: LeafFundraising,
  inclusivity: LeafInclusivity,
};
