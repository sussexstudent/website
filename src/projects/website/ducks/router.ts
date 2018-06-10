import {History, Location} from 'history';
import { AnyAction } from 'redux';

export interface RouterState {
  history: null | History;
  location: null | Location;
}

const ROUTER_SET_ROUTER= 'ROUTER_SET_ROUTER';
export const setRouter = (history: History, location: Location) => ({
  type: ROUTER_SET_ROUTER,
  payload: { history, location },
});

export default function reducer(
  state: RouterState = {
    history: null,
    location: null,
  },
  action: AnyAction,
) {
  switch (action.type) {
    case ROUTER_SET_ROUTER:
      return {
        ...state,
        history: action.payload.history,
        location: action.payload.location,
      }
  }

  return state;
}
