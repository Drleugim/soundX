import React from 'react'
import { Link } from 'react-router-dom'
import {
  SectionWelcome,
  SectionBRPub, 
} from './styles'

function Welcome(props) {
  const user = localStorage.getItem('user')

  function handleLogout(e){
    e.preventDefault()
    localStorage.clear()
    props.history.push('/')
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