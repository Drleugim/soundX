import { 
    StyledArticle,
    StyledImage, 
    StyledUserIcon,
    StyledUserLink
} from './styles'

function Product({name, buyPrice, rentPrice, user, picture, id}) {
    return(
        <StyledArticle >
            <StyledUserLink to="#">
                <StyledUserIcon/>
                {user.name}
            </StyledUserLink>
            <StyledImage Img={picture}/>
            <StyledUserLink className="linkToProduct" to={`/product/${id}`}>{name}</StyledUserLink >
            <span>Buy for: {buyPrice}</span>
            <span>Rent for: {rentPrice}</span>
        </StyledArticle >
    )
}

export default Product