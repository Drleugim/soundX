import { 
    StyledSection,
    StyledMainSection
 } from './styles'
import Product from './../Product'
import Filter from './../Filter'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from './../../store/productReducer'

function Products() {
    const { products, productsFiltered } = useSelector(({productReducer}) => ({
        products: productReducer.products,
        productsFiltered: productReducer.productsFiltered
    }))                   
    const dispatch = useDispatch()
    const productsToDisplay = productsFiltered.length>0 ? productsFiltered : products
   
    useEffect(()=>{
       dispatch(getProducts())
    }, [])

    return(
        <StyledMainSection>
            <Filter/>
            <StyledSection>
           {!!productsToDisplay && productsToDisplay.length > 0 ? productsToDisplay.map(({
                _id,
                nameProduct,
                buyPrice,
                rentPrice,
                brand,
                description,
                user,
                picture,
                status,
                newUsed
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
                            status={status}
                            condition={newUsed}
                        />
                    )
                }): (<p>No existen productos</p>)
            }
            </StyledSection>
        </StyledMainSection>
        
    )
}

export default Products