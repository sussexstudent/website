import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';
import React from 'react';
import { COLORS } from '@ussu/common/src/libs/style';
import { cardActionable } from '@ussu/common/src/libs/style/cards';
import css from '@emotion/css';

const buttonStyle = ({ disabled }: { disabled: boolean }) =>
  css({
    textAlign: 'center',
    background: disabled ? COLORS.GREY_WINTER : COLORS.BRAND_RED,
    padding: '0.5rem',
    display: 'block',
    width: '100%',
    border: 0,
    textDecoration: 'none',
    marginTop: '1rem',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    cardActionable,
  });

const titleStyles = css({
  ...type(TypeSize.DoublePica, Typeface.Secondary),
  fontWeight: 600,
  color: '#ffffff',
});

const subtitleStyles = css({
  opacity: 0.6,
  ...type(TypeSize.LongPrimer),
  color: '#ffffff',
});

interface BuyButtonProps {
  href?: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  title: string;
  subtitle?: string;
  disabled?: boolean;
}

export const BuyButton: React.FC<BuyButtonProps> = ({
  title,
  subtitle,
  href,
  onClick,
  disabled,
}) => {
  return href ? (
    <a href={href} css={buttonStyle({ disabled: !!disabled })}>
      <div css={titleStyles}>{title}</div>
      {subtitle && <div css={subtitleStyles}>{subtitle}</div>}
    </a>
  ) : (
    <button css={buttonStyle({ disabled: !!disabled })} onClick={onClick}>
      <div css={titleStyles}>{title}</div>
      {subtitle && <div css={subtitleStyles}>{subtitle}</div>}
    </button>
  );
};
