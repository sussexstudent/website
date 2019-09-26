import React from 'react';
import cx from 'classnames';
import LoaderLeaves from '@ussu/common/src/icons/loader.svg';

interface IProps {
  dark?: boolean;
}

export const Loader: React.FC<IProps> = (props) => {
  return (
    <div className={cx('Loader', { 'Loader--dark': props.dark })}>
      <LoaderLeaves className="Loader__svg" />
    </div>
  );
};
