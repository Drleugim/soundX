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


function PrivateRoute(props) {
  const user = localStorage.getItem('user')
  const { path } = props 

  if(!user && path!=="/" && path!=="/signup") return <Redirect to="/"/>
  
  if(user){
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
      </Switch>
    </Router>
  )
}

export default App;
