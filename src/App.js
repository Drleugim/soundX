import {
  BrowserRouter as  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Welcome from './pages/Welcome/'
import Login from './pages/Login/'
import Signup from './pages/Signup/'
import Product from './pages/Product'
import Publish from './pages/Publish'
import EditProfile from './pages/EditProfile'
import SuccessPayment from './pages/SuccessPayment'
import Cart from './pages/Cart'
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
        <PrivateRoute exact path="/product/:id" component={Product}/>
        <PrivateRoute exact path="/editProfile/:id" component={EditProfile}/>
        <PrivateRoute exact path="/cart"  component={Cart}/>
        <PrivateRoute exact path="/successPayment"  component={SuccessPayment}/>
      </Switch>
    </Router>
  )
}

export default App;
