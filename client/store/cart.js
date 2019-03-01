import axios from 'axios'
import products from './products'
import {runInNewContext} from 'vm'

//ACTION TYPES
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const FINISH_ORDER = 'FINISH_ORDER'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const DELETE_FROM_GUEST_CART = 'DELETE_FROM_GUEST_CART'

//INITIAL STATE
const defaultCart = []

//ACTION CREATORS
// const getCart = cart => ({type: GET_CART, cart})
const addToCart = productToAdd => {
  return {type: ADD_TO_CART, productToAdd}
}

const gotCart = cart => {
  return {
    type: GOT_CART,
    userCart: cart
  }
}

const finishedOrder = () => {
  return {
    type: FINISH_ORDER,
    emptycart: []
  }
}
const deleteFromCart = cartItem => {
  return {
    type: DELETE_FROM_CART,
    cartItem
  }
}

const deleteFromGuestCart = idx => {
  return {
    type: DELETE_FROM_GUEST_CART,
    idx
  }
}
//THUNK CREATORS

export const getCart = id => {
  return async dispatch => {
    try {
      if (id) {
        let userCart = await axios.get(`/api/users/${id}/cart`)
        const action = gotCart(userCart.data)
        dispatch(action)
      } else {
        let newCart = JSON.parse(window.localStorage.getItem('cart'))
        const action = gotCart(newCart)
        dispatch(action)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
export const cartAdder = (id, productToAdd) => {
  return async dispatch => {
    try {
      if (id) {
        const productAdded = await axios.post(
          `/api/users/${id}/cart`,
          productToAdd
        )
        const action = addToCart({...productAdded.data, product: productToAdd})
        dispatch(action)
      } else if (window.localStorage.getItem('cart')) {
        let newCart = JSON.parse(window.localStorage.getItem('cart'))
        newCart.push(productToAdd)
        window.localStorage.clear()
        window.localStorage.setItem('cart', JSON.stringify(newCart))
        const action = addToCart({...productToAdd, product: productToAdd})
        dispatch(action)
      } else {
        let cart = [productToAdd]
        window.localStorage.setItem('cart', JSON.stringify(cart))
        const action = addToCart({...productToAdd, product: productToAdd})
        dispatch(action)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteFromCartThunk = (cartId, idx, loggedIn) => {
  return async dispatch => {
    try {
      if (!loggedIn) {
        let newCart = JSON.parse(window.localStorage.getItem('cart'))
        newCart.splice(idx, 1)
        window.localStorage.clear()
        window.localStorage.setItem('cart', JSON.stringify(newCart))
        const action = deleteFromGuestCart(idx)
        dispatch(action)
      } else {
        const gameToRemove = await axios.delete(`/api/users/cart/${cartId}`)
        const action = deleteFromCart(gameToRemove.data)
        dispatch(action)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const finishOrder = user => {
  return async dispatch => {
    try {
      //axios post to order histories here
      await axios.delete(`/api/users/${user.id}/cart`)
      dispatch(finishedOrder())
    } catch (error) {
      console.log(error)
    }
  }
}
export const finishOrderGuest = () => {
  return dispatch => {
    // clear local storage
    window.localStorage.clear()
    dispatch(finishedOrder())
  }
}

//REDUCER

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_CART:
      return action.userCart
    case ADD_TO_CART:
      if (state) {
        return [...state, action.productToAdd]
      } else {
        return [action.productToAdd]
      }
    case FINISH_ORDER:
      return action.emptycart
    case DELETE_FROM_CART:
      return state.filter(item => item.id !== action.cartItem.id)
    case DELETE_FROM_GUEST_CART:
      return state.filter((item, idx) => idx !== action.idx)
    default:
      return state
  }
}
