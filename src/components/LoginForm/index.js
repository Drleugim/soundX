function LoginForm({email, password, handleSubmit, handleChange, handleNewUser}){

    return(

        <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input 
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            <button 
                type="submit"
            >
                Sign In
            </button>
             <button 
                onClick={handleNewUser}
                type="button"
             >
                Create User
            </button>
            <a href="#">Forgot Password?</a>
        </form>
    )
}

export default LoginForm;