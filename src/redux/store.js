import { configureStore } from '@reduxjs/toolkit'
import { REDUX_CART_LS_KEY, REDUX_LS_KEY } from './constants'
import { getInitState } from './initState'
import { cartReducer } from './slices/cartSlice'
import { favoriteReducer } from './slices/favorite'
import { filterReducer } from './slices/filterSlice'
import { userReducer } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    filter: filterReducer,
    favorites: favoriteReducer,
  },
  preloadedState: getInitState(),
})

store.subscribe(() => {
  const currentState = store.getState()

  window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(currentState))
})

store.subscribe(() => {
  const cartsFromLS = window.localStorage.getItem(REDUX_CART_LS_KEY)
  const currentState = store.getState()

  const parsedCartsFromLS = cartsFromLS ? JSON.parse(cartsFromLS) : {}

  if (currentState.user.id) {
    window.localStorage.setItem(REDUX_CART_LS_KEY, JSON.stringify({
      ...parsedCartsFromLS,
      [currentState.user.id]: currentState.cart,
    }))
  }
})
