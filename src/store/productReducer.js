import axios from 'axios'

const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS'
const PRODUCT_ERROR = 'PRODUCT_ERROR'
const UPDATE_PRODUCT_DATA = 'UPDATE_PRODUCT_DATA'
const UPDATE_PICTURE_DATA = 'UPDATE_PICTURE_DATA'
const TOGGLE_PRODUCT_WARNING = 'TOGGLE_PRODUCT_WARNING'
const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR'

export function toggleProductWarning(value){
  return{
    type: TOGGLE_PRODUCT_WARNING,
    payload: value
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

const initialState ={ 
    nameProduct: '', 
    buyPrice: '', 
    rentPrice: '',
    description: '',
    picture: null,
    productWarning: false, 
    productData: '',
    error: null,
    products:[],
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
          userWarning: action.payload
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
        description: '',
        picture: null,
        productWarning: false, 
        productData: '',
        error: action.payload,
      }
    case GET_PRODUCT_SUCCESS:
      return{
        ...state,
        products: action.payload
      }
    case GET_PRODUCT_ERROR:
      return{
        ...state,
        getProductError: action.payload
      }  
    default:
      return state
  }
}