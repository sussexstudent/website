import React from 'react';
import SadFaceIcon from '@ussu/common/src/icons/sad-face.svg';
import Raven from 'raven-js';
import { type, TypeSize } from '@ussu/common/src/libs/style/type';
import { COLORS } from '@ussu/common/src/libs/style';

const refreshPage = () =>
  typeof window !== 'undefined' && window.location.reload();

interface ErrorStateProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong.',
  subtitle = 'Something went wrong while making this page.',
  description = "We've been notified of what happened.",
}) => (
  <div className="Stonewall">
    <SadFaceIcon className="Stonewall__image" />
    <h1 className="type-canon">{title}</h1>
    <p className="type-pica">{subtitle}</p>
    <p className="type-pica">{description}</p>
    <button className="Button type-great-primer" onClick={refreshPage}>
      Refresh this page
    </button>

    <div>
      <button
        css={[
          type(TypeSize.LongPrimer),
          {
            marginTop: '2rem',
            border: 0,
            padding: 0,
            background: 'transparent',
            textDecoration: 'underline',
          },
        ]}
        className="type-great-primer"
        onClick={() => Raven.showReportDialog()}
      >
        Report this issue
      </button>
    </div>

    <div
      css={[
        type(TypeSize.LongPrimer),
        { marginTop: '1rem', color: COLORS.GREY_WINTER, fontStyle: 'italic' },
      ]}
    >
      issue #{Raven.lastEventId() || 'INDEV'}
    </div>
  </div>
);

export { ErrorState };
