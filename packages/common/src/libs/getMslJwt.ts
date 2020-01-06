import { has, get } from 'lodash';

export function getMslJwt(): string | false {
  return (
    localStorage.getItem('MSL_JWT_OVERRIDE') ||
    (has(window, 'mslUserInfo') && get(window, 'mslUserInfo.jwt')) ||
    false
  );
}
