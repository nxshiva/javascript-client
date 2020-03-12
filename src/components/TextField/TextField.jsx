import React from 'react';
import PropTypes from 'prop-types';
import Input, { P } from './style';

export default function TextField(props) {
  const {
    onChange, error, value, onmouchenter, onBlur,
  } = props;
  console.log('TextField', error);
  return (
    <>
      <Input type="text" onChange={onChange} name="Name" value={value} onClick={onmouchenter} onBlur={onBlur} />
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
  onmouchenter: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  error: '',
};
