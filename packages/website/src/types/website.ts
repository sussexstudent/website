import { RouterState } from '../ducks/router';
import { UserState } from '../ducks/user';
import { PageState } from '../ducks/page';
import { FlagsState } from '../ducks/flags';

export interface WebsiteRootState {
  router: RouterState;
  user: UserState;
  page: PageState;
  flags: FlagsState;
}
