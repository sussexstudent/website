export interface FalmerUser {
  hasCmsAccess: boolean;
  isStaff: boolean;
  identifier: string;
  name: string;
}

export interface AuthState {
  user: FalmerUser;
}

export interface RootState {
  auth: AuthState;
}
