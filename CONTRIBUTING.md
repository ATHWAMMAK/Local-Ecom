# Contributing to Diamonds and Dimes

## Branching
Do not commit feature work directly to `main`. Create a branch for each feature or task.

Suggested branches:
- `feature/home-navigation`
- `feature/product-catalogue`
- `feature/product-details-api`
- `feature/cart-wishlist`
- `feature/checkout-orders`
- `feature/testing-documentation`

## Workflow
1. Pull the latest `main`.
2. Create or switch to your feature branch.
3. Make a focused change.
4. Run relevant tests and check the app.
5. Commit with a clear message.
6. Push the branch.
7. Open a pull request into `main`.
8. Request a teammate's review.
9. Address feedback and resolve conflicts.
10. Merge only after approval and passing checks.

## Example commands
```bash
git switch main
git pull origin main
git switch -c feature/your-feature

# Make changes, then:
git add .
git commit -m "Add product category filtering"
git push -u origin feature/your-feature
```

## Commit message examples
- `Add responsive home page layout`
- `Implement product search and category filters`
- `Add cart quantity controls`
- `Create simulated checkout order`
- `Add product card tests`

## Pull request expectations
Include:
- What changed and why.
- Which requirement or task it addresses.
- How it was tested.
- Screenshots for visible UI changes.
- Any known limitations or follow-up work.

Keep pull requests focused and communicate before changing shared configuration, route definitions, contexts or the database contract.
