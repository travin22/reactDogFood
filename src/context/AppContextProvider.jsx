/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext, useEffect, useState,
} from 'react'
import { REDUX_LS_KEY } from '../redux/constants'

export const AppContext = createContext()
export function AppContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const tokenFromStorage = localStorage.getItem(REDUX_LS_KEY)
    return tokenFromStorage ?? ''
  })

  useEffect(() => {
    localStorage.setItem(REDUX_LS_KEY, token)
  }, [token])

  return (

    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}
