import React from 'react';
import cx from 'classnames';
import LoaderLeaves from '~icons/loader.svg';

interface IProps {
  dark?: boolean;
}

function Loader(props: IProps) {
  return (
    <div className={cx('Loader', { 'Loader--dark': props.dark })}>
      <LoaderLeaves className="Loader__svg" />
    </div>
  );
}

export default Loader;
