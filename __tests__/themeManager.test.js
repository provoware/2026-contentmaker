import { applyTheme, populateThemeSelect, getDefaultThemeId } from "../src/scripts/themeManager.js";
import { themes } from "../config/themes.js";

describe("applyTheme", () => {
  test("setzt css variablen", () => {
    const target = document.createElement("div");
    const themeId = themes[1].id;
    const result = applyTheme(themeId, target);
    expect(result).toBe(true);
    expect(target.style.getPropertyValue("--color-text")).toBe(themes[1].colors.text);
    expect(target.style.getPropertyValue("--color-text-active")).toBe(themes[1].colors.text);
  });

  test("gibt false bei ungültigem theme", () => {
    const target = document.createElement("div");
    expect(applyTheme("does-not-exist", target)).toBe(false);
  });
});

describe("populateThemeSelect", () => {
  test("erstellt optionen", () => {
    const select = document.createElement("select");
    const success = populateThemeSelect(select);
    expect(success).toBe(true);
    expect(select.children).toHaveLength(themes.length);
  });
});

describe("getDefaultThemeId", () => {
  test("liefert erstes theme", () => {
    expect(getDefaultThemeId()).toBe(themes[0].id);
  });
});
