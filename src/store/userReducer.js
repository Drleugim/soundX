import axios from 'axios'

const USER_SUCCESS = 'USER_SUCCESS'
const USER_ERROR = 'USER_ERROR'
const USER_LOGOUT = 'USER_LOGOUT'
const UPDATE_USER_DATA = 'UPDATE_USER_DATA'
const TOGGLE_USER_WARNING = 'TOGGLE_USER_WARNING'
const TOGGLE_PASSWORD_WARNING= 'TOGGLE_PASSWORD_WARNING'

export function toggleUserWarning(value){
  return{
    type: TOGGLE_USER_WARNING,
    payload: value
  }
}

export function togglePasswordWarning(value){
  return{
    type: TOGGLE_PASSWORD_WARNING,
    payload: value
  }
}

export function updateUserData(data) {
    return {
        type: UPDATE_USER_DATA,
        payload: data,
    }
}

export function userLogout(){
  return{
    type: USER_LOGOUT
  }
}

export function userSignup(user){
  return async function(dispatch){
    try{
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/signup',
        data:{
          email: user.email,
          password: user.password
        }
      })
      dispatch({ type: USER_SUCCESS, payload: data })
    }catch(error){
      dispatch({ type: USER_ERROR, payload: error })
      dispatch(toggleUserWarning(true))
      dispatch(updateUserData({name:'email',value:''}))
      dispatch(updateUserData({name:'password',value:''}))
      dispatch(updateUserData({name:'confirmedPassword',value:''}))
    }
  }
}

export function userLogin(user) {
  return async function(dispatch) {
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/signin',
        data:{
          email: user.email,
          password: user.password
        }
      })
      dispatch({ type: USER_SUCCESS, payload: data })
      
    } catch(error) {
      dispatch({ type: USER_ERROR, payload: error })
      dispatch(toggleUserWarning(true))
      dispatch(updateUserData({name:'email',value:''}))
      dispatch(updateUserData({name:'password',value:''}))
    } 
  }
}

const initialState ={ 
    email: '', 
    password: '', 
    confirmedPassword: '', 
    userWarning: false, 
    passwordWarning: false,
    userData: null,
    error: null
}

export function userReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER_DATA:
        return{
            ...state,
            [action.payload.name]:action.payload.value
        }
    case TOGGLE_USER_WARNING:
        return{
          ...state,
          userWarning: action.payload
        }
    case TOGGLE_PASSWORD_WARNING:
        return{
          ...state,
          passwordWarning: action.payload
        }    
    case USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      }
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {
        ...state,
        email: '', 
        password: '', 
        confirmedPassword: '',
        userData:''
      }
    default:
      return state
  }
}
