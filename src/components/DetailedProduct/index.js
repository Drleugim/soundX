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
import { addToCart, getProduct } from '../../store/productReducer'

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
    const dispatch = useDispatch()

    const { id } = useParams()

    const handleSubmit = e =>{
      e.preventDefault()
      dispatch(addToCart(id))
    } 

    useEffect(()=> {
      console.log('id: ', id)
      console.log('id type: ', id.typeOf)
      dispatch(getProduct(id))
    }, [])

    return(
      <StyledArticle>
      <StyledSectionPic>
        <StyledUserLink to="#">
          <StyledUserIcon/>
          {!!user && user.email}
        </StyledUserLink>
        <p>{nameProduct}</p>
        <StyledImage Img={picture}/>
      </StyledSectionPic>
      <StyledSectionDes>
        <p>Brand: {brand}</p>
        <p>Available: {quantity}</p>
        <p>{description}</p>
        <StyledNav>
          <StyledBuyRent onClick={handleSubmit}>Buy for: {buyPrice}</StyledBuyRent>
          <StyledBuyRent onClick={handleSubmit}>Rent for: {rentPrice}</StyledBuyRent>
        </StyledNav>
      </StyledSectionDes>
    </StyledArticle >
    )
}

export default DetailedProduct