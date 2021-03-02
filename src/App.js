import React from 'react'
import LoginForm from './components/LoginForm'
import './App.css';

class App extends React.Component{

  state={
    email:'',
    password: '',
  }

  handleSubmit = e =>{
    e.preventDefault()
    
  }


  handleChange = e =>{
    const {name, value} = e.target
    this.setState({
      [name] : value,
    })

//  console.log(value)
  }

  render(){
    const {email, password} = this.state
      return (
        <div className="App">
          <LoginForm
            email={email}
            password={password}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          >
          </LoginForm>
        </div>
      );
  }
}

export default App;
