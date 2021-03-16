import {
  BrowserRouter as  Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom'
import Welcome from './pages/Welcome/'
import React from 'react'
import Login from './pages/Login/'
import Signup from './pages/Signup/'

import './App.css';

function App() {
  return (
    <Router>
      {/* <nav>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/">Login</Link>
      </nav> */}
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route path= "/welcome" component={Welcome}/>
      </Switch>
    </Router>
  )
}

export default App;
