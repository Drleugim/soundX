import { 
  StyledArticle,
  StyledSectionPic,
  StyledSectionDes,
  StyledImage, 
  StyledUserIcon,
  StyledUserLink,
  StyledBuyRent,
  StyledNav} from './styles'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, getProduct, productReducer } from '../../store/productReducer'

function DetailedProduct() {
    const { 
      picture,
      nameProduct,
      brand,
      quantity,
      description,
      buyPrice,
      rentPrice,
      user,
    } = useSelector(({productReducer}) =>  productReducer.product )

    const { loading } = useSelector(({productReducer}) =>  ({ loading: productReducer.loading }))

    const dispatch = useDispatch()
    
    const { id } = useParams()

    const handleSubmit = e =>{
      e.preventDefault()
      dispatch(addToCart(id))
    } 

    useEffect(()=> {
      dispatch(getProduct(id))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    console.log(loading)
    if(!!!user) return <p>loading...</p>

    return(
      <StyledArticle>
      <StyledSectionPic>
        <StyledUserLink to="#">
          <StyledUserIcon/>
          {!!user && user.name ? user.name : user.email}
        </StyledUserLink>
        <p>{nameProduct}</p>
        <StyledImage Img={picture}/>
      </StyledSectionPic>
      <StyledSectionDes>
        <p>Brand: {brand}</p>
        <p>Available: {quantity}</p>
        <p>{description}</p>
        <StyledNav>
          <StyledBuyRent onClick={handleSubmit}>Buy: {buyPrice}</StyledBuyRent>
          <StyledBuyRent onClick={handleSubmit}>Rent: {rentPrice}</StyledBuyRent>
        </StyledNav>
      </StyledSectionDes>
    </StyledArticle >
    )
}

export default DetailedProduct