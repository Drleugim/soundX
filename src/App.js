import {
  BrowserRouter as  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Welcome from './pages/Welcome/'
import React from 'react'
import Login from './pages/Login/'
import Signup from './pages/Signup/'
import './App.css';

function PrivateRouteWelcome(props) {
  const user = localStorage.getItem('user')

  if(!user) return <Redirect to="/" />
  return <Route {...props} />
}

function PrivateRouteLogin(props) {
  const user = localStorage.getItem('user')

  if(user) return <Redirect to="/welcome" />
  return <Route {...props} />
}

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRouteLogin exact path="/" component={Login}/>
        <PrivateRouteLogin exact path="/signup" component={Signup}/>
        <PrivateRouteWelcome path= "/welcome" component={Welcome}/>
      </Switch>
    </Router>
  )
}

export default App;
