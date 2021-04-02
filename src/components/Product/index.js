import { 
    StyledArticle,
    StyledImage, 
    StyledUserIcon,
    StyledUserLink,
    StyledBuyRent,
    StyledNav} from './styles'

function Product({name, buyPrice, rentPrice, brand, user, picture}) {
    return(
        <StyledArticle >
            <StyledUserLink to="#">
                <StyledUserIcon/>
                {user.name}
            </StyledUserLink>
            <StyledImage Img={picture}/>
            <p>{name}</p>
            <p>{brand}</p>
            <StyledNav>
                <StyledBuyRent to="#">Buy for: {buyPrice}</StyledBuyRent>
                <StyledBuyRent to="#">Rent for: {rentPrice}</StyledBuyRent>
            </StyledNav>
        </StyledArticle >
    )
}

export default Product