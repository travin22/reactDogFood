import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: initState.favorites,
  reducers: {
    removeFavorite(state, action) {
      return state.filter((product) => product !== action.payload)
    },
    clearFavorites() {
      return []
    },
    addFavorite(state, action) {
      state.push(action.payload)
    },
  },
})

export const { removeFavorite, addFavorite, clearFavorites } = favoriteSlice.actions
export const getAllFavoriteProductsSelector = (state) => state.favorites
export const favoriteReducer = favoriteSlice.reducer
