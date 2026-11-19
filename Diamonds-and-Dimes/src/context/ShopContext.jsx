import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ShopContext = createContext(null)
const STORAGE_KEY = 'diamonds-and-dimes-shop'

function readSavedShop() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return {
      cart: Array.isArray(saved.cart) ? saved.cart : [],
      wishlist: Array.isArray(saved.wishlist) ? saved.wishlist : [],
    }
  } catch {
    return { cart: [], wishlist: [] }
  }
}

export function ShopProvider({ children }) {
  const [shop, setShop] = useState(readSavedShop)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shop))
  }, [shop])

  const value = useMemo(() => ({
    ...shop,
    addToCart(product, quantity = 1) {
      setShop((current) => {
        const existing = current.cart.find((item) => String(item.id) === String(product.id))
        const cart = existing
          ? current.cart.map((item) => String(item.id) === String(product.id)
              ? { ...item, quantity: item.quantity + quantity }
              : item)
          : [...current.cart, { ...product, quantity }]
        return { ...current, cart }
      })
    },
    updateCartQuantity(id, quantity) {
      setShop((current) => ({
        ...current,
        cart: current.cart.map((item) => String(item.id) === String(id)
          ? { ...item, quantity: Math.max(1, quantity) }
          : item),
      }))
    },
    removeFromCart(id) {
      setShop((current) => ({ ...current, cart: current.cart.filter((item) => String(item.id) !== String(id)) }))
    },
    toggleWishlist(product) {
      setShop((current) => {
        const exists = current.wishlist.some((item) => String(item.id) === String(product.id))
        return {
          ...current,
          wishlist: exists
            ? current.wishlist.filter((item) => String(item.id) !== String(product.id))
            : [...current.wishlist, product],
        }
      })
    },
  }), [shop])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used inside ShopProvider')
  return context
}
