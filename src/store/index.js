import { createStore, combineReducers, applyMiddleware } from 'redux'
import { userReducer } from './userReducer'
import { productReducer } from './productReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  userReducer,
  productReducer
})

const middlewares = applyMiddleware(thunk)

export const store = createStore(rootReducer, middlewares)
