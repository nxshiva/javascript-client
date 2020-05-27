import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../components/index';

const PrivateLayout = ({ children, ...rest }) => (
  <div>
    <div><NavBar /></div>
    <div>{children}</div>
  </div>
);

export default PrivateLayout;

PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
