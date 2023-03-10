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
    const res = await fetch(`${this.baseURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res.json()
  }

  async signUp(data) {
    const res = await fetch(`${this.baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res.json()
  }

  async getAllProducts(search, token) {
    this.checkToken(token)
    const res = await fetch(`${this.baseURL}/products/search?query=${search}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (res.status >= 400) {
      throw new Error(`${res.status}:
       Произошла ошибка при получении информации о товарах. Попробуйте сделать запрос позже.`)
    }

    return res.json()
  }

  async getProduct(id, token) {
    const res = await fetch(`${this.baseURL}/products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (res.status >= 400) {
      throw new Error(`${res.status}
      : Произошла ошибка при получении информации о товарe. 
      ${res.statusText}.`)
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

  async getUserByToken(token) {
    const res = await fetch(`${this.baseURL}/v2/sm9/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  }

  async addNewProduct(data, token) {
    const res = await fetch(`${this.baseURL}/products`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status >= 400) {
      throw new Error(`${res.status}: Произошла ошибка при сохранении информации о товаре. 
      ${res.statusText}.`)
    }
    return res.json()
  }

  async editProduct(productId, data, token) {
    const res = await fetch(`${this.baseURL}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status >= 400) {
      throw new Error(`${res.status}
      : Произошла ошибка при сохранении информации о товаре.
       ${res.statusText}.`)
    }
    return res.json()
  }

  async deleteProduct(productId, token) {
    const res = await fetch(`${this.baseURL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    if (res.status >= 400) {
      throw new Error(`${res.status}
      : Произошла ошибка при удалении товара.
       ${res.statusText}.`)
    }
    return res.json()
  }

  async getComments(productId, token) {
    const res = await fetch(`${this.baseURL}/products/review/${productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (res.status >= 400) {
      throw new Error(`${res.status}
      : Произошла ошибка при получении отзывов.
       ${res.statusText}.`)
    }

    return res.json()
  }

  async addComment(productId, data, token) {
    const res = await fetch(`${this.baseURL}/products/review/${productId}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status >= 400) {
      throw new Error(`${res.status}
      : Произошла ошибка при сохранении отзыва.
       ${res.statusText}.`)
    }
    return res.json()
  }

  async deleteComment(productId, reviewId, token) {
    const res = await fetch(`${this.baseURL}/products/review/${productId}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    if (res.status >= 400) {
      throw new Error(`${res.status}: Произошла ошибка при удалении отзыва. ${res.statusText}.`)
    }
    return res.json()
  }
}
export const dogFoodApi = new DogFoodApi({ baseURL: 'https://api.react-learning.ru' })
