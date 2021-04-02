import { StyledNav, StyledLink } from './styles'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogout } from './../../store/userReducer'

function UserNavBar() {
  const history = useHistory()
  const dispatch = useDispatch()

  function handleLogout(e){
    e.preventDefault()
    dispatch(userLogout())
    localStorage.clear()
    history.push('/')
  }

  return(
    <StyledNav>
      <StyledLink to="#">Search</StyledLink>
      <StyledLink to="#" onClick={handleLogout}>Logout</StyledLink>
      <StyledLink to="#"/>
    </StyledNav>
  )
}
export default UserNavBar