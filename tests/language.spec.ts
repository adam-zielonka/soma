import { expect, test } from "@playwright/test";

test.use({ locale: "en-GB" });

test("English browser preferences and a saved manual choice preserve the selected map", async ({
  page,
}) => {
  await page.goto("./?emocja=sadness&obszar=legs");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#detail-title")).toHaveText("Sadness");
  await expect(page.locator(".region-info")).toContainText(
    "decreased felt activity",
  );
  const table = page.getByRole("table", { name: "Direction of felt activity" });
  await expect(table.getByRole("row")).toHaveCount(7);
  await expect(table).toContainText("Decreased sensation");
  await expect(table).toContainText("Not highlighted");
  await expect(page.locator("main")).not.toContainText(/[ąćęłńóśźż]/i);
  await page
    .locator("footer")
    .getByRole("button", { name: "Polski", exact: true })
    .click();
  await expect(page.locator("#detail-title")).toHaveText("Smutek");
  await expect(page).toHaveURL(/emocja=sadness/);
  await expect(page).toHaveURL(/obszar=legs/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
  await page
    .locator("footer")
    .getByRole("button", { name: "English", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Compare emotions", exact: true })
    .click();
  await expect(table.getByRole("cell")).toHaveCount(12);
  await expect(table.getByRole("columnheader")).toHaveText([
    "Region",
    "Sadness",
    "Sadness",
  ]);
  await expect(page.locator("main")).not.toContainText(/[ąćęłńóśźż]/i);
  await page
    .getByRole("button", { name: "By body region", exact: true })
    .click();
  await expect(page.locator("#body-results-title")).toHaveText("Legs");
  await expect(page.locator("main")).not.toContainText(/[ąćęłńóśźż]/i);
});

test("all emotion names, descriptions and body-region examples have English translations", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.goto("./");
  const picker = page.locator(".emotion-picker");
  const buttons = picker.getByRole("button");
  for (let i = 0; i < (await buttons.count()); i++) {
    await buttons.nth(i).click();
    for (const name of ["Head", "Throat", "Chest", "Belly", "Arms", "Legs"]) {
      await page
        .locator(".region-chips")
        .getByRole("button", { name, exact: true })
        .click();
      await expect(page.locator(".emotion-detail")).not.toContainText(
        /[ąćęłńóśźż]/i,
      );
    }
  }
});
