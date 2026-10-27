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
  await page.getByRole("button", { name: "Według części ciała" }).click();
  const body = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(body.violations).toEqual([]);
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
  await expect(page.getByRole("combobox", { name: "Druga emocja" })).toHaveValue("anger");
  await page.getByRole("combobox", { name: "Druga emocja" }).selectOption("joy");
  await expect(
    page.getByText("To ta sama emocja.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Odkrywaj", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "Druga emocja" })).toHaveCount(0);
  await expect(page).not.toHaveURL(/z=/);
});

test("all twelve emotions render without browser errors", async ({ page }) => {
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
    "Niepokój",
    "Wstyd",
    "Zawiść",
    "Pogarda",
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

test("examples follow the selected emotion and body area, including unhighlighted areas", async ({
  page,
}) => {
  await page.goto("./?emocja=anger");
  await page
    .locator(".region-chips")
    .getByRole("button", { name: "Ręce", exact: true })
    .click();
  await expect(page.locator(".sensation-examples")).toContainText(
    "Zaciskam dłonie w pięści",
  );
  await page.getByRole("button", { name: "Niepokój", exact: true }).click();
  await page
    .locator(".region-chips")
    .getByRole("button", { name: "Brzuch", exact: true })
    .click();
  await expect(page.locator(".sensation-examples")).toContainText(
    "motyle, ścisk",
  );
  await page
    .locator(".region-chips")
    .getByRole("button", { name: "Gardło", exact: true })
    .click();
  await expect(page.locator(".region-info")).toContainText(
    "bez przypisania do wybranej emocji",
  );
  await expect(page.locator(".examples-note")).toContainText(
    "nie wyniki pomiaru",
  );
  await expect(page.locator("#source-3 a")).toHaveCount(3);
});

test("new emotions support deep links and comparing concrete sensations", async ({
  page,
}) => {
  await page.goto("./?emocja=shame&z=anxiety");
  await expect(
    page.getByRole("img", { name: "Mapa ciała: Wstyd" }),
  ).toBeVisible();
  await expect(
    page.getByRole("combobox", { name: "Druga emocja" }),
  ).toHaveValue("anxiety");
  await page
    .getByText("Przykłady odczuć w tym samym obszarze", { exact: false })
    .click();
  await page
    .getByRole("combobox", { name: "Obszar ciała" })
    .selectOption("head");
  await expect(page.locator(".comparison-examples")).toContainText(
    "gorąco na policzkach",
  );
  await expect(page.locator(".comparison-examples")).toContainText(
    "napięcie twarzy lub szczęki",
  );
  await page
    .getByRole("combobox", { name: "Druga emocja" })
    .selectOption("contempt");
  await expect(
    page.getByRole("img", { name: "Mapa ciała: Pogarda" }),
  ).toBeVisible();
  await expect(page.locator(".comparison-examples")).toContainText(
    "napięcie kącika ust",
  );
  await page.getByRole("button", { name: "Zawiść", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Zawiść", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
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
    await page.getByRole("button", { name: "Według części ciała" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("body-first view shows regional emotion examples and separates increases from decreases", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Według części ciała" }).click();
  await page
    .locator(".body-area-buttons")
    .getByRole("button", { name: "Brzuch", exact: true })
    .click();
  await expect(page.locator(".body-emotion-card")).toHaveCount(6);
  await expect(
    page.getByRole("article", { name: "Niepokój", exact: true }),
  ).toContainText("motyle, ścisk");
  await expect(
    page.getByRole("article", { name: "Złość", exact: true }),
  ).toHaveCount(0);
  await page
    .locator(".body-area-buttons")
    .getByRole("button", { name: "Ręce", exact: true })
    .click();
  await expect(
    page
      .locator(".body-emotion-group.more")
      .getByRole("article", { name: "Złość", exact: true }),
  ).toContainText("Zaciskam dłonie w pięści");
  await expect(
    page
      .locator(".body-emotion-group.less")
      .getByRole("article", { name: "Smutek", exact: true }),
  ).toContainText("Ręce wydają się ciężkie");
  const map = page.getByRole("group", { name: "Wybierz część ciała" });
  await map.getByRole("button", { name: "Gardło", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".body-emotion-card")).toHaveCount(1);
  await expect(
    page.getByRole("article", { name: "Wstręt", exact: true }),
  ).toContainText("zaciskanie w gardle");
  await page
    .getByText("Pozostałe emocje w atlasie (11)", { exact: true })
    .click();
  await expect(page.locator(".body-unmarked")).toContainText("Nie oznacza to");
});

test("body region persists in shared links and carries over to the full emotion map", async ({
  page,
}) => {
  await page.goto("./?widok=cialo&obszar=legs");
  await expect(
    page.getByRole("heading", { name: "Nogi", exact: true }),
  ).toBeVisible();
  await page
    .locator(".body-area-buttons")
    .getByRole("button", { name: "Ręce", exact: true })
    .click();
  await expect(page).toHaveURL(/obszar=arms/);
  await page.reload();
  await expect(
    page
      .locator(".body-area-buttons")
      .getByRole("button", { name: "Ręce", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("article", { name: "Złość", exact: true })
    .getByRole("button", { name: "Zobacz mapę emocji" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Złość", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".sensation-examples")).toContainText(
    "Zaciskam dłonie w pięści",
  );
  await expect(page).not.toHaveURL(/widok=/);
  await page.goto("./?widok=cialo&obszar=unknown");
  await expect(
    page.getByRole("heading", { name: "Klatka piersiowa", exact: true }),
  ).toBeVisible();
});
