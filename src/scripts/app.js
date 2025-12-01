import { createLogger } from "./logger.js";
import { applyTheme, getDefaultThemeId, populateThemeSelect } from "./themeManager.js";
import { setFontScale, toggleTextInvert } from "./accessibility.js";

function bindThemeSelect(select, logger) {
  if (!populateThemeSelect(select)) {
    logger.error("Themes konnten nicht geladen werden.");
    return;
  }

  const defaultId = getDefaultThemeId();
  select.value = defaultId;
  applyTheme(defaultId);
  logger.info("Start-Theme angewendet.");

  select.addEventListener("change", (event) => {
    const nextId = event.target?.value;
    const applied = applyTheme(nextId);
    if (applied) {
      logger.info(`Theme "${nextId}" aktiv.`);
    } else {
      logger.warn("Theme konnte nicht angewendet werden.");
    }
  });
}

function bindFontSlider(slider, logger) {
  const initialApplied = setFontScale(slider);
  if (initialApplied) {
    logger.info("Schriftgröße initial gesetzt.");
  } else {
    logger.warn("Schriftgröße konnte nicht initialisiert werden.");
  }
  slider.addEventListener("input", () => {
    const success = setFontScale(slider);
    logger.debug(success ? "Schriftgröße aktualisiert." : "Ungültiger Schriftwert.");
  });
}

function bindInvertButton(button, logger) {
  const updateState = (isActive) => {
    button.setAttribute("aria-pressed", String(isActive));
    button.textContent = isActive ? "Schriftfarben normalisieren" : "Schriftfarben invertieren";
    logger.info(isActive ? "Schriftfarben invertiert (nur Text)." : "Schriftfarben normalisiert.");
  };

  const toggle = () => {
    const isActive = toggleTextInvert();
    updateState(isActive);
  };

  button.addEventListener("click", toggle);
  updateState(false);
}

function bindDebugToggle(button, logger) {
  const update = (enabled) => {
    button.setAttribute("aria-pressed", String(enabled));
    button.textContent = enabled ? "Debugging an" : "Debugging aus";
  };

  button.addEventListener("click", () => {
    const enabled = button.getAttribute("aria-pressed") !== "true";
    logger.enableDebug(enabled);
    update(enabled);
  });
  update(false);
}

function init() {
  const logList = document.querySelector("#status-log");
  const logger = createLogger(logList);
  logger.info("Startroutine läuft: prüfe Eingaben und Layout.");

  const select = document.querySelector("#theme-select");
  const fontSlider = document.querySelector("#font-slider");
  const invertToggle = document.querySelector("#invert-toggle");
  const debugToggle = document.querySelector("#debug-toggle");

  bindThemeSelect(select, logger);
  bindFontSlider(fontSlider, logger);
  bindInvertButton(invertToggle, logger);
  bindDebugToggle(debugToggle, logger);
  logger.info("Alle Steuerelemente aktiv.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
