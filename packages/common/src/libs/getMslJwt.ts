export function getMslJwt(): string | false {
  return (
    localStorage.getItem('MSL_JWT_OVERRIDE') ||
    ((window as any).mslUserInfo && (window as any).mslUserInfo.jwt) ||
    false
  );
}
