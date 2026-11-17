# Diamonds and Dimes — Project Proposal

## 1. Project Overview
**Diamonds and Dimes** is a premium-styled general e-commerce marketplace built as a React Single Page Application (SPA). Customers will be able to discover products across multiple categories, search and filter the catalogue, view product details, manage a cart and wishlist, and simulate placing and tracking orders.

The visual identity uses an elegant black-and-gold palette. The luxury presentation applies to the brand and shopping experience; products may cover a wide range of price points.

## 2. Problem Statement
Customers need a convenient way to discover products from different categories, compare product information, and manage purchases in one accessible online experience.

## 3. Project Aim
To design, build, test and present a responsive e-commerce SPA that demonstrates React development, client-side routing, shared state, simulated REST API operations, automated testing and collaborative Agile development.

## 4. Objectives
- Build a responsive interface for desktop, tablet and mobile devices.
- Display products from a shared JSON Server API.
- Support product search, category filtering and sorting.
- Provide parameterized product-detail routes.
- Allow customers to add, remove and update cart items.
- Allow customers to save and remove wishlist items.
- Simulate checkout and order creation.
- Display customer order history and order status.
- Write automated component and interaction tests.
- Use Git branches, pull requests and code reviews for team collaboration.

## 5. Product Categories
Initial categories may include:
- Electronics
- Fashion
- Beauty & Personal Care
- Home & Living
- Sports & Outdoors
- Health & Wellness
- Accessories
- Books & Stationery

Categories and sample products can be adjusted by the team.

## 6. Main Application Views
| View | Suggested route | Main purpose |
|---|---|---|
| Home | `/` | Brand introduction, promotions and featured products |
| Shop | `/shop` | Product catalogue, search and filters |
| Product details | `/products/:id` | Information about one product |
| Cart | `/cart` | Review items, quantities and totals |
| Checkout | `/checkout` | Collect delivery details and simulate payment selection |
| My Account | `/account` | Profile and order history |
| Wishlist | `/wishlist` | Saved products |
| Order tracking | `/orders/:id` | Show an order's status |
| Contact & Support | `/contact` | Contact information and support form |

## 7. Technology Stack
- React with Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- React Hooks and Context API
- JSON Server as a simulated REST API
- Jest and React Testing Library
- Git and GitHub

## 8. Scope and Limitations
This is an academic group project. JSON Server provides simulated backend functionality for development and demonstration. Unless a secure production backend and payment provider integration are separately implemented, checkout and M-Pesa/card payment selection must be clearly presented as a demonstration flow. Do not collect or store real card numbers, PINs, passwords or payment credentials in the frontend or `db.json`.

## 9. Expected Deliverables
- Responsive React SPA
- Shared `db.json` data contract
- Working client-side routes
- Demonstrable GET, POST and PATCH/PUT operations
- Search and filtering
- Cart and wishlist state management
- Automated tests
- Project documentation
- GitHub repository with feature branches and reviewed pull requests
- Final team demonstration
