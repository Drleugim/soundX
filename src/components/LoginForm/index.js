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
    BackgroundSection,
    ButtonStyle,
} from './styles'

function LoginForm({ email, password, handleSubmit, handleChange}){

    return(
        <BackgroundSection>
            <MainStyle>
                <LogoStyle
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
                        <ButtonStyle
                            type="submit"
                        >
                            Sign In
                        </ButtonStyle>
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
        </BackgroundSection>
    )
}

export default LoginForm;