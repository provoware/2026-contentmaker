import { getThemeById, themes } from "../../config/themes.js";

const REQUIRED_THEME_KEYS = [
  "background",
  "surface",
  "text",
  "textInvert",
  "accent",
  "border",
  "muted"
];

function isValidTheme(theme) {
  if (!theme || typeof theme !== "object") return false;
  return REQUIRED_THEME_KEYS.every((key) => typeof theme.colors?.[key] === "string");
}

export function getValidThemes() {
  return themes.filter((theme) => isValidTheme(theme));
}

export function getThemeMeta(themeId) {
  const theme = typeof themeId === "string" ? getThemeById(themeId) : null;
  if (!isValidTheme(theme)) return null;
  return { id: theme.id, label: theme.label, description: theme.description };
}

export function applyTheme(themeId, target = document.documentElement) {
  const theme = typeof themeId === "string" ? getThemeById(themeId) : null;
  if (!isValidTheme(theme)) return false;
  if (!(target instanceof HTMLElement)) return false;

  Object.entries(theme.colors).forEach(([token, value]) => {
    target.style.setProperty(`--color-${token}`, value);
  });
  target.style.setProperty("--color-text-active", theme.colors.text);
  return true;
}

export function populateThemeSelect(selectElement) {
  if (!(selectElement instanceof HTMLSelectElement)) return false;
  selectElement.replaceChildren();

  const validThemes = getValidThemes();
  if (validThemes.length === 0) return false;

  validThemes.forEach((theme) => {
    const option = document.createElement("option");
    option.value = theme.id;
    option.textContent = `${theme.label} – ${theme.description}`;
    option.dataset.description = theme.description;
    selectElement.appendChild(option);
  });

  return selectElement.childElementCount === validThemes.length;
}

export function getDefaultThemeId() {
  return themes[0]?.id ?? "focus";
}
