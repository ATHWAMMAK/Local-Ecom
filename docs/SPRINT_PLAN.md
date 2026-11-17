# Sprint Plan

## Working agreement
The team should agree on sprint dates, meeting times and the definition of priority during sprint planning. The phases below are a suggested sequence; adjust them to the course deadline and the team's actual capacity.

## Sprint goals and deliverables

| Phase | Goal | Tasks | Definition of success |
|---|---|---|---|
| 1. Planning & foundation | Align the team and establish the app | Confirm requirements, wireframes, routes, data contract, Vite setup, Tailwind, Router, JSON Server and Git workflow | All members can run the app and API locally; shared contracts are agreed |
| 2. Storefront | Build the shopping entry points | Home page, navbar, footer, catalogue and product cards | Main routes render and catalogue loads from the API |
| 3. Discovery & details | Make products discoverable | Search, category/price filters, sorting and `/products/:id` | Search and filters update results; detail route handles missing IDs |
| 4. Shopping tools | Implement cart and wishlist | Context providers, add/remove, quantity changes, totals and persistence if agreed | Cart and wishlist work across routes |
| 5. Checkout & orders | Demonstrate order workflow | Checkout validation, simulated payment choice, POST order, account history and tracking | A test order can be created and viewed |
| 6. Quality & release | Stabilize and present | Responsive review, Jest/RTL tests, bug fixes, README, documentation and deployment | Critical flows work, tests pass and team can demonstrate the app |

## Suggested ceremonies
- **Sprint planning:** agree on tasks, owners, acceptance criteria and estimates.
- **Short team check-in:** each member shares completed work, next task and blockers.
- **Sprint review:** demonstrate working features to the team.
- **Retrospective:** identify what went well and one improvement for the next phase.

## Task board columns
Use a GitHub Project board or equivalent with:
1. Backlog
2. Ready
3. In Progress
4. In Review
5. Done

## Definition of Done
A task is done when:
- Acceptance criteria are met.
- The feature follows the agreed architecture and design system.
- Loading, empty and error states are considered where relevant.
- The feature is responsive.
- Relevant tests pass.
- Changes are committed on a feature branch.
- A pull request is reviewed and merged.
- Documentation is updated when behavior or setup changes.

## Risks and mitigations
| Risk | Mitigation |
|---|---|
| Conflicting edits to shared files | Agree ownership and communicate before changing shared files |
| Different assumptions about API fields | Treat `DATABASE_SCHEMA.md` as the shared contract |
| Late integration | Merge small pull requests frequently |
| Dependency/configuration conflicts | One designated integrator coordinates changes to package/config files |
| Scope becoming too large | Prioritize required SPA, CRUD, search/filter, tests and responsive behavior before optional enhancements |
