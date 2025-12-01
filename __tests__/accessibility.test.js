import { toggleTextInvert, setFontScale } from "../src/scripts/accessibility.js";

function createRange(value = "100") {
  const input = document.createElement("input");
  input.type = "range";
  input.min = "90";
  input.max = "125";
  input.step = "5";
  input.value = value;
  return input;
}

describe("toggleTextInvert", () => {
  test("aktiviert und deaktiviert per Toggle", () => {
    const body = document.createElement("div");
    const first = toggleTextInvert(body);
    expect(first).toBe(true);
    expect(body.classList.contains("text-invert")).toBe(true);

    const second = toggleTextInvert(body);
    expect(second).toBe(false);
    expect(body.classList.contains("text-invert")).toBe(false);
  });

  test("erzwingt Zustand per bool", () => {
    const body = document.createElement("div");
    toggleTextInvert(body, true);
    expect(body.classList.contains("text-invert")).toBe(true);
    toggleTextInvert(body, false);
    expect(body.classList.contains("text-invert")).toBe(false);
  });
});

describe("setFontScale", () => {
  test("setzt skalierung und aria text", () => {
    const input = createRange("105");
    const root = document.createElement("div");
    const applied = setFontScale(input, root);
    expect(applied).toBe(true);
    expect(root.style.getPropertyValue("--font-scale")).toBe("1.05");
    expect(input.getAttribute("aria-valuetext")).toBe("105 %");
  });

  test("klammert werte", () => {
    const input = createRange("999");
    const root = document.createElement("div");
    setFontScale(input, root);
    expect(root.style.getPropertyValue("--font-scale")).toBe("1.25");
    expect(input.getAttribute("aria-valuetext")).toBe("125 %");
  });
});
