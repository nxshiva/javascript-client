import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

function TraineeRoutes(props) {
  console.log('Routes props', props);
  // const { match: { path } } = props;
  const { path } = useRouteMatch();
  console.log('routes path', path);
  return (
    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route exact path={`${path}/:id`} component={TraineeDetail} />
    </Switch>
  );
}

export default TraineeRoutes;
