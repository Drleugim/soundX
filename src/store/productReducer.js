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

export function getProduct(id) {
  return async function(dispatch) {
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/products/buyRent/${id}`
      })
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data })
    } catch(error) {
      dispatch({ type: GET_PRODUCT_ERROR, payload: error })
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
    getProductError:null
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
      }
    case GET_PRODUCT_SUCCESS:
      return{
        ...state,
        products: action.payload
      }
    case GET_SINGLE_PRODUCT_SUCCESS:
    return{
      ...state,
      product: action.payload
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
    default:
      return state
  }
}