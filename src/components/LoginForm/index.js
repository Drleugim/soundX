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
						>
							Sign In
						</button>
						<section className="userPass">
							<a>Dont have an account?  <Link to="/signup">Register</Link></a>
							<a href="#">Forgot Password?</a>
						</section>
					</section>
				</form>
			</MainStyle>
		</BackgroundSection>
	)
}

export default LoginForm;