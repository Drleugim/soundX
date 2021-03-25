import { createStore, combineReducers, applyMiddleware } from 'redux'
import { userReducer } from './userReducer'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
  userReducer
})

const middlewares = applyMiddleware(thunk)

export const store = createStore(rootReducer, middlewares)
