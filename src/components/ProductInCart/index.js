import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart, decreaseProductQuantity} from '../../store/productReducer'

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
        <article>
            <p>product name: {name}</p>
            <p>product id: {id}</p>
            <p>quantity: {qtyInCart}</p>
            <p>price: {price}</p>
            <img src={picture} alt=""/>
            <button onClick={handleDecreaseQuantity}>quantity-1</button>
            <button onClick={handleIncreaseQuantity}>quantity+1</button>
            <button onClick={handleRemoveFromCart}>remove</button>
        </article>
    )
}

export default ProductInCart