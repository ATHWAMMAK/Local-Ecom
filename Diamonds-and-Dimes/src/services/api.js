const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || `Request failed: ${response.status}`)
  }

  return data
}

// PRODUCTS
export const getProducts = () => request('/products')

export const getProduct = (id) => request(`/products/${id}`)

export const createProduct = (product) =>
  request('/products', {
    method: 'POST',
    body: JSON.stringify(product),
  })

export const updateProduct = (id, updates) =>
  request(`/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })

export const deleteProduct = (id) =>
  request(`/products/${id}`, {
    method: 'DELETE',
  })

// USERS
export const getUsers = () => request('/users')

export const getUser = (id) => request(`/users/${id}`)

export const getUserByEmail = (email) =>
  request(`/users?email=${encodeURIComponent(email)}`).then((users) => users[0] ?? null)

export const createUser = (user) =>
  request('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  })

export const updateUser = (id, updates) =>
  request(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })

export const deleteUser = (id) =>
  request(`/users/${id}`, {
    method: 'DELETE',
  })

// ORDERS
export const getOrders = () => request('/orders')

export const getOrdersByUserId = (userId) =>
  request(`/orders?userId=${encodeURIComponent(userId)}&_sort=createdAt&_order=desc`)

export const getOrder = (id) => request(`/orders/${id}`)

export const createOrder = (order) =>
  request('/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  })

export const updateOrder = (id, updates) =>
  request(`/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })

// REVIEWS
export const getReviews = () => request('/reviews')

export const getProductReviews = (productId) =>
  request(`/reviews?productId=${productId}`)

export const createReview = (review) =>
  request('/reviews', {
    method: 'POST',
    body: JSON.stringify(review),
  })
