class DogFoodApi {
  constructor({ baseURL }) {
    this.baseURL = baseURL
  }

  // eslint-disable-next-line class-methods-use-this
  getAuthorizationToken() {
    return `Bearer ${this.token}`
  }

  // eslint-disable-next-line class-methods-use-this
  checkToken(token) {
    if (!token) throw new Error('Отсутствует токен')
  }

  async signIn(data) {
    const response = await fetch(`${this.baseURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async signUp(data) {
    const response = await fetch(`${this.baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async getAllProducts(search, token) {
    this.checkToken(token)
    const response = await fetch(`${this.baseURL}/products/search?query=${search}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (response.status >= 400) {
      throw new Error(`${response.status}:
       Произошла ошибка при получении информации о товарах. Попробуйте сделать запрос позже.`)
    }

    return response.json()
  }

  async getProductByID(id, token) {
    this.checkToken(token)
    const res = await fetch(`${this.baseURL}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    })

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при входе в Личный кабинет. 
      Проверьте отправляемые данные. Status: ${res.status}`)
    }

    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении ответа от сервера. 
      Попробуйте сделать запрос позже. Status: ${res.status}`)
    }

    return res.json()
  }

  getProductsByIds(ids, token) {
    return Promise.all(ids.map((id) => fetch(`${this.baseURL}/products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())))
  }
}
export const dogFoodApi = new DogFoodApi({ baseURL: 'https://api.react-learning.ru' })
