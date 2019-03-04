import axios from 'axios'

// ACTION TYPES
const SET_ORDER = 'SET_ORDER'
const GET_ORDER = 'GET_ORDER'

// ACTION CREATORS
const gotOrders = orders => {
  return {
    type: GET_ORDER,
    orders
  }
}

const setOrder = orders => {
  return {
    type: SET_ORDER,
    orders
  }
}

// ACTION THUNKS
export const getOrders = id => {
  return async dispatch => {
    try {
      let orders = await axios.get(`/api/orderhistory/${id}`)
      const action = gotOrders(orders.data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}
export const postOrder = (firstName, lastName, user, cart) => {
  const toSend = {
    cart,
    userEmail: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  }
  return async dispatch => {
    try {
      let addedOrder = await axios.post(`/api/orderhistory/${user.id}`, toSend)
      const action = setOrder(addedOrder.data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const postGuestOrder = (cart, email, firstName, lastName) => {
  const toSend = {
    cart,
    email,
    firstName,
    lastName
  }
  return async dispatch => {
    try {
      await axios.post(`/api/orderhistory/guestCheckout`, toSend)
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDER:
      return action.orders
    case SET_ORDER:
      return [...state, ...action.orders]
    default:
      return state
  }
}
