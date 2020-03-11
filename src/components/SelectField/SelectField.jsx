import React from 'react';
import PropTypes from 'prop-types';
import Select, { P, Options } from './style';

export default function SelectField(props) {
  const {
    defaultText, options, error, onChange, values,
  } = props;
  return (
    <>
      <Select value={values} onChange={onChange}>
        {defaultText && <Options>{defaultText}</Options>}
        {
          options && options.length && options.map(({ value, label }) => (
            <Options key={label} value={value}>{label}</Options>
          ))
        }
      </Select>
      <P>
        {error}
      </P>
    </>
  );
}

SelectField.propTypes = {
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'select',
};
