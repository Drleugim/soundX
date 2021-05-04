import {Link} from 'react-router-dom'
import Logo from '../Logo'
import {
  StyledSection,
  StyledForm,
} from './styles'

function RegistrationForm({email, password, confirmedPassword, handleSubmit, handleChange}){

    return(
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
                <label htmlFor="confirmedPassword">Confirm Password:</label>
                <input 
                    type="password"
                    id="confirmedPassword"
                    name="confirmedPassword"
                    value={confirmedPassword}
                    onChange={handleChange}
                />
                <button 
                    type="submit"
                    data-testid="signUpButton"
                >
                    Register
                </button>
                <p>Already have an account?  <Link to="/">Login</Link></p>
                <a href="#">Forgot Password?</a>
            </StyledForm>
        </StyledSection>
        
    )
}

export default RegistrationForm;