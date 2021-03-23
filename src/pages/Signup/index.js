import RegistrationForm from '../../components/RegistrationForm'
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
function Signup(){
    const [userSignUp, setUserSignUp] = useState({ email : '', password : ''})
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const [showPasswordWarning, setShowPasswordWarning] = useState(false)
    const [showUserWarning, setShowUserWarning] = useState(false)

    const SIGNUP_ENDPOINT=process.env.REACT_APP_SERVER_URL+'/users/signup'

    let history = useHistory()

    function handleSubmit (e){
        e.preventDefault()
        setShowPasswordWarning(false)
        setShowUserWarning(false)

        if( userSignUp.password === confirmedPassword ){

            axios.post(SIGNUP_ENDPOINT, userSignUp)
            .then( (res) => {
                const { email } = res.data
                localStorage.setItem('user', email)
                history.push('/welcome')
            })
            .catch(function (error) {
                setUserSignUp({ email : '', password : ''})
                setConfirmedPassword('')
                setShowUserWarning(true)

            })
        }else{
            setShowPasswordWarning(true)
            setUserSignUp({ email : '', password : ''})
            setConfirmedPassword('')
        }
    }


    function handleChange (e){
        const { name, value } = e.target
        setUserSignUp({...userSignUp, [name] : value})
    }

    function handleConfirmPassword (e){
        const { value } = e.target
        setConfirmedPassword(value)
    }

    return(
     <div className="App"> 
          <RegistrationForm
            email={userSignUp.email}
            password={userSignUp.password}
            confirmedPassword={confirmedPassword}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleConfirmPassword={handleConfirmPassword}
          />
          {showPasswordWarning && <p>Please make sure your passwords match</p>}
          {showUserWarning && <p>Another user with this email already exist!</p>}
      </div>
    )
}

export default Signup