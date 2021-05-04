import { StyledNav, StyledLink } from './styles'

function MainNavBar() {
    return(
        <StyledNav>
          <StyledLink  to="/welcome">Products</StyledLink >
          <StyledLink  to="#">Services</StyledLink >
          <StyledLink  to="#">Musicians</StyledLink >
          <StyledLink  to="/publish">Publish an instrument!</StyledLink >
        </StyledNav>
    )
}
export default MainNavBar