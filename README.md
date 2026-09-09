# Natodi2

Playwright + TypeScript end-to-end test suite for the Natodi booking widget (a barbershop appointment booking flow), tested against a live/staging frontend and API.

## Setup

1. Create a `.env` file in the project root with the required variables:

   ```
   FRONTEND_URL=
   API_URL=
   REQRES_BASE_URL=
   REQRES_EXISTING_USER_ID=
   REQRES_EXISTING_USER_EMAIL=
   REQRES_NON_EXISTENT_USER_ID=
   ```

2. Install dependencies and browsers:

   ```
   npm ci
   npx playwright install --with-deps
   ```

## Run the tests

```
npx playwright test
```

Run only UI or only API tests (matches any spec under a `ui/` or `api/` directory, e.g. `tests/desktop/ui`, `tests/desktop/api`):

```
npm run test:ui
npm run test:api
```

## Environment configuration

- `FRONTEND_URL` and `API_URL` (plus the `REQRES_*` vars used by the reqres API spec) are validated via `envalid` in [env/index.ts](env/index.ts).
- Values are loaded from the `.env` file at the project root (gitignored) and re-exported as the typed `env` object; import `{ env }` from `env` rather than reading `process.env` directly.
- `playwright.config.ts` reads `env.FRONTEND_URL` as `baseURL`, so page objects should navigate with relative paths (e.g. `page.goto('')`) to stay environment-agnostic.

## Architecture

- **Page Object Model** under [src/page/](src/page/), built on the shared base classes in [src/app/abstractions/abstractClasses.ts](src/app/abstractions/abstractClasses.ts): `PageHolder` holds the shared Playwright `Page`; `Component` (a step/element rendered within the widget, no navigation of its own) and `AppPage` (has its own `pagePath` and an `open()` that navigates) both extend it and require an `expectLoaded` assertion method.
- **Fixtures** in [src/fixture/index.ts](src/fixture/index.ts): extends Playwright's base `test` with pre-instantiated page objects injected per test. Specs must import `test`/`expect` from `../src/fixture`, not directly from `@playwright/test`.
- **Test data** under [src/testData/](src/testData/): UI copy/labels (in Ukrainian) used by locators and assertions, keyed by feature (e.g. `bookingWidget.data.ts`).
- **Utilities** under [src/utils/](src/utils/): `date.ts` (date helpers) and `testSkipper.ts` (`skipIfWebkit` / `skipIfMobile`).
- **Specs** under [tests/](tests/), split into `desktop/ui`, `desktop/api`, etc., consume fixtures + page objects and stay thin (arrange/act/assert).
- Playwright config runs two projects — `Natodi-Desktop` (Desktop Chrome) and `Natodi-Mobile` (iPhone 12) — non-parallel across files (`fullyParallel: false`), with tracing/video/screenshots captured only on failure/retry.
- CI ([.github/workflows/playwright.yml](.github/workflows/playwright.yml)) runs `npm ci` then `npm test`, sharded 3 ways, on push/PR to `main`/`master`, uploading the HTML report as an artifact per shard.
