import axios from 'axios'

export const CLEAR_FILTER = 'CLEAR_FILTER'
export const APPLY_FILTER = 'APPLY_FILTERS'
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS'
export const PRODUCT_ERROR = 'PRODUCT_ERROR'
export const UPDATE_PRODUCT_DATA = 'UPDATE_PRODUCT_DATA'
export const UPDATE_PICTURE_DATA = 'UPDATE_PICTURE_DATA'
export const CLEAN_PRODUCT_DATA = 'CLEAN_PRODUCT_DATA'
export const TOGGLE_PRODUCT_WARNING = 'TOGGLE_PRODUCT_WARNING'
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
export const GET_SINGLE_PRODUCT_SUCCESS = 'GET_SINGLE_PRODUCT_SUCCESS'
export const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR'
export const ADDED_TO_CART = 'ADDED_TO_CART'
export const REMOVED_FROM_CART = 'REMOVED_FROM_CART'
export const GOT_CART_SUCCESSFULLY = 'GOT_CART_SUCCESSFULLY'
export const GOT_CART_WITH_PRODUCT_DETAILS_SUCCESSFULLY = 'GOT_CART_WITH_PRODUCT_DETAILS_SUCCESSFULLY'
export const CART_ERROR = 'CART_ERROR'
export const CART_SOLD_SUCCESSFULLY = 'CART_SOLD_SUCCESSFULLY'
export const PRODUCT_FINISHED = 'PRODUCT_FINISHED'
export const PRODUCT_LOADING = 'PRODUCT_LOADING'

export function clearFilter(){
  return{
    type: CLEAR_FILTER
  }
}

export function applyFilter(value){
  return{
    type: APPLY_FILTER,
    payload: value
  }
}

export function toggleProductWarning(value){
  return{
    type: TOGGLE_PRODUCT_WARNING,
    payload: value
  }
}

export function cleanProduct(){
  return{
    type: CLEAN_PRODUCT_DATA,
  }
}

export function updateProductData(data) {
    return {
        type: UPDATE_PRODUCT_DATA,
        payload: data,
    }
}

export function updatePictureData(data) {
  return {
      type: UPDATE_PICTURE_DATA,
      payload: data,
  }
}

export function productPublish(product){
  return async function(dispatch){
    try{
      const token = localStorage.getItem('token')
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/products/publish',
        data: product,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch({ type: PRODUCT_SUCCESS, payload: data })
    }catch(error){
      dispatch({ type: PRODUCT_ERROR, payload: error })
      dispatch(toggleProductWarning(true))
    }
  }
}

export function getProducts() {
  return async function(dispatch) {
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/products/buyRent'
      })
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: GET_PRODUCT_ERROR, payload: error })
    } 
  }
}

