import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../store/userReducer'
import {
  SectionWelcome,
  SectionBRPub, 
} from './styles'

function Welcome(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = localStorage.getItem('user')

  function handleLogout(e){
    e.preventDefault()
    dispatch(userLogout())
    localStorage.clear()
    history.push('/')
  }

  return(
    <SectionWelcome>
      <Link onClick={handleLogout}>Logout</Link>
      <h1>Welcome {user}</h1>
      <SectionBRPub>
        <a href="/buy-rent" className="BuyRent">Buy/Rent</a>
        <a href="/publish" className="Publish">Publish</a>
      </SectionBRPub>
    </SectionWelcome>
  )
}
export default Welcome