import { 
    StyledArticle,
    StyledImage, 
    StyledUserIcon,
    StyledUserLink,
    StyledStatusTag,
    StyledNewIcon
} from './styles'

function Product({name, buyPrice, rentPrice, user, brand, picture, status, condition}) {
    return(
        <StyledArticle >
            <StyledUserLink to="#">
                <StyledUserIcon/>
                {user.name}
            </StyledUserLink>
            { condition==='new' && <StyledNewIcon/> } 
            <StyledStatusTag status={status}/> 
            <StyledImage Img={picture}/>
            <StyledUserLink className="linkToProduct" to="#">{name}</StyledUserLink >
            { (status==='sell' || status==='sellAndRent') && <span>Buy for: {buyPrice}</span> }
            { (status==='rent' || status==='sellAndRent') && <span>Rent for: {rentPrice}</span> }
           
        </StyledArticle >
    )
}

export default Product