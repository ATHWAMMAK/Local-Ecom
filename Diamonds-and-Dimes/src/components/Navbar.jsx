import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
	`text-sm transition-colors hover:text-emerald-800 ${isActive ? 'font-semibold text-emerald-800' : 'text-gray-600'}`

export default function Navbar() {
	return (
		<header className="border-b border-gray-200 bg-white">
			<nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4" aria-label="Main navigation">
				<Link to="/" className="font-semibold tracking-wide text-gray-900">DIAMONDS &amp; DIMES</Link>
				<div className="flex items-center gap-5">
					<NavLink className={linkClass} to="/shop">Shop</NavLink>
					<NavLink className={linkClass} to="/contact">Contact</NavLink>
					<NavLink className={linkClass} to="/cart">Cart</NavLink>
				</div>
			</nav>
		</header>
	)
}
