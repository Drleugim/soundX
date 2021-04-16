import {Link} from 'react-router-dom'
import {
  MainStyle,
  LogoStyle, 
  BackgroundSection,
} from './styles'

function LoginForm({ email, password, handleSubmit, handleChange }){

	return (
		<BackgroundSection>
			<MainStyle>
				<LogoStyle
					alt="SNX-Logo"
				/>
				<form onSubmit={handleSubmit}>
					<section>
						<label htmlFor="email">E-mail:</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={handleChange}
						/>
					</section>
					<section>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={handleChange}
						/>
					</section>
					<section>
						<button
							type="submit"
							data-testid="signInButton"
						>
							Sign In
						</button>
						<section className="userPass">
							<p>Dont have an account?  <Link to="/signup">Register</Link></p>
							<a href="#">Forgot Password?</a>
						</section>
					</section>
				</form>
			</MainStyle>
		</BackgroundSection>
	)
}

export default LoginForm;