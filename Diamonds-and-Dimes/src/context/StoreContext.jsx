import { createContext, useContext, useEffect, useState } from 'react'
import { getProducts } from '../services/api'

const StoreContext = createContext(null)

function readFromStorage(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key)
    return savedValue ? JSON.parse(savedValue) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [cart, setCart] = useState(() => readFromStorage('dd-cart', []))
  const [wishlist, setWishlist] = useState(() => readFromStorage('dd-wishlist', []))
  const [orders, setOrders] = useState(() => readFromStorage('dd-orders', []))

  useEffect(() => {
    getProducts()
      .then((productList) => setProducts(productList))
      .catch(() => setProductsError('Products could not be loaded. Please try again later.'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    localStorage.setItem('dd-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('dd-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('dd-orders', JSON.stringify(orders))
  }, [orders])

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentCart, { id: product.id, quantity: 1 }]
    })
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
      return
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }

  function toggleWishlist(productId) {
    setWishlist((currentWishlist) =>
      currentWishlist.includes(productId)
        ? currentWishlist.filter((id) => id !== productId)
        : [...currentWishlist, productId],
    )
  }

  function placeOrder(customer) {
    const orderItems = cart.map((item) => {
      const product = products.find((currentProduct) => currentProduct.id === item.id)
      return { ...product, quantity: item.quantity }
    })
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const order = {
      id: Date.now().toString(),
      customer,
      items: orderItems,
      total,
      status: 'Order received',
      createdAt: new Date().toISOString(),
    }

    setOrders((currentOrders) => [...currentOrders, order])
    setCart([])
    return order
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        products,
        isLoading,
        productsError,
        cart,
        cartCount,
        wishlist,
        orders,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleWishlist,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error('useStore must be used inside StoreProvider')
  }

  return store
}
