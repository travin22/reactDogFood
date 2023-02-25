import { REDUX_LS_KEY } from './constants'

export const initState = {
  user: {
    group: '',
    email: '',
    token: '',
    name: '',
    about: '',
    avatar: '',
  },
  cart: [],
  filter: {
    search: '',
  },
  favorites: [],
}
export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(REDUX_LS_KEY)

  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
