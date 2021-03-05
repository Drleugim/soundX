import React from 'react'
function Welcome(props) {
    return(
        <section>
            <a href="/">Logout</a>
            <h1>Welcome {props.match.params.id}</h1>
        </section>
    )
}
export default Welcome