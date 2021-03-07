import React from 'react'

function Welcome(props) {
    const user = props.location.state ? props.location.state.email : props.match.params.id

    return(
        <section>
            <a href="/">Logout</a>
            <h1>Welcome {user}</h1>
        </section>
    )
}
export default Welcome