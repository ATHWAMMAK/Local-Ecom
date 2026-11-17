# Technical Architecture

## 1. Application approach
Diamonds and Dimes is a React Single Page Application. React Router DOM handles client-side navigation. React components are organized by shared UI, pages, contexts, hooks and API services. JSON Server provides a simulated REST API during development.

## 2. Suggested source structure
```text
src/
├── components/       # Reusable UI (Navbar, Footer, ProductCard, SearchBar)
├── pages/            # Route-level views
├── context/          # CartContext and WishlistContext
├── hooks/            # Reusable hooks such as useProducts
├── services/         # API functions and request helpers
├── tests/            # Test utilities and test files (or colocated tests)
├── App.jsx           # Route definitions and shared layout
├── main.jsx          # React entry point and providers
└── index.css         # Tailwind entry point and minimal global rules
```

## 3. Suggested route map
| Path | View |
|---|---|
| `/` | Home |
| `/shop` | Shop |
| `/products/:id` | Product details |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/account` | My Account |
| `/wishlist` | Wishlist |
| `/orders/:id` | Order tracking |
| `/contact` | Contact & Support |

Use `Link`/`NavLink` for internal navigation. Avoid ordinary anchor navigation for internal SPA routes where it would reload the page.

## 4. State management
- Use `useState` for local UI state such as search text, selected category and form values.
- Use `useEffect` for side effects such as loading data from the API.
- Use Context API for state needed by multiple distant components, especially cart and wishlist.
- Keep API request logic in `services/` or custom hooks rather than duplicating it in many components.
- Handle loading, empty and error states for asynchronous requests.

## 5. API conventions
Use one shared base URL in the API service, for example `http://localhost:3000`. Do not hard-code different API URLs throughout components.

Expected REST patterns:
- `GET /products`
- `GET /products/:id`
- `POST /orders`
- `PATCH /orders/:id`
- `POST /reviews` (if review creation is in scope)

The team must use the exact field names in `DATABASE_SCHEMA.md`.

## 6. Styling and design system
Use Tailwind CSS utility classes for component styling. Shared brand palette:
- Rich black: `#0B0B0B`
- Gold: `#D4AF37`
- Champagne: `#E8D5A3`
- Warm ivory: `#FAF8F3`
- Charcoal: `#222222`

Design direction: premium, elegant and accessible. Ensure sufficient contrast, visible keyboard focus, responsive layouts and consistent spacing. Use shared reusable components for buttons, product cards and layout elements.

## 7. Data flow example
1. Shop page calls a product service or custom hook.
2. Service sends `GET /products` to JSON Server.
3. Component stores the response in state.
4. Search and filter state determines which products are rendered.
5. Selecting a product navigates to `/products/:id`.
6. Product details loads that record using the route parameter.

## 8. Security and scope note
JSON Server is a development mock API, not a secure production backend. Do not store real payment credentials or sensitive authentication data in the repository. Any payment flow in this project should be a clearly labelled simulation unless a secure backend and approved payment integration are implemented.
