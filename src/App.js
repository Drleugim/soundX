import {
  BrowserRouter as  Router,
  Route,
  Switch,
} from 'react-router-dom'
import Welcome from './pages/Welcome/Welcome'
import React from 'react'
import Login from './pages/Login/Login'

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path= "/welcome/:id" component={Welcome}/>
      </Switch>
    </Router>
  )
}

export default App;
