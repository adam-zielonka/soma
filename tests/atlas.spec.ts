import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const picker = (page: Page) => page.locator(".picker-groups");
const option = (page: Page, name: string) =>
  page.locator(".emotion-option").filter({ hasText: new RegExp(`^${name}$`) });
// On phones the emotion grid is folded behind a toggle.
async function openPicker(page: Page) {
  const toggle = page.locator(".picker-toggle");
  if (
    (await toggle.isVisible()) &&
    (await toggle.getAttribute("aria-expanded")) !== "true"
  )
    await toggle.click();
}
async function pickEmotion(page: Page, name: string) {
  await openPicker(page);
  await option(page, name).click();
}
const regionItem = (page: Page, name: string) =>
  page.locator(".region-item").filter({
    has: page.getByRole("button", { name: new RegExp(`^${name}`) }),
  });
// Points inside each area of the 240×515 outline (left arm and left leg).
const centres: Record<string, [number, number]> = {
  head: [120, 46],
  throat: [120, 88],
  chest: [120, 138],
  belly: [120, 232],
  arms: [52, 200],
  legs: [101, 386],
};

// Click a body area on the first figure, at a point that is inside the outline.
async function clickFigure(page: Page, region: string) {
  const svg = page.locator(".figure svg.body-map").first();
  await svg.scrollIntoViewIfNeeded();
  const point = await svg.evaluate((element, [x, y]) => {
    const map = element as unknown as SVGSVGElement;
    const toScreen = () =>
      new DOMPoint(x, y).matrixTransform(map.getScreenCTM()!);
    const first = toScreen();
    window.scrollBy(0, first.y - window.innerHeight / 2);
    const { x: left, y: top } = toScreen();
    return { left, top };
  }, centres[region]);
  await page.mouse.click(point.left, point.top);
}

test("choosing an emotion updates the heading, map and shareable URL", async ({
  page,
}) => {
  await page.goto("./");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Gdzie w ciele czujemy emocje?",
    }),
  ).toBeVisible();
  await expect(option(page, "Radość")).toHaveAttribute("aria-pressed", "true");
  await pickEmotion(page, "Smutek");
  await expect(
    page.getByRole("heading", { level: 2, name: "Smutek", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Mapa ciała: Smutek" }),
  ).toBeVisible();
  await expect(page.locator(".stage-description")).toContainText(
    "spadek odczuwanej aktywności rąk i nóg",
  );
  await expect(page).toHaveURL(/emocja=sadness/);
  await page.reload();
  await expect(option(page, "Smutek")).toHaveAttribute("aria-pressed", "true");
});

test("emotions are grouped as basic and complex, in the order of the source figure", async ({
  page,
}) => {
  await page.goto("./");
  await openPicker(page);
  const groups = picker(page).locator("section");
  await expect(groups.nth(0).getByRole("heading")).toHaveText(
    "Emocje podstawowe",
  );
  await expect(groups.nth(0).getByRole("button")).toHaveText([
    "Złość",
    "Strach",
    "Wstręt",
    "Radość",
    "Smutek",
    "Zaskoczenie",
  ]);
  await expect(groups.nth(1).getByRole("heading")).toHaveText("Emocje złożone");
  await expect(groups.nth(1).getByRole("button")).toHaveText([
    "Lęk",
    "Miłość",
    "Pogarda",
    "Duma",
    "Wstyd",
    "Zazdrość",
  ]);
});

test("the region list is a visible text version of the map", async ({
  page,
}) => {
  await page.goto("./?emocja=sadness");
  const expected: [string, string][] = [
    ["Głowa", "Wzrost"],
    ["Gardło", "Wzrost"],
    ["Klatka piersiowa", "Wzrost"],
    ["Brzuch", "Bez wyróżnienia"],
    ["Ręce", "Spadek"],
    ["Nogi", "Spadek"],
  ];
  for (const [region, state] of expected)
    await expect(
      regionItem(page, region).locator(".activity-badge"),
    ).toHaveText(state);
  const description = await page
    .getByRole("img", { name: "Mapa ciała: Smutek" })
    .locator("desc")
    .textContent();
  expect(description).toContain("Nogi: spadek odczuwanej aktywności");
  expect(description).toContain("Brzuch: bez wyróżnienia");
});

