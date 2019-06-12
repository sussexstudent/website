import { FalmerImage } from './events';

export interface StudentGroup {
  link: string;
  name: string;
  description: string;
  image: {
    src: string;
  };
  logo: FalmerImage;
  isProspective: boolean;
  id: number;
  groupId: number;
  mslGroup?: {
    lastSync: string;
  };
}
