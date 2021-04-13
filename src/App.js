import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import RoutesWithNavigation from './components/RoutesWithNavigation';
import Login from './components/pages/Login';
import {PrivateRoute} from "./components/PrivateRoute";

const App = () => {
    return (
        <Switch>
            <Route path='/login' exact component={Login}/>
            <PrivateRoute path="/" component={RoutesWithNavigation}/>
            <RoutesWithNavigation/>
        </Switch>
    );
};

export default App;
