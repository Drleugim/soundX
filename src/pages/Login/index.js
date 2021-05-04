import {
  StyledMain,
  StyledUserWarning,
  StyledSection
} from './styles'
import LoginForm from '../../components/LoginForm'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, updateUserData, toggleUserWarning } from '../../store/userReducer'

function Login(){
  const { email, password, userWarning, userData } = useSelector (({ userReducer })=>({
    email: userReducer.email,
    password: userReducer.password,
    userWarning: userReducer.userWarning,
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
    dispatch(userLogin({ email, password }))
  }
   
  useEffect(() => {
    if(userData){
      localStorage.setItem('token', userData.token)
      history.push('/welcome')  
    }
  })

  return(
    <StyledMain>
      <LoginForm
        email={email}
        password={password}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {
        userWarning && 
        <StyledSection>
          <StyledUserWarning/>
          <p data-testid="userWarning">Wrong email or password, please try again</p>
        </StyledSection>
      }
    </StyledMain>
  )
}

export default Login