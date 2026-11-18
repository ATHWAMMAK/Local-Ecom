import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'
import OrderDetails from './pages/OrderDetails'
import Contact from './pages/Contact'
import ContactSupport from './pages/ContactSupport'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-brand-ivory text-brand-charcoal">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<ContactSupport />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
