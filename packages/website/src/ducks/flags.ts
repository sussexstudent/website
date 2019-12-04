interface Flag {
  name: string;
  state: boolean;
  mode: 'FORCE';
}

export interface FlagsState {
  loaded: boolean;
  flags: { [flagName: string]: Flag };
}

export default function reducer(
  state: FlagsState = { loaded: false, flags: {} },
) {
  return state;
}
