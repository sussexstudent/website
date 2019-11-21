export enum TypeSize {
  Atlas,
  Elephant,
  Imperial,
  Royal,
  Foolscap,
  Canon,
  Trafalgar,
  Paragon,
  DoublePica,
  GreatPrimer,
  BodyCopy,
  Pica,
  LongPrimer,
  Brevier,
  Minion,
}

export enum Group {
  A,
  B,
  D,
}

export enum Typeface {
  Primary,
  Secondary,
}

export type StylesForGroup = any;
export type SizeDef = Partial<{ [group in Group]: StylesForGroup }> & {
  [Group.A]: StylesForGroup;
};
export type FontMap = { [size in TypeSize]: SizeDef };

export const sizes: FontMap = {
  [TypeSize.Atlas]: {
    [Group.A]: {
      fontSize: '4.875rem',
      lineHeight: '5.25rem',
    },
    [Group.B]: {
      fontSize: '6rem',
      lineHeight: '6.5rem',
    },
    [Group.D]: {
      fontSize: '8.75rem',
      lineHeight: '9.25rem',
    },
  },

  [TypeSize.Elephant]: {
    [Group.A]: {
      fontSize: '3.75rem',
      lineHeight: '4rem',
    },
    [Group.B]: {
      fontSize: '4.875rem',
      lineHeight: '5.25rem',
    },
    [Group.D]: {
      fontSize: '7.25rem',
      lineHeight: '7.75rem',
    },
  },

  [TypeSize.Imperial]: {
    [Group.A]: {
      fontSize: '3.125rem',
      lineHeight: '3.375rem',
    },
    [Group.B]: {
      fontSize: '4rem',
      lineHeight: '5.5rem',
    },
    [Group.D]: {
      fontSize: '6rem',
      lineHeight: '6.5rem',
    },
  },

  [TypeSize.Royal]: {
    [Group.A]: {
      fontSize: '2.5rem',
      lineHeight: '2.75rem',
    },
    [Group.B]: {
      fontSize: '3.25em',
      lineHeight: '3.75rem',
    },
    [Group.D]: {
      fontSize: '4.75rem',
      lineHeight: '5.25rem',
    },
  },

  [TypeSize.Foolscap]: {
    [Group.A]: {
      fontSize: '2rem',
      lineHeight: '2.25rem',
    },
    [Group.B]: {
      fontSize: '2.5em',
      lineHeight: '2.75rem',
    },
    [Group.D]: {
      fontSize: '3.5rem',
      lineHeight: '3.75rem',
    },
  },

  [TypeSize.Canon]: {
    [Group.A]: {
      fontSize: '1.75rem',
      lineHeight: '2rem',
    },
    [Group.B]: {
      fontSize: '2rem',
      lineHeight: '2rem',
    },
    [Group.D]: {
      fontSize: '2.75rem',
      lineHeight: '3rem',
    },
  },

  [TypeSize.Trafalgar]: {
    [Group.A]: {
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
    },
    [Group.B]: {
      fontSize: '1.5rem',
      lineHeight: '1.75rem',
    },
    [Group.D]: {
      fontSize: '2rem',
      lineHeight: '2.25rem',
    },
  },

  [TypeSize.Paragon]: {
    [Group.A]: {
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
    },
    [Group.B]: {
      fontSize: '1.375rem',
      lineHeight: '1.625rem',
    },
    [Group.D]: {
      fontSize: '1.75rem',
      lineHeight: '2rem',
    },
  },

  [TypeSize.DoublePica]: {
    [Group.A]: {
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
    },
    [Group.D]: {
      fontSize: '1.5rem',
      lineHeight: '1.75rem',
    },
  },

  [TypeSize.GreatPrimer]: {
    [Group.A]: {
      fontSize: '1.125rem',
      lineHeight: '1.375rem',
    },
    [Group.D]: {
      fontSize: '1.25rem',
    },
  },

  [TypeSize.Pica]: {
    [Group.A]: {
      fontSize: '0.9375rem',
      lineHeight: '1.25rem',
    },
    [Group.B]: {
      fontSize: '1rem',
      lineHeight: '1.25rem',
    },
    [Group.D]: {
      fontSize: '1rem',
      lineHeight: '1.25rem',
    },
  },

  [TypeSize.LongPrimer]: {
    [Group.A]: {
      fontSize: '0.9375rem',
      lineHeight: '1.125rem',
    },
    [Group.D]: {
      fontSize: '0.8125rem',
      lineHeight: '1.125rem',
    },
  },

  [TypeSize.Brevier]: {
    [Group.A]: {
      fontSize: '0.875rem',
      lineHeight: '1rem',
    },
    [Group.B]: {
      lineHeight: '1.125rem',
    },
    [Group.D]: {
      fontSize: '0.8125rem',
      lineHeight: '1rem',
    },
  },

  [TypeSize.Minion]: {
    [Group.A]: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
  },

  [TypeSize.BodyCopy]: {
    [Group.A]: {
      fontSize: '0.9375rem',
      lineHeight: '1.25rem',
    },
    [Group.B]: {
      fontSize: '1rem',
      lineHeight: '1.375rem',
    },
    [Group.D]: {
      fontSize: '1rem',
      lineHeight: '1.375rem',
    },
  },
};
