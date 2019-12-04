export function getMslJwt(): string | false {
  return (
    localStorage.getItem('MSL_JWT_OVERRIDE') ||
    (window.mslUserInfo && window.mslUserInfo.jwt) ||
    false
  );
}