test("body areas open from the figure, the list and the keyboard", async ({
  page,
}) => {
  await page.goto("./?emocja=sadness");
  await clickFigure(page, "legs");
  const legs = regionItem(page, "Nogi");
  await expect(legs.getByRole("button", { name: /^Nogi/ })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(legs).toContainText("Nogi wydają się ciężkie");
  await expect(legs).toContainText("Spadek odczuwanej aktywności kończyn");
  await expect(page).toHaveURL(/obszar=legs/);
  await page.reload();
  await expect(legs.getByRole("button", { name: /^Nogi/ })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await regionItem(page, "Głowa")
    .getByRole("button", { name: /^Głowa/ })
    .focus();
  await page.keyboard.press("Enter");
  await expect(regionItem(page, "Głowa")).toContainText(
    "Czuję łzy pod powiekami",
  );
  await expect(legs.getByRole("button", { name: /^Nogi/ })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await regionItem(page, "Brzuch").getByRole("button").first().click();
  await expect(regionItem(page, "Brzuch")).toContainText(
    "Ogólne słowa dla tego obszaru, bez związku z tą emocją",
  );
  await regionItem(page, "Brzuch").getByRole("button").first().click();
  await expect(page).not.toHaveURL(/obszar=/);
});

test("the figure shows the heat map, not an opaque click layer", async ({
  page,
}) => {
  await page.goto("./?emocja=joy&obszar=chest");
  const hit = page.locator(".figure .hit-area path").first();
  expect(
    await hit.evaluate((element) => getComputedStyle(element).fillOpacity),
  ).toBe("0");
  // Sample the rendered chest: it must be warm, not dark.
  const figure = page.locator(".figure svg.body-map");
  const box = (await figure.boundingBox())!;
  const shot = await page.screenshot({
    clip: {
      x: box.x + box.width / 2 - 2,
      y: box.y + (box.height * 138) / 515 - 2,
      width: 4,
      height: 4,
    },
  });
  const pixel = await page.evaluate(async (png) => {
    const image = new Image();
    image.src = `data:image/png;base64,${png}`;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d")!;
    context.drawImage(image, 0, 0);
    return Array.from(context.getImageData(1, 1, 1, 1).data);
  }, shot.toString("base64"));
  expect(pixel[0], `chest pixel ${pixel}`).toBeGreaterThan(180);
  expect(pixel[0]).toBeGreaterThan(pixel[2]);
});

test("examples cite the NHS only where an NHS page supports them", async ({
  page,
}) => {
  await page.goto("./?emocja=anger&obszar=arms");
  const arms = regionItem(page, "Ręce");
  await expect(arms).toContainText("Zaciskam dłonie w pięści");
  await expect(arms.locator(".examples-source a")).toHaveAttribute(
    "href",
    "#zrodlo-3",
  );
  await page.goto("./?emocja=joy&obszar=arms");
  await expect(
    regionItem(page, "Ręce").locator(".examples-source"),
  ).toHaveCount(0);
});

test("all twelve emotions render a map without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  const buttons = page.locator(".emotion-option");
  await expect(buttons).toHaveCount(12);
  const names = (await buttons.allTextContents()).map((n) => n.trim());
  for (const name of names) {
    await pickEmotion(page, name);
    await expect(
      page.getByRole("heading", { level: 2, name, exact: true }),
    ).toBeVisible();
    await expect(
      page.locator(".figure .heat-layer ellipse").first(),
    ).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("on wide screens the body view shows its lists without scrolling", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "wide-screen layout");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./?widok=cialo&obszar=arms");
  const more = await page.locator(".state-group.more").boundingBox();
  const less = await page.locator(".state-group.less").boundingBox();
  expect(less!.y, "increase and decrease sit side by side").toBe(more!.y);
  expect(less!.x).toBeGreaterThan(more!.x + more!.width);
  for (const region of ["head", "throat", "chest", "belly", "arms", "legs"]) {
    await page.goto(`./?widok=cialo&obszar=${region}`);
    await expect(page.locator(".emotion-row").last()).toBeInViewport({
      ratio: 1,
    });
  }
});

test("body view groups emotions by direction and links to their maps", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("button", { name: "Obszary ciała", exact: true })
    .click();
  await expect(page).toHaveURL(/widok=cialo/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Klatka piersiowa" }),
  ).toBeVisible();
  const areas = page.getByRole("group", { name: "Obszary ciała" });
  await areas.getByRole("button", { name: "Brzuch" }).click();
  await expect(page.locator(".research-note.lead")).toContainText(
    "głównie przy wstręcie",
  );
  await expect(page.locator(".state-group.more .emotion-row")).toHaveCount(5);
  await expect(page.locator(".emotion-row", { hasText: "Lęk" })).toContainText(
    "motyle, ścisk",
  );
  await expect(page.locator(".state-group.none h3")).toHaveText(
    "Bez wyróżnienia (7)",
  );
  await areas.getByRole("button", { name: "Ręce" }).click();
  await expect(page.locator(".state-group.less")).toContainText("Smutek");
  await clickFigure(page, "throat");
  await expect(
    page.getByRole("heading", { level: 2, name: "Gardło" }),
  ).toBeVisible();
  await expect(page.locator(".state-group.more .emotion-row")).toHaveCount(12);
  await areas.getByRole("button", { name: "Ręce" }).click();
  await page.locator(".emotion-row", { hasText: "Złość" }).click();
  await expect(
    page.getByRole("heading", { level: 2, name: "Złość", exact: true }),
  ).toBeVisible();
  await expect(regionItem(page, "Ręce")).toContainText(
    "Zaciskam dłonie w pięści",
  );
  await expect(page).not.toHaveURL(/widok=/);
  await expect(page).toHaveURL(/obszar=arms/);
  await expect(page.locator("#emotion-title")).toBeFocused();
  await regionItem(page, "Ręce")
    .getByRole("button", { name: "Ten obszar we wszystkich emocjach" })
    .click();
  await expect(page).toHaveURL(/widok=cialo/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Ręce" }),
  ).toBeVisible();
});

test("visiting the body view does not leave an area chosen elsewhere", async ({
  page,
}) => {
  await page.goto("./?emocja=fear");
  await page
    .getByRole("button", { name: "Obszary ciała", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { level: 2, name: "Klatka piersiowa" }),
  ).toBeVisible();
  await expect(page).not.toHaveURL(/obszar=/);
  await page.getByRole("button", { name: "Emocje", exact: true }).click();
  await expect(page.locator(".region-item.open")).toHaveCount(0);
  await expect(page).not.toHaveURL(/obszar=/);
});

test("on phones the emotion toggle keeps focus after a choice", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 740 });
  await page.goto("./");
  const toggle = page.locator(".picker-toggle");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await option(page, "Wstręt").focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await expect(toggle).toContainText("Wstręt");
});

