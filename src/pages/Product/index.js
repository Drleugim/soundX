import { StyledMain } from './styles'
import Header from './../../components/Header'
import DetailedProduct from './../../components/DetailedProduct'

function Welcome(){
    return(
        <StyledMain>
            <Header/>
            <DetailedProduct/>
        </StyledMain>
    )
}
     
export default Welcome