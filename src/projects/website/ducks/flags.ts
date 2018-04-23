import { AnyAction } from 'redux';

interface Flag {
  name: string;
  state: boolean;
  mode: 'FORCE';
}

interface FlagsState {
  loaded: boolean;
  flags: { [flagName: string]: Flag };
}

export default function reducer(
  state: FlagsState = { loaded: false, flags: {} },
  _action: AnyAction,
) {
  return state;
}
