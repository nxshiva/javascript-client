import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { P } from './style';

export default function RadioGroup(props) {
  const { options, onChange, error } = props;
  return (
    <>
      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <p>
              <input type="radio" onChange={onChange} name="sport" value={value} />
              {label}
            </p>
          </Fragment>
        ))
      }
      <P>
        {error}
      </P>
    </>
  );
}

RadioGroup.propTypes = {
  //  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RadioGroup.defaultProps = {
  error: '',
};
