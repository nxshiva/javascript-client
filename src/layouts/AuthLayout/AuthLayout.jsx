import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components/index';

const AuthLayout = ({ children, ...rest }) => (
  <div>
    <div>{children}</div>
    <div><Footer /></div>
  </div>
);

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
