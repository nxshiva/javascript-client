import React from 'react';
import PropTypes from 'prop-types';
import Input, { P } from './style';

export default function TextField(props) {
  const { onChange, error, value } = props;
  return (
    <>
      <Input type="text" onChange={onChange} value={value} />
      <P>
        {error}
      </P>
    </>
  );
}

TextField.propTypes = {
//  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  error: '',
};
