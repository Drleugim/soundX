import axios from 'axios'

export const GET_USER_DATA = 'GET_USER_DATA'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'USER_ERROR'
export const USER_LOGOUT = 'USER_LOGOUT'
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA'
export const TOGGLE_USER_WARNING = 'TOGGLE_USER_WARNING'
export const TOGGLE_PASSWORD_WARNING= 'TOGGLE_PASSWORD_WARNING'

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

export function userDataUpdate(id, user){
  return async function(dispatch){
    try{
      const token = localStorage.getItem('token')
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/users/editUser/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data:{
          name: user.userName,
        }
      })
      dispatch({ type: USER_SUCCESS, payload: data })
    }catch(error){
      dispatch({ type: USER_ERROR, payload: error })
      dispatch(toggleUserWarning(true))
      dispatch(updateUserData({userName:'name',value:''}))
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

export function userInfo() {
  return async function(dispatch) {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/userData',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch({ type: GET_USER_DATA, payload: data })
      
    } catch(error) {
      dispatch({ type: USER_ERROR, payload: error })
    } 
  }
}

const initialState ={ 
    email: '', 
    password: '',
    userName:'', 
    confirmedPassword: '', 
    userWarning: false, 
    passwordWarning: false,
    userData: null,
    error: null,
    userInfo: {}
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
    case GET_USER_DATA:
      return {
        ...state,
        userInfo: action.payload,
      }
    default:
      return state
  }
}
