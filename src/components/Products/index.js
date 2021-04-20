import { StyledSection } from './styles'
import Product from './../Product'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from './../../store/productReducer'

function Products() {
    const { products } = useSelector(({productReducer}) => ({products: productReducer.products}))                   
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())
    }, [])

    return(
        <StyledSection>
            {!!products && products.length > 0 ? products.map(({
                _id,
                nameProduct,
                buyPrice,
                rentPrice,
                brand,
                description,
                user,
                picture,
                }) => {
                return(
                    <Product
                        key={_id}
                        id={_id}
                        name={nameProduct}
                        buyPrice={buyPrice}
                        rentPrice={rentPrice}
                        description={description}
                        brand={brand}
                        user={user}
                        picture={picture}
                    />
                )
                }): (
                    <p>No existen productos</p>
                )
            }
        </StyledSection>
    )
}

export default Products