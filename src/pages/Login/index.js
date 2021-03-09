import { userData } from '../../data/userData'
import LoginForm from '../../components/LoginForm'
import {WrongWarning} from './styles'
import React from 'react'


class Login extends React.Component{
  state={
    email:'',
    password: '',
    users: userData,
    userNotFound: false,
  }

  handleSubmit = e =>{
    e.preventDefault()
    
    const { email, password, users } = this.state
    
    const [ userAccess ] = users.filter( user => user.email === email && user.password === password )  

    if(userAccess){
      this.props.history.push(`/welcome/${userAccess.name}`)
    }else{
      this.setState({
        userNotFound : true,
        email:'',
        password: '',
      })
    }
  }

  handleChange = e =>{
    const { name, value } = e.target
    this.setState({
      [name] : value,
    })
  }


  render(){
    const { email, password, userNotFound } = this.state
    return(
      <div className="App">
          <LoginForm
            email={email}
            password={password}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          {userNotFound && <WrongWarning>Wrong email or password, please try again</WrongWarning>}
      </div>
    )
  }
}

export default Login