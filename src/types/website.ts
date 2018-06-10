import { RouterState } from '../projects/website/ducks/router';
import { UserState } from '../projects/website/ducks/user';
import { PageState } from '../projects/website/ducks/page';
import { FlagsState } from '../projects/website/ducks/flags';

export interface WebsiteRootState {
  router: RouterState;
  user: UserState;
  page: PageState;
  flags: FlagsState;
}
