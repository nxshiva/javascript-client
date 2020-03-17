import React from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import { PrivateRoute, AuthRoute } from './routes/index';
import {
  TextFieldDemo, InputDemo, CalculatorDemo, Trainee, NotFound, Login,
} from './pages/index';
// import { ThemeProvider } from '@material-ui/core/styles';
// import { Typography } from '@material-ui/core';
// import { theme } from './theme';
// import { Trainee } from './pages/index';
// import Login from './pages/Login/index';

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Trainee} />
        <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
        <PrivateRoute exact path="/input-demo" component={InputDemo} />
        <PrivateRoute exact path="/children-demo" component={CalculatorDemo} />
        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
