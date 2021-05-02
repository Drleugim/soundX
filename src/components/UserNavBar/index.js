import { 
  StyledNav, 
  StyledLink, 
  StyledLinkUser,
  DropDown,
  DropDownContent,
 } from './styles'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout, userInfo } from './../../store/userReducer'

function UserNavBar() {
  const { name, email, id } = useSelector (({ userReducer })=>(userReducer.userInfo))
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
      <StyledLink to="/cart"/>
      <StyledLink to="#" onClick={handleLogout} data-testid="logout">Logout</StyledLink>
      <DropDown>
        <StyledLinkUser to="#">Hello {name ? name:email}</StyledLinkUser>
        <DropDownContent >
          <a href="#">Profile</a>
          <a href={`/editProfile/${id}`}>Edit Profile</a>
          <a href="#">Settings</a>
        </DropDownContent>
      </DropDown>
    </StyledNav>
  )
}
export default UserNavBar