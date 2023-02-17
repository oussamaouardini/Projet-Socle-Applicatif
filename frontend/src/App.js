import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './features/user/Users.js';




function App() {

  
  return (
    
    <Router>
    <div className="App">

        <div className="content">
          <Switch>
            <Route path="/" exact >
              <Users></Users>
            </Route>
          </Switch>
        </div>
      </div>
  </Router>
  );
}

export default App;
