import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart, decreaseProductQuantity} from '../../store/productReducer'
import { 
  StyledArticle, 
  StyledSectionDes, 
  StyledSectionPic, 
  StyledUserLink, 
  StyledSectionBut } from './styles'

function ProductInCart({id, name, price, picture, qtyInCart}) {
    const dispatch = useDispatch()

    const handleRemoveFromCart = e =>{
        e.preventDefault()
        dispatch(removeFromCart(id))
    } 

    const handleDecreaseQuantity = e =>{
        e.preventDefault()
        dispatch(decreaseProductQuantity(id))
    } 

    const handleIncreaseQuantity = e =>{
        e.preventDefault()
        dispatch(addToCart(id))
    } 

    return(
        <StyledArticle>
          <StyledSectionPic>
            <img src={picture} alt=""/>
          </StyledSectionPic>
          <StyledSectionDes>
          <p>product name: {name}</p>
            <p>product id: {id}</p>
            <p>price: {price}</p>
            <p>quantity: {qtyInCart}</p>
          </StyledSectionDes>
          <StyledSectionBut>
            <StyledUserLink onClick={handleIncreaseQuantity}>+</StyledUserLink>
            <StyledUserLink onClick={handleDecreaseQuantity}>-</StyledUserLink>
            <StyledUserLink onClick={handleRemoveFromCart}>remove</StyledUserLink>
          </StyledSectionBut>
        </StyledArticle>
    )
}

export default ProductInCart