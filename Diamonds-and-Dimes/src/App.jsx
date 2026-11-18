import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'
import OrderDetails from './pages/OrderDetails'
import OrderHistory from './pages/OrderHistory'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-brand-ivory text-brand-charcoal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
