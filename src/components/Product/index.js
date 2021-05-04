import { 
    StyledArticle,
    StyledImage, 
    StyledUserIcon,
    StyledUserLink,
    StyledStatusTag,
    StyledNewIcon
} from './styles'

function Product({id, name, buyPrice, rentPrice, user, brand, picture, status, condition}) {
    return(
        <StyledArticle >
            <StyledUserLink to="#">
                <StyledUserIcon/>
                {user.name}
            </StyledUserLink>
            { condition==='new' && <StyledNewIcon/> } 
            <StyledStatusTag status={status}/> 
            <StyledImage Img={picture}/>
            <StyledUserLink className="linkToProduct" to={`/product/${id}`}>{name}</StyledUserLink >
            { (status==='sell' || status==='sellAndRent') && <span>Buy: {buyPrice}</span> }
            { (status==='rent' || status==='sellAndRent') && <span>Rent: {rentPrice}</span> }
           
        </StyledArticle >
    )
}

export default Product