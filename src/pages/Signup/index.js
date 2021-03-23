import RegistrationForm from '../../components/RegistrationForm'
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
function Signup(){
    const [userSignUp, setUserSignUp] = useState({ email : '', password : '', confirmedPassword: ''})

    const [showPasswordWarning, setShowPasswordWarning] = useState(false)
    const [showUserWarning, setShowUserWarning] = useState(false)

    const SIGNUP_ENDPOINT=process.env.REACT_APP_SERVER_URL+'/users/signup'

    let history = useHistory()

    function handleSubmit (e){
        e.preventDefault()
        setShowPasswordWarning(false)
        setShowUserWarning(false)

        if( userSignUp.password === userSignUp.confirmedPassword ){

            const { email, password } = userSignUp
            const user = { email, password }
  
            axios.post(SIGNUP_ENDPOINT, user)
            .then( (res) => {
                const { email } = res.data
                localStorage.setItem('user', email)
                history.push('/welcome')
            })
            .catch(function (error) {
                setUserSignUp({ email : '', password : '', confirmedPassword: ''})
                setShowUserWarning(true)

            })
        }else{
            setShowPasswordWarning(true)
            setUserSignUp({ email : '', password : '', confirmedPassword: ''})
        }
    }


    function handleChange (e){
        const { name, value } = e.target
        setUserSignUp({...userSignUp, [name] : value})
    }

    return(
     <div className="App"> 
          <RegistrationForm
            email={userSignUp.email}
            password={userSignUp.password}
            confirmedPassword={userSignUp.confirmedPassword}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
          {showPasswordWarning && <p>Please make sure your passwords match</p>}
          {showUserWarning && <p>Another user with this email already exist!</p>}
      </div>
    )
}

export default Signup