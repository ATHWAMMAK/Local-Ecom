# Shared Database Schema

This document is the team's shared data contract for `db.json`. All members must use the agreed collection names, field names and data types. Discuss and document schema changes before merging them.

## 1. Initial `db.json`
```json
{
  "products": [
    {
      "id": "1",
      "name": "Wireless Headphones",
      "category": "Electronics",
      "price": 3500,
      "description": "Comfortable wireless headphones.",
      "image": "/images/wireless-headphones.jpg",
      "rating": 4.7,
      "stock": 12
    }
  ],
  "users": [],
  "orders": [],
  "reviews": []
}
```

## 2. Collection contracts

### products
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique product identifier |
| `name` | string | Yes | Product display name |
| `category` | string | Yes | Category used for filtering |
| `price` | number | Yes | Price in Kenyan shillings (KES) |
| `description` | string | Yes | Product description |
| `image` | string | Yes | Public image path or image URL |
| `rating` | number | No | Average rating, if available |
| `stock` | number | Yes | Available quantity |

Suggested categories: Electronics, Fashion, Beauty & Personal Care, Home & Living, Sports & Outdoors, Health & Wellness, Accessories, Books & Stationery.

### users
Suggested fields:
| Field | Type | Description |
|---|---|---|
| `id` | string | Unique user identifier |
| `name` | string | Customer name |
| `email` | string | Customer email |
| `phone` | string | Contact phone |
| `addresses` | array | Saved delivery addresses |

For this academic mock API, use fictional test data only. Do not store real passwords or sensitive personal data in `db.json`.

### orders
Suggested fields:
| Field | Type | Description |
|---|---|---|
| `id` | string | Unique order identifier |
| `userId` | string | Customer identifier, if using accounts |
| `items` | array | Product IDs, names, quantities and unit prices |
| `total` | number | Order total in KES |
| `deliveryAddress` | object | Fictional/test delivery address |
| `paymentMethod` | string | For example `mpesa-demo` or `card-demo` |
| `paymentStatus` | string | For example `pending`, `simulated` |
| `status` | string | For example `processing`, `dispatched`, `delivered` |
| `createdAt` | string | ISO date-time string |

### reviews
Suggested fields:
| Field | Type | Description |
|---|---|---|
| `id` | string | Unique review identifier |
| `productId` | string | Reviewed product |
| `userId` | string | Reviewer identifier, if applicable |
| `rating` | number | Rating, normally 1–5 |
| `comment` | string | Review text |
| `createdAt` | string | ISO date-time string |

## 3. API operations
| Requirement | Method and endpoint | Purpose |
|---|---|---|
| List products | `GET /products` | Load catalogue |
| Read one product | `GET /products/:id` | Load product details |
| Create an order | `POST /orders` | Save a simulated order |
| Update an order | `PATCH /orders/:id` | Update order status |
| Create a review | `POST /reviews` | Save a product review, if implemented |
| Update a product | `PATCH /products/:id` | Demonstrate product update, if in scope |

## 4. Team rules
- Use numeric values for prices, ratings and stock.
- Use consistent category spelling and capitalization.
- Keep IDs consistently represented as strings in seed data.
- Store prices in KES and display the currency clearly.
- Never commit real customer records, passwords, M-Pesa PINs, card numbers or payment credentials.
- If the team changes this contract, update this document and notify all members.
