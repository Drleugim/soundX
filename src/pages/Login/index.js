import LoginForm from '../../components/LoginForm'
import React from 'react'
import axios from 'axios'


class Login extends React.Component{
  state={
    email: '',
    password: '',
    showUserWarning: false,
  }

  handleSubmit = async e =>{
    e.preventDefault()

    this.setState({
      showUserWarning:false,
    })

    try {     
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/signin',
        data: this.state
      })

      localStorage.setItem('user', data.name)
      this.props.history.push('/welcome')

    } catch(error) {
      console.log(error)
      this.setState({
        showUserWarning: true,
        email:'',
        password: '',
      })
    }
  }

  handleChange = e =>{
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }


  render(){
    const { email, password, showUserWarning  } = this.state
    return(
      <div className="App">
          <LoginForm
            email={email}
            password={password}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          {showUserWarning && <h2>Wrong email or password, please try again</h2>}
      </div>
    )
  }
}

export default Login