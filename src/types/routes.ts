import { SFC } from 'react';

export interface RouteComponent {
  path: string;
  exact?: boolean;
}

export type SimpleLoadableRoute = SFC<RouteComponent>;
