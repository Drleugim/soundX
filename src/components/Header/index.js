import { StyledHeader } from './styles'
import Logo from './../Logo'
import MainNavBar from './../MainNavBar'
import UserNavBar from './../UserNavBar'

function Header() {
    return(
        <StyledHeader>
            <Logo/>
            <UserNavBar />
            <MainNavBar/>
        </StyledHeader>
    )
}
export default Header