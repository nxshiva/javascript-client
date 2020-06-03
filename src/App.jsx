import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { PrivateRoute, AuthRoute } from './routes/index';
import {
  TextFieldDemo, InputDemo, CalculatorDemo, TraineeRoutes, NotFound, Login,
} from './pages/index';
import { SnackBarProvider } from './contexts';

function App() {
  return (
    <SnackBarProvider>
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
    </SnackBarProvider>
  );
}

export default App;
