import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ShopProvider } from './context/ShopContext'
import StoreLayout from './components/StoreLayout'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'
import OrderHistory from './pages/OrderHistory'
import OrderDetails from './pages/OrderDetails'
import Contact from './pages/Contact'
import ContactSupport from './pages/ContactSupport'

function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Routes>
          <Route element={<StoreLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/orders/:id" element={<OrderDetails />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<ContactSupport />} />
          </Route>
        </Routes>
      </ShopProvider>
    </BrowserRouter>
  )
}

export default App
