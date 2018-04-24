import { UserState } from '../projects/website/ducks/user';
import { PageState } from '../projects/website/ducks/page';
import { FlagsState } from '../projects/website/ducks/flags';

export interface WebsiteRootState {
  user: UserState;
  page: PageState;
  flags: FlagsState;
}
