import React from 'react';

interface IProps {
  dark?: boolean;
}

function Loader({ dark = false }: IProps) {
  return (
    <div className="RippleLoader">
      <div style={{ borderColor: dark ? '#000' : '#fff' }} />
    </div>
  );
}

export default Loader;
