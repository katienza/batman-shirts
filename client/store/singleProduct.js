import axios from 'axios'

//action types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//action creators
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

//THUNK CREATORS

export const shirts = id => async dispatch => {
  try {
    let shirtFromDB = await axios.get(`/api/products/${id}`)
    const action = getSingleProduct(shirtFromDB.data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

//Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
