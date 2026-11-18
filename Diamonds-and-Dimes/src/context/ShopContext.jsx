
import { createContext, useContext, useEffect, useState } from 'react'

// Create a shared context for shopping features
const ShopContext = createContext()

export function ShopProvider({ children }) {
  // Restore saved data when the app starts
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || []
  })

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist')) || []
  })

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  // Add a product to the cart
  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  // Remove a product from the cart
  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    )
  }

  // Change the quantity of a cart item
  function updateQuantity(productId, quantity) {
    if (quantity < 1) return

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  // Empty the cart
  function clearCart() {
    setCart([])
  }

  // Add or remove products from the wishlist
  function addToWishlist(product) {
    setWishlist((currentWishlist) => {
      const alreadySaved = currentWishlist.some(
        (item) => item.id === product.id
      )

      if (alreadySaved) return currentWishlist

      return [...currentWishlist, product]
    })
  }

  function removeFromWishlist(productId) {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== productId)
    )
  }

  function isInWishlist(productId) {
    return wishlist.some((item) => item.id === productId)
  }

  // Calculate cart information
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

// Custom hook for accessing shopping state
export function useShop() {
  return useContext(ShopContext)
}
