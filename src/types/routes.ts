import { FC } from 'react';

export interface RouteComponent {
  path: string;
  exact?: boolean;
}

export type SimpleLoadableRoute = FC<RouteComponent>;
