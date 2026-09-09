import test from "@playwright/test";

/** Skips the current test when it runs under a Playwright project whose name contains "safari". */
export const skipIfWebkit = (message = "Not supported for safari") => {
    test.skip(() => test.info().project.name.includes("safari"), message);
};

/** Skips the current test when it runs under a Playwright project whose name contains "mobile". */
export const skipIfMobile = (message = "Not supported for mobile") => {
    test.skip(() => test.info().project.name.includes("mobile"), message);
};
