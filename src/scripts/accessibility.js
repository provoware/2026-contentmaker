export function setFontScale(rangeInput, target = document.documentElement) {
  if (!(rangeInput instanceof HTMLInputElement)) return false;
  if (!(target instanceof HTMLElement)) return false;

  const numericValue = Number.parseInt(rangeInput.value, 10);
  if (Number.isNaN(numericValue)) return false;
  const clamped = Math.min(125, Math.max(90, numericValue));
  const scale = (clamped / 100).toFixed(2);
  target.style.setProperty("--font-scale", scale);
  rangeInput.setAttribute("aria-valuenow", String(clamped));
  rangeInput.setAttribute("aria-valuetext", `${clamped} %`);
  return true;
}

export function toggleTextInvert(body = document.body, shouldEnable) {
  if (!(body instanceof HTMLElement)) return false;
  const enable =
    typeof shouldEnable === "boolean" ? shouldEnable : !body.classList.contains("text-invert");
  body.classList.toggle("text-invert", enable);
  return body.classList.contains("text-invert");
}
