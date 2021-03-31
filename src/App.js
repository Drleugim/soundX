import {
  BrowserRouter as  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Welcome from './pages/Welcome/'
import Login from './pages/Login/'
import Signup from './pages/Signup/'
import Publish from './pages/Publish'
import React from 'react'
import './App.css';


function PrivateRoute(props) {
  const token = localStorage.getItem('token')
  const { path } = props 

  if(!token && path!=="/" && path!=="/signup") return <Redirect to="/"/>
  
  if(token){
    if(path==="/" || path==="/signup") return <Redirect to="/welcome"/>
  } 
  return <Route {...props} />
} 

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Login}/>
        <PrivateRoute exact path="/signup" component={Signup}/>
        <PrivateRoute exact path="/welcome" component={Welcome}/>
        <PrivateRoute exact path="/publish" component={Publish}/>
      </Switch>
    </Router>
  )
}

export default App;
