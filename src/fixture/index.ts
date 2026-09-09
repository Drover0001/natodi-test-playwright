import { test as base, expect } from '@playwright/test';
import { Application } from '../app/Application';

type Fixtures = {
  app: Application;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },
});

export { expect };
