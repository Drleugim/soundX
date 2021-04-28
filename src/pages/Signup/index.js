import {
  StyledMain,
  StyledWarning,
  StyledSection
} from './styles'
import RegistrationForm from '../../components/RegistrationForm'
import { useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userSignup, updateUserData, toggleUserWarning, togglePasswordWarning } from '../../store/userReducer'

function Signup(){
  const { email, password, confirmedPassword, userWarning, passwordWarning, userData } = useSelector (({ userReducer })=>({
    email: userReducer.email,
    password: userReducer.password,
    confirmedPassword: userReducer.confirmedPassword,
    userWarning: userReducer.userWarning,
    passwordWarning: userReducer.passwordWarning,
    userData: userReducer.userData,
  }))
  const dispatch = useDispatch()
  const history = useHistory()

  function handleChange(e) {
    const { name, value } = e.target
    const data = { name, value }
    dispatch(updateUserData(data))
  }

  function handleSubmit (e){
    e.preventDefault()
    dispatch(toggleUserWarning(false))
    dispatch(togglePasswordWarning(false))
    if(password === confirmedPassword){
      dispatch(userSignup({ email, password }))
    }else{
      dispatch(togglePasswordWarning(true))
      dispatch(updateUserData({name:'password', value:''}))
      dispatch(updateUserData({name:'confirmedPassword', value:''}))
    }
    
  }

  useEffect(() => {
    if(userData){
      localStorage.setItem('token', userData.token)
      history.push('/welcome')  
    }
  })
 
  return(
    <StyledMain>
      <RegistrationForm
        email={email}
        password={password}
        confirmedPassword={confirmedPassword}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {
        passwordWarning  && 
        <StyledSection>
          <StyledWarning/>
          <p data-testid="passwordWarning">Please make sure your passwords match</p>
        </StyledSection>
      }
      {
        userWarning && 
        <StyledSection>
          <StyledWarning/>
          <p data-testid="signUpUserWarning">Another user with this email already exist!</p>
        </StyledSection>
      }
   </StyledMain>
  )
}

export default Signup