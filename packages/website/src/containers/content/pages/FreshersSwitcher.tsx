import React from 'react';
import { useFlag } from '../../../hooks/useFlag';
import { FreshersHomepage } from './FreshersHomepage';
import { FreshersSplash } from './FreshersSplash';

export const FreshersSwitcher = (props: any) => {
  const { loading, state } = useFlag('freshers.displaySplash');

  if (loading) {
    return null;
  }

  if (state && window.location.hash !== '#preview') {
    return <FreshersSplash />;
  }

  return <FreshersHomepage {...props} />;
};
