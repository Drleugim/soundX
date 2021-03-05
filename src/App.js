import {
  BrowserRouter as  Router,
  Route,
  Switch,
} from 'react-router-dom'
import Welcome from './pages/Welcome'
import UserCreated from './pages/UserCreated'
import React from 'react'
import Login from './pages/Login'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/welcome/:id" component={Welcome}/>
        <Route exact path="/newuser/:id" component={UserCreated}/>
      </Switch>
    </Router>
  );
}

export default App;
