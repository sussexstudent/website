import React from 'react';
import { StreamFieldBlock, StreamFieldBlockData } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';
import convert from 'htmr';
import { AspectRatio, OneImage } from '@ussu/website/src/components/OneImage';
import { css } from '@emotion/core';
import { COLORS } from '@ussu/common/src/libs/style';

const pledgeHeaderStyles = css({
  display: 'flex',
  alignItems: 'center',
});

const right = css({
  marginRight: '0 !important',
  marginLeft: '1rem !important',
});

const left = css({
  marginRight: '1rem !important',
  marginLeft: '0 !important',
});

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const color = `${
    status == 'done' ? COLORS.BRAND_GREEN : COLORS.BRAND_YELLOW
  }`;
  return (
    <div
      className={status}
      css={{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingLeft: '1rem',
        marginTop: '20px',
        marginBottom: '10px',
        fontSize: '14px',
        color: color,
      }}
    >
      <span
        css={{
          height: '20px',
          width: '20px',
          borderRadius: '50%',
          display: 'inline-block',
          marginRight: '8px',
          verticalAlign: 'bottom',
          backgroundColor: color,
        }}
      ></span>
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
  const itemClass = reverse == 'row-reverse' ? right : left;
  let statusComponent;
  if (status !== 'blank') {
    statusComponent = <StatusBadge status={status} />;
  }
  return (
    <div
      className="Trail Trail__row--11"
      css={{ marginBottom: '5%', flexDirection: reverse }}
    >
      <div css={itemClass}>
        <div css={pledgeHeaderStyles}>
          <h1>{title}</h1>
          {statusComponent}
        </div>
        <div className="type-body-copy">{convert(body)}</div>
      </div>
      <div>
        <OneImage
          aspectRatio={AspectRatio.r16by9}
          src={image.resource}
          alt=""
        />
      </div>
    </div>
  );
};
