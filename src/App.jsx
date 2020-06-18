import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import { PrivateRoute, AuthRoute } from './routes/index';
import {
  TextFieldDemo, InputDemo, CalculatorDemo, TraineeRoutes, NotFound,
} from './pages/index';
import { SnackBarProvider } from './contexts';
import apolloClient from './lib/utils/apollo-client';
import Login from './pages/Login/Wrapper';

function App() {
  return (
    <SnackBarProvider>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <AuthRoute exact path="/login" component={Login} />
            <PrivateRoute path="/trainee" component={TraineeRoutes} />
            <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
            <PrivateRoute exact path="/input-demo" component={InputDemo} />
            <PrivateRoute exact path="/children-demo" component={CalculatorDemo} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </Router>
      </ApolloProvider>
    </SnackBarProvider>
  );
}

export default App;
