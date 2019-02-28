import axios from 'axios'
import history from '../history'

//action types
export const GET_PRODUCTS = 'GET_PRODUCTS'

//action creators
export const getProducts = products => ({type: GET_PRODUCTS, products})

//THUNK CREATORS

export const shirts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

//Reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
