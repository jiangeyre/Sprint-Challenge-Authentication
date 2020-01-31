import React from 'react';
import { BrowserRouter as Router, Router, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import List from './components/List';
import PrivateRoute from './utils/PrivateRoute';

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Log in!</Link>
          </li>
          <li>
            <Link to="/jokes">Joke List 🤡</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute path="/jokes" component={List} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
