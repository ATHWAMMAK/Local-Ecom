import { Link, NavLink, Outlet } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

function BrandMark() {
  return (
    <span
      className="relative inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-gold/60 bg-white/5"
      aria-hidden="true"
    >
      <span className="size-6 rotate-45 border-2 border-brand-gold" />
      <span className="absolute bottom-1 right-1 flex size-4 items-center justify-center rounded-full border border-brand-aqua bg-brand-black text-[9px] font-bold text-brand-aqua">
        D
      </span>
    </span>
  )
}

export default function StoreLayout() {
  const { cartCount } = useShop()

  const linkStyle = ({ isActive }) =>
    `rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300 ${
      isActive
        ? 'bg-brand-aqua text-brand-black shadow-md shadow-brand-aqua/20'
        : 'text-white/80 hover:bg-white/10 hover:text-brand-aqua'
    }`

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-brand-deep-aqua px-4 py-2 text-center text-xs font-semibold tracking-[0.16em] text-white sm:text-sm">
        DISCOVER SOMETHING SPECIAL · LUXURY IN EVERY CHOICE
      </div>

      <header className="sticky top-0 z-50 border-b border-brand-aqua/20 bg-brand-black/95 text-white shadow-xl backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link className="inline-flex items-center gap-3 self-center lg:self-auto" to="/">
            <BrandMark />
            <span className="font-display text-xl tracking-wide sm:text-2xl">
              Diamonds <span className="text-brand-aqua">and</span>{' '}
              <span className="text-brand-gold">Dimes</span>
              <span className="mt-0.5 block font-body text-[9px] font-medium uppercase tracking-[0.32em] text-white/50">
                Luxury in every choice
              </span>
            </span>
          </Link>

          <nav
            className="flex flex-wrap items-center justify-center gap-1"
            aria-label="Main navigation"
          >
            <NavLink className={linkStyle} to="/" end>Home</NavLink>
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

      <footer className="relative mt-auto overflow-hidden bg-brand-black text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_100%,rgba(64,224,208,0.16),transparent_45%),radial-gradient(ellipse_at_90%_0%,rgba(212,175,55,0.10),transparent_38%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-3">
          <div>
            <Link to="/" className="font-display text-2xl tracking-wide">
              Diamonds <span className="text-brand-aqua">and</span>{' '}
              <span className="text-brand-gold">Dimes</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
              Thoughtfully selected products for everyday living.
              Discover quality, style and value in every choice.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-aqua">
              Explore
            </h2>
            <nav className="mt-5 flex flex-col items-start gap-3 text-sm text-white/70">
              <Link className="transition hover:text-brand-aqua" to="/shop">Shop the collection</Link>
              <Link className="transition hover:text-brand-aqua" to="/wishlist">Your wishlist</Link>
              <Link className="transition hover:text-brand-aqua" to="/cart">Shopping cart</Link>
              <Link className="transition hover:text-brand-aqua" to="/orders">Order history</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">
              Customer care
            </h2>
            <nav className="mt-5 flex flex-col items-start gap-3 text-sm text-white/70">
              <Link className="transition hover:text-brand-aqua" to="/account">My account</Link>
              <Link className="transition hover:text-brand-aqua" to="/contact">Contact us</Link>
              <Link className="transition hover:text-brand-aqua" to="/support">Support centre</Link>
            </nav>
          </div>

          <div className="border-t border-white/15 pt-6 md:col-span-3">
            <p className="text-center text-xs tracking-wide text-white/45">
              © {new Date().getFullYear()} Diamonds and Dimes. All rights reserved.
              <span className="mx-2 text-brand-aqua">◆</span>
              Luxury in Every Choice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
