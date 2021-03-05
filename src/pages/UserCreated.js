function UserCreated (props) {
    console.log(props)
    return(
        <main>
            <a href="/">
                Logout
            </a>
            <h1> User created with {props.match.params.id}</h1>
        </main>
   )
}

export default UserCreated 