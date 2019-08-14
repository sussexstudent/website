import React from 'react';
import { useWhatsOnThemingContext } from '../WhatsOnBrandingContext';
import { useState, useEffect } from 'react';
import { whatsOnBrandingMap } from './map';
import { WhatsOnBrandedComponentLocation } from './locations';

export const createBrandedComponent = <P,>(
  location: WhatsOnBrandedComponentLocation,
  fallback: React.FC<P>,
): React.FC<P> => ({ children, ...props }) => {
  const [{ brandingPeriodSlug }] = useWhatsOnThemingContext();

  const [Component, setComponent] = useState<React.FC<P>>(() => fallback);
  useEffect(() => {
    if (
      brandingPeriodSlug &&
      whatsOnBrandingMap.hasOwnProperty(brandingPeriodSlug) &&
      whatsOnBrandingMap[brandingPeriodSlug].hasOwnProperty(location)
    ) {
      setComponent(() => whatsOnBrandingMap[brandingPeriodSlug][location]);
    } else {
      setComponent(() => fallback);
    }
  }, [brandingPeriodSlug]);

  return <Component {...(props as P)}>{children}</Component>;
};
