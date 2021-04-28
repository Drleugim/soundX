import {Link} from 'react-router-dom'
import Logo from '../Logo'
import {
  StyledSection,
  StyledForm,
} from './styles'

function LoginForm({ email, password, handleSubmit, handleChange }){

	return (
		<StyledSection>
			<Logo/>
			<StyledForm onSubmit={handleSubmit}>
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
				<button type="submit" data-testid="signInButton">Sign In</button>
				<p>Dont have an account?  <Link to="/signup">Register</Link></p>
				<a href="#">Forgot Password?</a>
			</StyledForm>		
		</StyledSection>
	)
}

export default LoginForm;