import RegistrationForm from '../../components/RegistrationForm'
import React from 'react'
import axios from 'axios'


class Signup extends React.Component{
  state={
    email: '',
    password: '',
    confirmedPassword:'',
    showPasswordWarning:false,
    showUserWarning:false,
  }

  handleSubmit = async e =>{
    e.preventDefault()
    const { password, confirmedPassword } = this.state
    if( password === confirmedPassword ){
      try {
        const { data } = await axios({
          method: 'POST',
          baseURL: 'http://localhost:8000',
          url: '/users/signup',
          data: this.state
        })

        localStorage.setItem('user', data.email)
        this.props.history.push('/welcome')
        
      } catch(error) {
          this.setState({
            error: error,
          })
        }
  } else{
      this.setState({
          showPasswordWarning : true,
          password: '',
          confirmedPassword:''
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
    const { 
      email, 
      password, 
      confirmedPassword, 
      showPasswordWarning, 
      showUserWarning } = this.state
    return(
      <div className="App"> 
          <RegistrationForm
            email={email}
            password={password}
            confirmedPassword={confirmedPassword}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          {showPasswordWarning && <p>Please make sure your passwords match</p>}
          {showUserWarning && <p>Another user with this email already exist!</p>}
      </div>
    )
  }
}

export default Signup