import { createLogger } from "./logger.js";
import {
  applyTheme,
  getDefaultThemeId,
  getThemeMeta,
  populateThemeSelect
} from "./themeManager.js";
import { setFontScale, toggleTextInvert } from "./accessibility.js";

function updateThemeSummary(summaryElement, themeId, logger) {
  if (!(summaryElement instanceof HTMLElement)) {
    logger?.warn("Theme-Beschreibung fehlt oder ist ungültig.");
    return false;
  }
  const meta = getThemeMeta(themeId);
  if (!meta) {
    summaryElement.textContent = "Kein gültiges Theme gefunden.";
    summaryElement.dataset.themeId = "";
    logger?.warn("Theme-Beschreibung konnte nicht geladen werden.");
    return false;
  }
  summaryElement.textContent = `${meta.label}: ${meta.description}`;
  summaryElement.dataset.themeId = meta.id;
  return true;
}

function bindThemeSelect(select, summaryElement, logger) {
  if (!(select instanceof HTMLSelectElement)) {
    logger?.error("Theme-Auswahl (Farbschema) fehlt oder ist ungültig.");
    return false;
  }
  if (!populateThemeSelect(select)) {
    logger.error("Themes konnten nicht geladen werden. Bitte Konfiguration prüfen.");
    return false;
  }

  const defaultId = getDefaultThemeId();
  select.value = defaultId;
  const applied = applyTheme(defaultId);
  logger[applied ? "info" : "warn"]("Start-Theme angewendet.");
  updateThemeSummary(summaryElement, defaultId, logger);

  select.addEventListener("change", (event) => {
    const nextId = event.target instanceof HTMLSelectElement ? event.target.value : "";
    const applied = applyTheme(nextId);
    if (applied) {
      logger.info(`Theme "${nextId}" aktiv.`);
    } else {
      logger.warn("Theme konnte nicht angewendet werden.");
    }
    updateThemeSummary(summaryElement, nextId, logger);
  });
  return true;
}

function bindFontSlider(slider, logger) {
  if (!(slider instanceof HTMLInputElement)) {
    logger?.error("Schriftgrößen-Regler fehlt oder ist ungültig.");
    return false;
  }
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
  return true;
}

function bindInvertButton(button, logger) {
  if (!(button instanceof HTMLButtonElement)) {
    logger?.error("Invertieren-Schalter fehlt oder ist ungültig.");
    return false;
  }
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
  return true;
}

function bindDebugToggle(button, logger) {
  if (!(button instanceof HTMLButtonElement)) {
    logger?.error("Debug-Schalter fehlt oder ist ungültig.");
    return false;
  }
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
  return true;
}

function init() {
  const logList = document.querySelector("#status-log");
  const logger = createLogger(logList);
  logger.info("Startroutine läuft: prüfe Eingaben und Layout.");

  const select = document.querySelector("#theme-select");
  const themeSummary = document.querySelector("#theme-summary");
  const fontSlider = document.querySelector("#font-slider");
  const invertToggle = document.querySelector("#invert-toggle");
  const debugToggle = document.querySelector("#debug-toggle");

  const results = [
    bindThemeSelect(select, themeSummary, logger),
    bindFontSlider(fontSlider, logger),
    bindInvertButton(invertToggle, logger),
    bindDebugToggle(debugToggle, logger)
  ];

  if (results.every(Boolean)) {
    logger.info("Alle Steuerelemente aktiv.");
  } else {
    logger.warn("Einige Steuerelemente konnten nicht gebunden werden.");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
