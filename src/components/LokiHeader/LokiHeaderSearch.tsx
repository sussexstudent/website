import React, { useCallback } from 'react';
import { WebsiteRootState } from '~types/website';
import * as routerActions from '../../projects/website/ducks/router';
import { useMappedState, useDispatch } from 'redux-react-hook';

export const LokiHeaderSearch: React.FC = () => {
  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      router: state.router,
    }),
    [],
  );
  const { router } = useMappedState(mapState);
  const dispatch = useDispatch();

  return (
    <div className="LokiHeader__search">
      <input
        id="HP_QUERY_ELEMENT_SIDE_EFFECT"
        className="LokiHeader__search-input"
        type="search"
        placeholder="Search"
        value={router.searchQuery}
        onChange={(e) => dispatch(routerActions.setSearchValue(e.target.value))}
      />
    </div>
  );
};