test("links from earlier versions still open the right view", async ({
  page,
}) => {
  await page.goto("./?widok=cialo&obszar=legs");
  await expect(
    page.getByRole("heading", { level: 2, name: "Nogi" }),
  ).toBeVisible();
  await page.goto("./?widok=cialo&obszar=unknown");
  await expect(
    page.getByRole("heading", { level: 2, name: "Klatka piersiowa" }),
  ).toBeVisible();
  // The comparison view was removed: its links open the first emotion's map.
  await page.goto("./?emocja=shame&z=anxiety&obszar=arms");
  await expect(
    page.getByRole("heading", { level: 2, name: "Wstyd", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: /^Mapa ciała:/ })).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Emocje", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    regionItem(page, "Ręce").getByRole("button").first(),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(page).not.toHaveURL(/[?&]z=/);
  await page.goto("./?emocja=invalid&z=invalid");
  await expect(
    page.getByRole("heading", { level: 2, name: "Radość", exact: true }),
  ).toBeVisible();
  await expect(page).not.toHaveURL(/[?&]z=/);
  await page.goto("./?emocja=contempt&obszar=arms");
  await expect(
    regionItem(page, "Ręce").getByRole("button").first(),
  ).toHaveAttribute("aria-expanded", "true");
});

test("research context and limitations are visible and citations resolve", async ({
  page,
}) => {
  await page.goto("./");
  const about = page.getByRole("region", {
    name: "O badaniu i ograniczeniach map",
  });
  await expect(about.getByRole("heading", { level: 3 })).toHaveText([
    "Skąd pochodzą mapy",
    "Jak czytać sylwetkę",
    "Czego mapy nie mówią",
    "Słowa opisu i pytania",
    "Źródła",
  ]);
  await expect(about).toContainText("701 osób");
  await expect(about).toContainText("pomija stan neutralny");
  await expect(page.locator("#zrodlo-1 a")).toHaveAttribute(
    "href",
    "https://doi.org/10.1073/pnas.1321664111",
  );
  await expect(page.locator("#zrodlo-2 a")).toHaveAttribute(
    "href",
    "https://doi.org/10.1073/pnas.1807390115",
  );
  const url = page.url();
  await page.locator(".stage-description .cite").click();
  await expect(page.locator("#zrodlo-1")).toBeInViewport();
  await expect(page.locator("#zrodlo-1")).toBeFocused();
  expect(page.url(), "in-page links leave the shareable URL alone").toBe(url);
  await page.getByRole("link", { name: "O badaniu", exact: true }).click();
  await expect(about.getByRole("heading", { level: 2 })).toBeInViewport();
  await expect(page.locator(".reflection")).toContainText(
    "Przypomnij sobie drobną przyjemność",
  );
});

