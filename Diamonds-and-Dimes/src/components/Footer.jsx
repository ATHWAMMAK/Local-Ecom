import { Link } from 'react-router-dom'

export default function Footer() {
	return (
		<footer className="border-t border-gray-200 bg-white">
			<div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
				<Link to="/" className="font-semibold tracking-wide text-gray-900">
					DIAMONDS &amp; DIMES
				</Link>

				<nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
					<Link className="hover:text-emerald-800" to="/shop">Shop</Link>
					<Link className="hover:text-emerald-800" to="/contact">Contact</Link>
					<Link className="hover:text-emerald-800" to="/support">Support</Link>
				</nav>

				<p>© {new Date().getFullYear()} Diamonds and Dimes</p>
			</div>
		</footer>
	)
}
