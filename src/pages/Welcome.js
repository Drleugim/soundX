function Welcome (props) {
    return(
        <main>
            <a href="/">
                Logout
            </a>
            <h1>Welcome {props.match.params.id}</h1>
        </main>
   )
}

export default Welcome 