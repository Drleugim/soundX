import { 
    StyledArticle,
    StyledImage, 
    StyledUserIcon,
    StyledUserLink,
    StyledBuyRent,
    StyledNav} from './styles'

function Product({name, buyPrice, rentPrice, brand, user, picture, id}) {
    return(
        <StyledArticle >
            <StyledUserLink to="#">
                <StyledUserIcon/>
                {user.email}
            </StyledUserLink>
            <StyledImage Img={picture}/>
            <p>{name}</p>
            <p>{brand}</p>
            <p>Buy: ${buyPrice}</p>
            <p>Rent: ${rentPrice}</p>
            <StyledNav>
                <StyledBuyRent to={`/product/${id}`}>View </StyledBuyRent>
            </StyledNav>
        </StyledArticle >
    )
}

export default Product