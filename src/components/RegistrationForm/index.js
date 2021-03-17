import {Link} from 'react-router-dom'
import {
  MainStyle,
  LogoStyle, 
  BackgroundSection,
} from './styles'

function RegistrationForm({ email, password, confirmedPassword, handleSubmit, handleChange}){

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
            <label htmlFor="confirmedPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmedPassword"
              name="confirmedPassword"
              value={confirmedPassword}
              onChange={handleChange}
            />
          </section>
          <section>
            <button
              type="submit"
            >
              Register
            </button>
            <section className="userPass">
              <a>Already have an account?  <Link to="/">Login</Link></a>
              <a href="#">Forgot Password?</a>
            </section>
          </section>
        </form>
      </MainStyle>
    </BackgroundSection>
  )
}

export default RegistrationForm;