import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `text-sm hover:text-brand-gold ${isActive ? 'font-semibold text-brand-charcoal' : 'text-gray-600'}`

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4" aria-label="Main navigation">
        <Link to="/" className="font-semibold tracking-wide text-brand-charcoal">DIAMONDS &amp; DIMES</Link>
        <div className="flex items-center gap-5">
          <NavLink className={navLinkClass} to="/shop">Shop</NavLink>
          <NavLink className={navLinkClass} to="/contact">Contact</NavLink>
          <NavLink className={navLinkClass} to="/cart">Cart</NavLink>
        </div>
      </nav>
    </header>
  )
}
