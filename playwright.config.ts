import { defineConfig, devices } from '@playwright/test';
import { env } from './env';

export default defineConfig({
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: Number(process.env.WORKERS) || 3,
  reporter: [
      ["list", { printSteps: true }],
      ["html"],
  ],
  use: {
    baseURL: env.FRONTEND_URL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'Natodi-Desktop',
      testMatch: 'tests/desktop/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'Natodi-Mobile',
      testMatch: 'tests/mobile/**/*.spec.ts',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
