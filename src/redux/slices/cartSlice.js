import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    cartInitialize(state, action) {
      return action.payload
    },
    addCurrentProduct: {
      reducer(state, action) {
        const currentProduct = state.find((product) => product.id === action.payload.id)
        if (!currentProduct) state.unshift(action.payload)
      },
      prepare(id) {
        return {
          payload: {
            id,
            isPicked: true,
            count: 1,
          },

        }
      },
    },
    changeIsPickProduct(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) currentProduct.isPicked = !currentProduct.isPicked
    },
    addAllProductsInCart(state) {
      return state.map((product) => ({
        ...product,
        isPicked: true,
      }))
    },
    notAddAllProductsInCart(state) {
      return state.map((product) => ({
        ...product,
        isPicked: false,
      }))
    },
    productIncrement(state, action) {
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            count: product.count + 1,
          }
        }
        return product
      })
    },
    productDecrement(state, action) {
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            count: product.count - 1,
          }
        }
        return product
      })
    },
    deleteProduct(state, action) {
      return state.filter((product) => product.id !== action.payload)
    },
    clearCart() {
      return []
    },
  },
})

export const {
  changeIsPickProduct, deleteProduct, clearCart, addCurrentProduct, notAddAllProductsInCart,
  productDecrement, productIncrement, addAllProductsInCart, cartInitialize,
} = cartSlice.actions
export const getAllCartProductsSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
