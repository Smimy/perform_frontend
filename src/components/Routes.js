import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import WorkoutDetails from "./pages/WorkoutDetails";
import {PrivateRoute} from "./PrivateRoute";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/details' component={WorkoutDetails} />
          <PrivateRoute exact path='/details/:workoutId' component={WorkoutDetails} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;