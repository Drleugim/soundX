import LoginForm from '../../components/LoginForm'
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'


function Login(){

   const [userSignIn, setUserSignIn] = useState({ email : '', password : ''})
   const [showUserWarning, setShowUserWarning] = useState(false)

   let history = useHistory()

   const SIGNIN_ENDPOINT = process.env.REACT_APP_SERVER_URL+'/users/signin'
 

   function handleSubmit(e){
        e.preventDefault()

        axios.post(SIGNIN_ENDPOINT, userSignIn)
          .then( (res) => {
              const { name } = res.data
              localStorage.setItem('user', name)
              history.push('/welcome')
          })
          .catch(function (error) {
              console.log(error)
              setShowUserWarning(true)
              setUserSignIn({ email : '', password : ''})
          })
   } 

    function handleChange(e){
        const { name, value } = e.target
        setUserSignIn({...userSignIn, [name] : value})
    }

    return(
      <div className="App">
          <LoginForm
            email={userSignIn.email}
            password={userSignIn.password}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
          {showUserWarning && <h2>Wrong email or password, please try again</h2>}
      </div>
    )
}

export default Login