export function getMslJwt() {
  return localStorage.getItem('MSL_JWT_OVERRIDE') ||
    (window as any).mslUserInfo.jwt ||
    false;
}