export function getProduct(id, qty) {
  return async function(dispatch) {
    dispatch({ type: PRODUCT_LOADING })
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/products/buyRent/${id}`
      })
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: {data, qty} })
    } catch(error) {
      dispatch({ type: GET_PRODUCT_ERROR, payload: error })
    } finally {
      dispatch({ type: PRODUCT_FINISHED })
    }
  }
}

export function addToCart(product_id){
  return async function(dispatch){
    try{
        const token = localStorage.getItem('token')
        const { data } = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/carts/add',
            data:{product_id},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        await dispatch({ type: ADDED_TO_CART, payload: data })
        await dispatch(getCartWithProductDetails())
    }catch(error){
      dispatch({ type: CART_ERROR, payload: error })
    }
  }
}

export function decreaseProductQuantity(product_id){
  return async function(dispatch){
    try{
        const token = localStorage.getItem('token')
        await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/carts/decreaseQty',
            data:{product_id},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        await dispatch(getCartWithProductDetails())
    }catch(error){
      dispatch({ type: CART_ERROR, payload: error })
    }
  }
}

export function removeFromCart(product_id){
  return async function(dispatch){
    try{
        const token = localStorage.getItem('token')
        const { data } = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/carts/remove',
            data:{product_id},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        await dispatch({ type: REMOVED_FROM_CART, payload: data })
        await dispatch(getCartWithProductDetails())
    }catch(error){
      dispatch({ type: CART_ERROR, payload: error })
    }
  }
}

export function getCart(){
    return async function(dispatch){
      try{
          const token = localStorage.getItem('token')
          const { data } = await axios({
              method: 'GET',
              baseURL: process.env.REACT_APP_SERVER_URL,
              url: '/carts/getCart',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          dispatch({ type: GOT_CART_SUCCESSFULLY, payload: data })
      }catch(error){
        dispatch({ type: CART_ERROR, payload: error })
      }
    }
}

export function getCartWithProductDetails(){
  return async function(dispatch, getState) {
    try{
      await dispatch(cleanProduct()) 
      await dispatch(getCart())
      const cart = getState().productReducer.cart
      let detailedCart = []
      let amount = 0
      if(cart.length > 0){
        for(let i=0; i<cart.length; i++){
          if(Object.entries(getState().productReducer.product).length !== 0){
            detailedCart.push(getState().productReducer.product)
          }
          await dispatch(getProduct(cart[i].product, cart[i].quantity))
        }
        detailedCart.push(getState().productReducer.product)
      }
      
      detailedCart.forEach( product => { 
        let value = Number(product.buyPrice) * Number(product.qty)
        amount = amount + value
      })
 
      await dispatch({ type: GOT_CART_WITH_PRODUCT_DETAILS_SUCCESSFULLY, payload: {detailedCart, amount} })

    }catch(error){
      dispatch({ type: CART_ERROR, payload: error })
    }
  }
}

export function emptyCart(){
  return async function(dispatch){
    try{
        const token = localStorage.getItem('token')
        const { data } = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/carts/emptyCart',
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        await dispatch({ type: CART_SOLD_SUCCESSFULLY, payload: data })
        await dispatch(getCartWithProductDetails())
        
    }catch(error){
      dispatch({ type: CART_ERROR, payload: error })
    }
  }
}

const initialState ={ 
    nameProduct: '', 
    buyPrice: '', 
    rentPrice: '',
    quantity: '',
    brand: '',
    description: '',
    newUsed:'',
    status: 'sell',
    picture: null,
    productWarning: false, 
    productData: '',
    error: null,
    products:[],
    productsFiltered:[],
    product: {},
    getProductError:null,
    productsInCart:[],
    cart:[],
    cartAmount: 0,
    productAddedNotification: false,
    productRemovedNotification: false,
    cartSoldNotification: false,
    cartError: null,
    loading: false,
}

export function productReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PRODUCT_DATA:
        return{
            ...state,
            [action.payload.name]: action.payload.value
        }
    case UPDATE_PICTURE_DATA:
      return{
          ...state,
          picture: action.payload
      }
    case TOGGLE_PRODUCT_WARNING:
        return{
          ...state,
          productWarning: action.payload
        }
    case PRODUCT_SUCCESS:
      return {
        ...state,
        productData: action.payload,
      }
    case PRODUCT_ERROR:
      return {
        ...state,
        nameProduct: '', 
        buyPrice: '', 
        rentPrice: '',
        quantity: '',
        brand: '',
        newUsed:'',
        description: '',
        picture: null,
        productWarning: false, 
        productData: '',
        error: action.payload,
      }
    case CLEAN_PRODUCT_DATA:
      return {
        ...state,
        nameProduct: '', 
        buyPrice: '', 
        rentPrice: '',
        quantity: '',
        brand: '',
        newUsed:'',
        description: '',
        picture: null,
        productWarning: false, 
        productData: '',
        product:{}
      }
    case GET_PRODUCT_SUCCESS:
      return{
        ...state,
        products: action.payload
      }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return{
        ...state,
        product: {...action.payload.data, qty:action.payload.qty}
      }
    case GET_PRODUCT_ERROR:
      return{
        ...state,
        getProductError: action.payload
      }  
      case APPLY_FILTER:
      let {condition, status, minPrice, maxPrice} = action.payload
      function reduceProducts (product){
        if(status===''){
          if(condition==='newAndUsed'){
            if(minPrice<=product.rentPrice && product.rentPrice<=maxPrice && minPrice<=product.buyPrice && product.buyPrice<=maxPrice){
                console.log('entro')
                return true
            }else{
              return false
            }
          }else{
            if(product.newUsed === condition){
              if(minPrice<=product.rentPrice && product.rentPrice<=maxPrice && minPrice<=product.buyPrice && product.buyPrice<=maxPrice){
                console.log('entro')
                return true
              }else{
                return false
              }
            }else{
              return false
            }
          }
        }
        else{
          if(condition==='newAndUsed'){
            if (product.status === status || product.status === 'sellAndRent'){
              if(status==='sell' && minPrice<=product.buyPrice && product.buyPrice<=maxPrice){
                return true
              }else if(status==='rent' && minPrice<=product.rentPrice && product.rentPrice<=maxPrice){
                return true
              }else{
                return false
              }
            }else{
              return false
            }
          }else{
            if(product.newUsed === condition){
              if(product.status === status || product.status === 'sellAndRent'){
                if(status==='sell' && minPrice<=product.buyPrice && product.buyPrice<=maxPrice){
                  return true
                }else if(status==='rent' && minPrice<=product.rentPrice && product.rentPrice<=maxPrice){
                  return true
                }else{
                  return false
                }
              }else{
                return false
              }
            }else{
              return false
            }  
          }
        }
      }
      return{
        ...state,
        productsFiltered: state.products.filter(reduceProducts)
      } 
    case CLEAR_FILTER:
      return{
        ...state,
        productsFiltered: []
      } 
    case ADDED_TO_CART:
      return{
        ...state,
        productAddedNotification: true
      }
    case REMOVED_FROM_CART:
      return{
        ...state,
        productRemovedNotification: true
      }
    case CART_SOLD_SUCCESSFULLY:
      return{
        ...state,
        cartSoldNotification: true
      } 
    case GOT_CART_SUCCESSFULLY:
      return{
        ...state,
        cart: action.payload.cart
      }
    case GOT_CART_WITH_PRODUCT_DETAILS_SUCCESSFULLY:
      return{
        ...state,
        productsInCart: action.payload.detailedCart,
        cartAmount: action.payload.amount
      }
      case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
      }
      case PRODUCT_FINISHED:
        return {
          ...state,
          loading: false,
        }
    default:
      return state
  }
}