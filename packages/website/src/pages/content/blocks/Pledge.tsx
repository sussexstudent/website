import React from 'react';
import { FalmerImage } from '@ussu/common/src/types/events';
import convert from 'htmr';
import { AspectRatio, OneImage } from '@ussu/website/src/components/OneImage';
import { css } from '@emotion/core';
import { COLORS } from '@ussu/basil/src/style';
import { type, TypeSize } from '@ussu/basil/src/style/type';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

const pledgeHeaderStyles = css({
  display: 'flex',
  flexDirection: 'column',
});

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const color = `${status == 'done' ? COLORS.BRAND_GREEN : '#ff8c00'}`;
  return (
    <div
      className={status}
      css={{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: color,
        ...type(TypeSize.Brevier),
        '::before': {
          height: '12px',
          width: '12px',
          borderRadius: '50%',
          display: 'inline-block',
          marginRight: '8px',
          verticalAlign: 'bottom',
          backgroundColor: color,
          content: '""',
        },
      }}
    >
      {status.replace('_', ' ')}
    </div>
  );
};

export type PledgeBlockData = StreamFieldBlockData<
  'pledge',
  {
    title: string;
    body: string;
    status: string;
    image: FalmerImage;
  }
>;

export const Pledge: StreamFieldBlock<PledgeBlockData> = ({
  block: { title, body, status, image },
  index,
}) => {
  const reverse = index % 2 === 0 ? 'row' : 'row-reverse';

  return (
    <div
      css={{
        marginBottom: '3rem',
        '::after': {
          content: '""',
          display: 'block',
          height: '1px',
          width: '10%',
          margin: '0 auto',
          backgroundColor: COLORS.GREY_WINTER,
          position: 'relative',
        },
      }}
    >
      <div
        css={{
          display: 'grid',
          grid: '2fr 3fr',
          paddingBottom: '3rem',
          flexDirection: reverse,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div css={pledgeHeaderStyles}>
            <h1 css={[type(TypeSize.DoublePica), { margin: 0 }]}>{title}</h1>
            {status !== 'blank' ? <StatusBadge status={status} /> : null}
          </div>
          <div className="type-body-copy">{convert(body)}</div>
        </div>
        <div css={{ maxWidth: 500 }}>
          <OneImage
            aspectRatio={AspectRatio.r16by9}
            src={image.resource}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
