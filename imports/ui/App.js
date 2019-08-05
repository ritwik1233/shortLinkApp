import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";


import SignUp from './Signup';
import Link from './Link';
import NotFound from './NotFound';
import Login from './Login';

const customHistory = createBrowserHistory();

const App = () => {
    return (
      <BrowserRouter history = { customHistory }>
        <Switch>
          <Route exact path = '/' component = { Login }  />
          <Route  path = '/signup' component = { SignUp } />
          <Route  path = '/links' component = { Link } />
          <Route component = { NotFound } />
        </Switch>
      </BrowserRouter>
    );       
};

export default App;