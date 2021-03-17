import React from 'react'
import {
  SectionWelcome,
  SectionBRPub, 
} from './styles'


function Welcome(props) {
  const user = props.location.state ? props.location.state.email : props.match.params.id

  return(
    <SectionWelcome>
      <a href="/" className="Logout">Logout</a>
      <h1>Welcome {user}</h1>
      <SectionBRPub>
        <a href="/buy-rent" className="BuyRent">Buy/Rent</a>
        <a href="/publish" className="Publish">Publish</a>
      </SectionBRPub>
    </SectionWelcome>
  )
}
export default Welcome