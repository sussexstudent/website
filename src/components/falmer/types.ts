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

export interface Node<T> {
  node: T
}

export interface Connection<T> {
  edges: Array<Node<T>>;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  }
}

