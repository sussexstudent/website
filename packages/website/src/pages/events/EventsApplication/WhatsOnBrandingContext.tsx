import React, { createContext, useContext, useReducer } from 'react';
export const StateContext = createContext<
  [{ brandingPeriodSlug: null | string }, React.Dispatch<any>]
>([{ brandingPeriodSlug: null }, () => null]);

export const setBrandingPeriod = (brandingPeriodSlug: string | null) => ({
  type: 'SET_BRANDING_PERIOD',
  payload: { brandingPeriodSlug },
});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_BRANDING_PERIOD': {
      return {
        ...state,
        brandingPeriodSlug: action.payload.brandingPeriodSlug,
      };
    }
  }

  return state;
};

export const WhatsOnThemingProvider: React.FC = ({ children }) => {
  const reducerState = useReducer(reducer, {
    brandingPeriodSlug: null,
  });

  return (
    <StateContext.Provider value={reducerState}>
      {children}
    </StateContext.Provider>
  );
};

export const useWhatsOnThemingContext = () => useContext(StateContext);
