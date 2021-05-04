import { 
    StyledAside,
    StyledForm,
    StyledButton,
    StyledInput
} from './styles'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { applyFilter, clearFilter} from './../../store/productReducer'
import { getProducts } from './../../store/productReducer'

function Filter() {
    const [status, setStatus] = useState('')
    const [condition, setCondition] = useState('newAndUsed')
    const [minPrice, setMinPrice] = useState('0')
    const [maxPrice, setMaxPrice] = useState('1000')
    const dispatch = useDispatch()
    
    function handleSubmit(e){
        e.preventDefault()
        dispatch(applyFilter({
            condition,
            status,
            minPrice,
            maxPrice
        }))
    }
    function handleReset(){
        setStatus('')
        setCondition('newAndUsed')
        setMinPrice('0')
        setMaxPrice('1000')
        dispatch(clearFilter())
        dispatch(getProducts())
    }
    
    return(
        <StyledAside>
            <StyledForm onSubmit={handleSubmit}>
                <p>Selected Filters</p>
                <StyledButton
                    type="reset"
                    onClick={handleReset}
                >
                    Clear All
                </StyledButton>  
                <p>I want to:</p>
                <input 
                    type="radio" 
                    id="buy" 
                    name="status" 
                    value="sell" 
                    onChange={e => setStatus(e.target.value)}
                />
                <label htmlFor="buy">Buy</label>
                <input 
                    type="radio" 
                    id="rent" 
                    name="status" 
                    value="rent" 
                    onChange={e => setStatus(e.target.value)}
                />  
                <label htmlFor="rent">Rent</label> 
                <input 
                    type="radio" 
                    id="showall" 
                    name="status" 
                    value="" 
                    onChange={e => setStatus(e.target.value)}
                />  
                <label htmlFor="showAll">Show All</label> 
                <label htmlFor="condition">Item Condition</label>
                <select 
                    id="condition" 
                    name="condition"
                    value={condition}
                    onChange={e => setCondition(e.target.value)}>
                    <option value="newAndUsed">Show All</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select> 
                <p>Price</p>
                <label htmlFor="fromPrice">$ Min</label>
                <StyledInput 
                    type="text" 
                    id="minPrice"  
                    name="minPrice"
                    vale={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    placeholder="0"
                />
                <label htmlFor="toPrice">$ Max</label>
                <StyledInput
                    type="text" 
                    id="toPrice" 
                    name="toPrice"
                    vale={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    placeholder="1000"
                />
                <StyledButton type="submit">Apply filters</StyledButton>   
            </StyledForm>
        </StyledAside>
    )
}
export default Filter