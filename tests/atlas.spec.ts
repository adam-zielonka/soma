import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("emotion selection changes the description, body map and shareable URL", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Smutek", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Smutek", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("group", { name: "Mapa ciała: Smutek" }),
  ).toBeVisible();
  await expect(page).toHaveURL(/emocja=sadness/);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Smutek", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("body regions support mouse, keyboard and a textual alternative", async ({
  page,
}) => {
  await page.goto("./?emocja=sadness");
  const map = page.getByRole("group", { name: "Mapa ciała: Smutek" });
  await map
    .getByRole("button", { name: "Nogi" })
    .click({ position: { x: 15, y: 50 } });
  await expect(page.locator(".region-info")).toContainText(
    "spadek odczuwanej aktywności",
  );
  const leg = await map.getByRole("button", { name: "Nogi" }).boundingBox();
  const head = await map.getByRole("button", { name: "Głowa" }).boundingBox();
  expect(leg!.y).toBeGreaterThan(head!.y + 100);
  await map.getByRole("button", { name: "Głowa" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".region-info")).toContainText(
    "wzrost odczuwanej aktywności",
  );
  await page
    .locator(".region-chips")
    .getByRole("button", { name: "Gardło" })
    .click();
  await expect(page.locator(".region-info")).toContainText(
    "nie został wyróżniony",
  );
});

test("explore and comparison pass automated accessibility checks", async ({
  page,
}) => {
  await page.goto("./");
  const explore = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(explore.violations).toEqual([]);
  await page.getByRole("button", { name: "Porównaj emocje" }).click();
  const compare = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(compare.violations).toEqual([]);
});

test("comparison works, persists in URL and handles the same emotion", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Porównaj emocje" }).click();
  await expect(
    page.getByRole("img", { name: "Mapa ciała: Smutek" }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Druga emocja" })
    .selectOption("anger");
  await expect(
    page.getByRole("img", { name: "Mapa ciała: Złość" }),
  ).toBeVisible();
  await expect(page).toHaveURL(/z=anger/);
  await page.reload();
  await expect(page.getByRole("combobox")).toHaveValue("anger");
  await page.getByRole("combobox").selectOption("joy");
  await expect(
    page.getByText("To ta sama emocja.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Odkrywaj", exact: true }).click();
  await expect(page.getByRole("combobox")).toHaveCount(0);
  await expect(page).not.toHaveURL(/z=/);
});

test("all eight maps render with distinct data and no browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  for (const name of [
    "Radość",
    "Smutek",
    "Złość",
    "Strach",
    "Wstręt",
    "Zaskoczenie",
    "Miłość",
    "Duma",
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
    await expect(
      page.locator(".body-map .heat-layer ellipse").first(),
    ).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("scientific references, limitations and reflection remain accessible", async ({
  page,
}) => {
  await page.goto("./?emocja=invalid&z=invalid");
  await expect(
    page.getByRole("button", { name: "Radość", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Zatrzymaj się na chwilę" }).click();
  await expect(page.locator("#reflection-content")).toBeVisible();
  await page.getByRole("button", { name: "Zwiń wskazówkę" }).click();
  await expect(page.locator("#reflection-content")).toHaveCount(0);
  await page
    .getByText("Jak powstały te mapy i jakie mają ograniczenia?", {
      exact: true,
    })
    .click();
  await expect(
    page.getByText("Sylwetki w Somie to autorskie", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Przeczytaj publikację" }),
  ).toHaveCount(2);
  await expect(page.locator("#source-1 a")).toHaveAttribute(
    "href",
    "https://doi.org/10.1073/pnas.1321664111",
  );
});

test("layout stays within narrow and wide viewports in both modes", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Porównaj emocje" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});
