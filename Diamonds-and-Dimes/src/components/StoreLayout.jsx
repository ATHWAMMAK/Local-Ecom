import { Link, NavLink, Outlet } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

function BrandMark() {
  return (
    <span
      className="relative inline-flex size-9 items-center justify-center"
      aria-hidden="true"
    >
      <span className="size-5 rotate-45 border-2 border-brand-gold" />
      <span className="absolute -bottom-0.5 -right-1 flex size-4 items-center justify-center rounded-full border border-brand-aqua bg-brand-black text-[9px] text-brand-aqua">
        D
      </span>
    </span>
  )
}

export default function StoreLayout() {
  const { cartCount } = useShop()

  const linkStyle = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-brand-aqua ${
      isActive ? 'bg-white/10 text-brand-aqua' : 'text-white'
    }`

  return (
    <div className="flex min-h-screen flex-col">

      <header className="bg-brand-black text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">

          <Link
            className="inline-flex items-center gap-3 text-xl font-bold"
            to="/"
          >
            <BrandMark />
            <span>
              Diamonds <span className="text-brand-aqua">and</span> Dimes
            </span>
          </Link>

          <nav
            className="flex flex-wrap gap-1"
            aria-label="Main navigation"
          >
            <NavLink className={linkStyle} to="/" end>
              Home
            </NavLink>

            <NavLink className={linkStyle} to="/shop">
              Shop
            </NavLink>

            <NavLink className={linkStyle} to="/wishlist">
              Wishlist
            </NavLink>

            <NavLink className={linkStyle} to="/cart">
              Cart{cartCount > 0 ? ` (${cartCount})` : ''}
            </NavLink>

            <NavLink className={linkStyle} to="/account">
              Account
            </NavLink>

            <NavLink className={linkStyle} to="/contact">
              Contact
            </NavLink>
          </nav>

        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8">
        <Outlet />
      </main>

      <footer className="bg-brand-black text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8">

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-semibold">
              Diamonds and Dimes
              <span className="ml-2 text-brand-aqua">
                Luxury in Every Choice.
              </span>
            </p>

            <nav className="flex flex-wrap gap-5" aria-label="Footer navigation">
              <Link className="text-sm hover:text-brand-aqua" to="/shop">
                Shop
              </Link>

              <Link className="text-sm hover:text-brand-aqua" to="/account">
                My Account
              </Link>

              <Link className="text-sm hover:text-brand-aqua" to="/contact">
                Contact
              </Link>

              <Link className="text-sm hover:text-brand-aqua" to="/support">
                Support
              </Link>
            </nav>
          </div>

          <p className="border-t border-white/20 pt-5 text-sm text-white/60">
            © {new Date().getFullYear()} Diamonds and Dimes. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  )
}
