import {Link} from 'react-router-dom'
import {
    MainStyle,
    LogoStyle, 
    FormStyle,
    LabelEmailStyle, 
    LabelPasswordStyle,
    InputStyle,
    SectionStyle,
    SectionUserPass,
} from './styles'

import logo from '../../media/pictures/SNX-logo.png'

function LoginForm({ email, password, handleSubmit, handleChange}){

    return(
        <MainStyle>
            <LogoStyle
                src={logo}                     
                alt="SNX-Logo"
            />
            <FormStyle onSubmit={handleSubmit}>
                <SectionStyle>
                    <LabelEmailStyle htmlFor="email">E-mail:</LabelEmailStyle>
                    <InputStyle
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </SectionStyle>
                <SectionStyle>
                    <LabelPasswordStyle htmlFor="password">Password:</LabelPasswordStyle>
                    <InputStyle
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </SectionStyle>
                <SectionStyle>
                    <button 
                        type="submit"
                    >
                        Sign In
                    </button>
                    <SectionUserPass>
                        <Link to={{
                            pathname: "/welcome/newUser",
                            state: {email: email},
                        }}
                        >Create user </Link>
                        <a href="#">Forgot Password?</a>
                    </SectionUserPass>
                </SectionStyle>
            </FormStyle>
        </MainStyle>
    )
}

export default LoginForm;