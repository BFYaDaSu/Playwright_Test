// const { test, expect } = require("@playwright/test");
import { test, expect } from "@playwright/test";
const testDataLogin = {
  username: {
    positive: "student",
    negative: "incorrectUser",
  },
  password: {
    positive: "Password123",
    negative: "incorrectPassword",
  },
};

test.beforeEach(async ({ page }) => {
  await page.goto("https://practicetestautomation.com/practice-test-login/");
});

test("TC01", async ({ page }) => {
  //   await page.goto("https://practicetestautomation.com/practice-test-login/");
  // await page.getByLabel("Username").fill("student");
  // await page.locator("#username").fill("student");
  // await page.getByLabel("Password").fill("Password123");
  await page.locator("#username").fill(testDataLogin.username.positive);
  await page.locator("#password").fill(testDataLogin.password.positive);
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page).toHaveURL(
    "https://practicetestautomation.com/logged-in-successfully/"
  );
  await expect(page.locator("text=Logged in successfully")).toBeVisible();
  await page.screenshot({ path: "screenshot_login.png" });
  //   await page.screenshot({
  //     path: "./tests/images/screenshot_login.png",
  //   });
  const logoLink = page.getByRole("link", {
    name: "Practice Test Automation",
    exact: true,
  });
  await expect(logoLink).toBeVisible();
  // await page.setViewportSize({ width: 375, height: 667 });
  console.log(
    page.url("https://practicetestautomation.com/logged-in-successfully/")
  );
  expect(page.url()).toBe(
    "https://practicetestautomation.com/logged-in-successfully/"
  );

  const currentURL = page.url();
  expect(currentURL).toBe(
    "https://practicetestautomation.com/logged-in-successfully/"
  );
});

test("TC02", async ({ page }) => {
  // await page.locator("#username").fill("incorrectUser");
  // await page.getByLabel("Password").fill("Password123");
  await page.locator("#username").fill(testDataLogin.username.negative);
  await page.locator("#password").fill(testDataLogin.password.positive);
  await page.getByRole("button", { name: "Submit" }).click();
  // cy.get("#error").should("have.text", "Your username is invalid!");
  await expect(page.locator("#error")).toHaveText("Your username is invalid!");
});

test("TC03", async ({ page }) => {
  // await page.locator("#username").fill("student");
  // await page.getByLabel("Password").fill("incorrectPassword");
  await page.locator("#username").fill(testDataLogin.username.positive);
  await page.locator("#password").fill(testDataLogin.password.negative);
  await page.getByRole("button", { name: "Submit" }).click();
  // cy.get("#error").should("have.text", "Your password is invalid!");
  await expect(page.locator("#error")).toHaveText("Your password is invalid!");
});
