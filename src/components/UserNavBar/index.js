import { StyledNav, StyledLink } from './styles'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout, userInfo } from './../../store/userReducer'

function UserNavBar() {
  const { userInformation } = useSelector (({ userReducer })=>({userInformation: userReducer.userInfo}))
  const history = useHistory()
  const dispatch = useDispatch()

  function handleLogout(e){
    e.preventDefault()
    dispatch(userLogout())
    localStorage.clear()
    history.push('/')
  }

  useEffect(()=>{
    dispatch(userInfo())
     // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

  return(
    <StyledNav>
      <StyledLink to="#"/>
      <StyledLink to="#" onClick={handleLogout} data-testid="logout">Logout</StyledLink>
      <StyledLink to="#">Hello {userInformation}</StyledLink>
    </StyledNav>
  )
}
export default UserNavBar