import { REDUX_LS_KEY } from './constants'

export const initState = {
  user: {
    group: '',
    email: '',
    token: '',
  },
  cart: {
    product_id: {
      count: '',
      isChecked: false,
    },
  },
  filter: {
    search: '',
  },
}
export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(REDUX_LS_KEY)

  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
