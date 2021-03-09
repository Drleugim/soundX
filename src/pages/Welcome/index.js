import React from 'react'
import {SectionWelcome} from './styles'


function Welcome(props) {
    const user = props.location.state ? props.location.state.email : props.match.params.id

    return(
        <SectionWelcome>
            <a href="/">Logout</a>
            <h1>Welcome {user}</h1>
        </SectionWelcome>
    )
}
export default Welcome