test("pages pass automated accessibility checks in every view", async ({
  page,
}) => {
  const scan = async () => {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  };
  await page.goto("./?emocja=sadness&obszar=legs");
  await scan();
  await page.goto("./?emocja=envy&obszar=arms");
  await scan();
  await page.goto("./?widok=cialo&obszar=arms");
  await scan();
});

test("forced-colour mode keeps the legend and shows the selected choices", async ({
  page,
}) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("./?emocja=sadness&obszar=legs");
  for (const state of ["more", "less", "none"]) {
    const swatch = page.locator(`.legend .swatch.${state}`);
    expect(
      await swatch.evaluate((element) => {
        const style = getComputedStyle(element);
        return style.backgroundImage !== "none" || style.backgroundColor;
      }),
    ).toBeTruthy();
    expect(
      await swatch.evaluate(
        (element) => getComputedStyle(element).forcedColorAdjust,
      ),
    ).toBe("none");
  }
  for (const selected of [
    page.locator(".emotion-option[aria-pressed=true]"),
    page.locator(".mode-tabs button[aria-pressed=true]"),
    page.locator(".region-item.open > .region-toggle"),
  ])
    expect(
      await selected.evaluate(
        (element) => getComputedStyle(element).outlineStyle,
      ),
    ).toBe("solid");
});

test("layout has no horizontal overflow from 320 to 1440 px", async ({
  page,
}) => {
  for (const width of [320, 390, 700, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const query of [
      "./?emocja=surprise&obszar=throat",
      "./?emocja=love&obszar=belly",
      "./?widok=cialo&obszar=legs",
    ]) {
      await page.goto(query);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${width}px ${query}`,
      ).toBe(true);
    }
  }
});

test("on narrow screens tapping the figure reveals the chosen area", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto("./?emocja=anger");
  await clickFigure(page, "arms");
  await expect(
    regionItem(page, "Ręce").locator(".region-detail"),
  ).toBeInViewport({
    ratio: 0.3,
  });
});
