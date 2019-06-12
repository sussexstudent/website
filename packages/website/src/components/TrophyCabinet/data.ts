import { GradeMap } from '@ussu/common/src/types/awards';

import LeafCommunity from '@ussu/common/src/icons/awards/leaf-community.svg';
import LeafDevelopment from '@ussu/common/src/icons/awards/leaf-development.svg';
import LeafSocial from '@ussu/common/src/icons/awards/leaf-social.svg';
import LeafStudentVoice from '@ussu/common/src/icons/awards/leaf-student-voice.svg';
import LeafTeamSussex from '@ussu/common/src/icons/awards/leaf-team-sussex.svg';
import LeafCommunications from '@ussu/common/src/icons/awards/leaf-communications.svg';
import LeafFundraising from '@ussu/common/src/icons/awards/leaf-fundraising.svg';
import LeafInclusivity from '@ussu/common/src/icons/awards/leaf-inclusivity.svg';

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
