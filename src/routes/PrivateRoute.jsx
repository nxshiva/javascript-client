import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts/index';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('Token');
  return (
    <>
      {token ? (
        <Route
          {...rest}
          render={(matchProps) => (
            <PrivateLayout>
              <Component {...matchProps} />
            </PrivateLayout>
          )}
        />
      )
        : (
          <Redirect to="/login" />
        )}
    </>
  );
};

export default PrivateRoute;

// PrivateRoute.propTypes = {
//   component: PropTypes.objectOf(PropTypes.any).isRequired,
// };
