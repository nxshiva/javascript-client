import React from 'react';

const withLoaderAndMessage = (WrappedComponent) => (props) => (
  <WrappedComponent {...props} />
);
export default withLoaderAndMessage;
