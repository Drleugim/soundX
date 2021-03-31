import { StyledMain } from './styles'
import Header from './../../components/Header'
import Products from './../../components/Products'

function Welcome(){
    return(
        <StyledMain>
            <Header/>
            <Products/>
        </StyledMain>
    )
}
     
export default Welcome