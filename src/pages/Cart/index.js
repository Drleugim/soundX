import Header from './../../components/Header'
import ProductInCart from './../../components/ProductInCart'
import Payment from './../../components/Payment'
import { StyledP, StyledMain } from '../Cart/styled'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCartWithProductDetails} from '../../store/productReducer'

function Cart(){ 
    const { productsInCart} = useSelector(({productReducer}) => ({
        productsInCart: productReducer.productsInCart,
        cartSoldNotification: productReducer.cartSoldNotification
    }))         
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getCartWithProductDetails())
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <StyledMain>
            <Header/>
            {!!productsInCart && productsInCart.length > 0 ? productsInCart.map((product) => {
                    return(
                        <ProductInCart
                            key={product._id}
                            id={product._id}
                            name={product.nameProduct}
                            price={product.buyPrice}
                            picture={product.picture}
                            qtyInCart={product.qty}
                        /> 
                    )
                }): (<StyledP>Cart is empty</StyledP>)
            }      
            <Payment/> 
        </StyledMain>
    )
}

export default Cart