import { 
  StyledArticle,
  StyledImage, 
  StyledUserIcon,
  StyledUserLink,
  StyledDes,
  StyledBuyRent,
  StyledNav} from './styles'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../store/productReducer'

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
    
    console.log(user)

    const { id } = useParams()

    useEffect(()=> {
      dispatch(getProduct(id))
    }, [])

    return(
      <StyledArticle>
      <StyledUserLink to="#">
          <StyledUserIcon/>
           {!!user && user.email}
      </StyledUserLink>
      <name>{nameProduct}</name>
      <StyledImage Img={picture}/>
      <pp>Brand: {brand}</pp>
      <pp>Available: {quantity}</pp>
      <des>{description}</des>
      <StyledNav>
          <StyledBuyRent to="#">Buy for: {buyPrice}</StyledBuyRent>
          <StyledBuyRent to="#">Rent for: {rentPrice}</StyledBuyRent>
      </StyledNav>
  </StyledArticle >
    )
}

export default DetailedProduct