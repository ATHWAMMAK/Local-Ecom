import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ShopContext = createContext(null);

// Safely load saved data from localStorage.
function readStorage(key) {
  try {
    const savedData = localStorage.getItem(key);
    const parsedData = savedData ? JSON.parse(savedData) : [];

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error(`Could not load ${key}:`, error);
    return [];
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("cart"));
  const [wishlist, setWishlist] = useState(() =>
    readStorage("wishlist")
  );

  // Keep localStorage synchronized with state.
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Could not save wishlist:", error);
    }
  }, [wishlist]);

  // Add a product, supporting an optional quantity.
  function addToCart(product, quantity = 1) {
    if (!product || product.id === undefined) return;

    const requestedQuantity = Math.max(
      1,
      Math.floor(Number(quantity) || 1)
    );

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => String(item.id) === String(product.id)
      );

      const stock = Number(product.stock);
      const hasStockLimit =
        product.stock !== undefined &&
        product.stock !== null &&
        Number.isFinite(stock);

      if (hasStockLimit && stock <= 0) return currentCart;

      const currentQuantity = existingProduct
        ? Number(existingProduct.quantity) || 0
        : 0;

      const newQuantity = hasStockLimit
        ? Math.min(currentQuantity + requestedQuantity, stock)
        : currentQuantity + requestedQuantity;

      if (existingProduct) {
        return currentCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      return [
        ...currentCart,
        { ...product, quantity: newQuantity },
      ];
    });
  }

  // Remove a product from the cart.
  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  }

  // Update product quantity.
  function updateQuantity(productId, quantity) {
    const newQuantity = Math.floor(Number(quantity));

    if (!Number.isInteger(newQuantity) || newQuantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (String(item.id) !== String(productId)) return item;

        const stock = Number(item.stock);
        const hasStockLimit =
          item.stock !== undefined &&
          item.stock !== null &&
          Number.isFinite(stock);

        return {
          ...item,
          quantity: hasStockLimit
            ? Math.min(newQuantity, stock)
            : newQuantity,
        };
      })
    );
  }

  // Brian's Cart page uses this method name.
  function updateCartQuantity(productId, quantity) {
    updateQuantity(productId, quantity);
  }

  // Clear the entire cart.
  function clearCart() {
    setCart([]);
  }

  // Add a product to the wishlist.
  function addToWishlist(product) {
    if (!product || product.id === undefined) return;

    setWishlist((currentWishlist) => {
      const alreadySaved = currentWishlist.some(
        (item) => String(item.id) === String(product.id)
      );

      if (alreadySaved) return currentWishlist;

      return [...currentWishlist, product];
    });
  }

  // Remove a product from the wishlist.
  function removeFromWishlist(productId) {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  }

  // Brian's Product Details and Wishlist pages use this method.
  function toggleWishlist(product) {
    if (!product || product.id === undefined) return;

    const alreadySaved = wishlist.some(
      (item) => String(item.id) === String(product.id)
    );

    if (alreadySaved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  function isInWishlist(productId) {
    return wishlist.some(
      (item) => String(item.id) === String(productId)
    );
  }

  // Calculate cart information.
  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// Custom hook for accessing shared shopping state.
// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const context = useContext(ShopContext);

  if (context === null) {
    throw new Error(
      "useShop must be used inside a ShopProvider. Wrap your application with ShopProvider."
    );
  }

  return context;
}
