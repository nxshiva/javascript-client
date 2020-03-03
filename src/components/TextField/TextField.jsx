import React from 'react';
import Input, { P } from './style';

export default function TextField(props) {
  // eslint-disable-next-line react/prop-types
  const { value, disabled, error } = props;
  return (
    <>
      <Input type="text" value={value} disabled={(disabled)} />
      <P>
        {error}
      </P>
    </>
  );
}
