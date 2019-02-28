import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import singleProduct from './singleProduct'
import orderHistory from './orderHistory'

const reducer = combineReducers({
  user,
  products,
  singleProduct,
  cart,
  orderHistory
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: false}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
