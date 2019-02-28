import axios from 'axios'
import history from '../history'
import {cartAdder, getCart} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => {
  return {type: GET_USER, user}
}
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    if (window.localStorage.getItem('cart') && res.data.id) {
      const oldCart = JSON.parse(window.localStorage.getItem('cart'))
      oldCart.forEach(product => {
        dispatch(cartAdder(res.data.id, product))
      })
      dispatch(getCart(res.data.id))
      window.localStorage.clear()
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    if (method === 'login') {
      res = await axios.post(`/auth/${method}`, {email, password})
      dispatch(me())
    }
    if (method === 'signup') {
      res = await axios.post(`/auth/${method}`, {
        email,
        password,
        firstName,
        lastName
      })
      dispatch(me())
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
