# Testing Plan

## 1. Tools
The project requirements specify Jest and React Testing Library. Use:
- Jest as the test runner and assertion framework.
- React Testing Library to render components and query the UI.
- `@testing-library/jest-dom` for DOM matchers.
- `@testing-library/user-event` for realistic user interactions.

Because the application uses Vite, the team must configure Jest to work with the project's JavaScript/JSX and module setup. Agree on one tested configuration and document the exact commands in `package.json` and the README. Do not mix Jest and Vitest commands or configurations unintentionally.

## 2. Suggested test coverage
| Area | Example test |
|---|---|
| Navbar | Main navigation links are rendered and navigate to the expected routes |
| ProductCard | Product name, price and image are displayed |
| Shop | Products render after a successful API response |
| Search | Entering a term narrows the visible products |
| Filters | Selecting a category shows matching products |
| Product details | A valid route ID displays the matching product |
| Cart | Adding/removing an item updates the cart |
| Cart quantities | Increasing/decreasing quantity updates subtotal |
| Wishlist | Saving and removing a product updates the wishlist |
| Checkout | Required fields show validation feedback |
| Orders | Submitting valid checkout data creates a simulated order |
| Order tracking | The page displays the status for the requested order |

## 3. Example component test
```jsx
import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

test("displays the product name", () => {
  const product = {
    id: "1",
    name: "Wireless Headphones",
    price: 3500,
    image: "/images/headphones.jpg"
  };

  render(<ProductCard product={product} />);

  expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
});
```

Adjust the import path and props to match the final component implementation.

## 4. Testing practices
- Test behavior visible to users rather than component implementation details.
- Prefer accessible queries such as `getByRole`, `getByLabelText` and `getByText`.
- Use `userEvent` for typing, clicking and form submission.
- Mock API requests in unit tests; use a controlled test API or integration setup for API workflows.
- Test loading, empty and error states.
- Keep tests independent and reset mocks between tests.
- Run the full test suite before merging a pull request.

## 5. Pull request test checklist
- [ ] Relevant tests added or updated.
- [ ] Tests pass locally.
- [ ] No console errors or warnings introduced.
- [ ] Main user interaction works.
- [ ] Mobile layout checked.
- [ ] Test command documented and reproducible.
