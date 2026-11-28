import { expect, test } from "@playwright/test";

test.use({ locale: "en-GB" });

const polish = /[ąćęłńóśźż]/i;

test("English browser preferences and a saved manual choice keep the selected map", async ({
  page,
}) => {
  await page.goto("./?emocja=sadness&obszar=legs");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("Soma — an atlas of emotions in the body");
  await expect(page.locator("#emotion-title")).toHaveText("Sadness");
  await expect(page.locator(".region-item.open")).toContainText(
    "My legs feel heavy",
  );
  await expect(page.locator(".region-item.open .activity-badge")).toHaveText(
    "Decrease",
  );
  await expect(page.locator("main")).not.toContainText(polish);
  await page
    .locator("footer")
    .getByRole("button", { name: "Polski", exact: true })
    .click();
  await expect(page.locator("#emotion-title")).toHaveText("Smutek");
  await expect(page).toHaveURL(/emocja=sadness/);
  await expect(page).toHaveURL(/obszar=legs/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
  await page
    .locator("footer")
    .getByRole("button", { name: "English", exact: true })
    .click();
  await expect(page.locator("#emotion-title")).toHaveText("Sadness");
  await expect(page.locator(".mode-tabs button")).toHaveText([
    "Emotions",
    "Body areas",
  ]);
  await expect(page.locator("main")).not.toContainText(polish);
  await page.getByRole("button", { name: "Body areas", exact: true }).click();
  await expect(page.locator("#region-title")).toHaveText("Legs");
  await expect(page.locator("main")).not.toContainText(polish);
});

test("every emotion and body area is translated in the explore and body views", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto("./");
  const emotions = page.locator(".emotion-option");
  const toggle = page.locator(".picker-toggle");
  for (let i = 0; i < 12; i++) {
    if (await toggle.isVisible()) await toggle.click();
    await emotions.nth(i).click();
    const toggles = page.locator(".region-toggle");
    for (let r = 0; r < 6; r++) {
      if ((await toggles.nth(r).getAttribute("aria-expanded")) !== "true")
        await toggles.nth(r).click();
      await expect(page.locator("#atlas")).not.toContainText(polish);
    }
  }
  await page.getByRole("button", { name: "Body areas", exact: true }).click();
  const areas = page.getByRole("group", { name: "Body areas" });
  for (let r = 0; r < 6; r++) {
    await areas.getByRole("button").nth(r).click();
    await expect(page.locator("#atlas")).not.toContainText(polish);
  }
});
