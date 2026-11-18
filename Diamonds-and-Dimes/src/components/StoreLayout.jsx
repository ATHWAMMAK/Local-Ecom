import { Link, NavLink, Outlet } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function BrandMark() {
  return (
    <span className="relative inline-flex size-8 items-center justify-center" aria-hidden="true">
      <span className="size-4 rotate-45 border-2 border-brand-gold" />
      <span className="absolute -bottom-0.5 -right-1 flex size-4 items-center justify-center rounded-full border border-brand-champagne bg-brand-black text-[9px] leading-none text-brand-champagne">
        D
      </span>
    </span>
  )
}

function StoreLayout() {
  const { cartCount } = useStore()

  const linkStyle = ({ isActive }) =>
    `rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-brand-gold ${
      isActive ? 'bg-white/10 text-brand-gold' : 'text-brand-ivory'
    }`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-brand-black text-brand-ivory">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <Link className="inline-flex items-center gap-3 text-xl font-bold" to="/">
            <BrandMark />
            Diamonds and Dimes
          </Link>
          <nav className="flex flex-wrap gap-1" aria-label="Main navigation">
            <NavLink className={linkStyle} to="/">Home</NavLink>
            <NavLink className={linkStyle} to="/shop">Shop</NavLink>
            <NavLink className={linkStyle} to="/wishlist">Wishlist</NavLink>
            <NavLink className={linkStyle} to="/cart">
              Cart{cartCount > 0 ? ` (${cartCount})` : ''}
            </NavLink>
            <NavLink className={linkStyle} to="/account">Account</NavLink>
            <NavLink className={linkStyle} to="/contact">Contact</NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8">
        <Outlet />
      </main>

      <footer className="bg-brand-black text-brand-ivory">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>Diamonds and Dimes: electronics for everyday life.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
            <Link className="text-sm hover:text-brand-gold" to="/shop">Shop</Link>
            <Link className="text-sm hover:text-brand-gold" to="/account">My account</Link>
            <Link className="text-sm hover:text-brand-gold" to="/contact">Contact us</Link>
          </nav>
          <p className="text-sm text-white/70">Copyright © Diamonds and Dimes</p>
        </div>
      </footer>
    </div>
  )
}

export default StoreLayout
