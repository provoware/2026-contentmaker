const MAX_LOG_ITEMS = 60;
const VALID_LEVELS = new Set(["info", "warn", "error", "debug", "status"]);

function formatTime(date = new Date()) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "--:--:--";
  return date.toLocaleTimeString("de-DE", { hour12: false });
}

function normalizeMessage(message) {
  if (typeof message === "string" && message.trim().length > 0) {
    return message.trim();
  }
  if (message === null || message === undefined) {
    return "Unbekannte Meldung";
  }
  return String(message);
}

function normalizeLevel(level) {
  if (VALID_LEVELS.has(level)) return level;
  return "info";
}

export function createLogger(listElement) {
  const list = listElement;
  let debugEnabled = false;

  const pushMessage = (text, level = "info") => {
    if (!list || !(list instanceof HTMLElement)) return false;
    const messageText = normalizeMessage(text);
    const safeLevel = normalizeLevel(level);
    const item = document.createElement("li");
    item.dataset.level = safeLevel;

    const badge = document.createElement("span");
    badge.className = "log-badge";
    badge.textContent = safeLevel.toUpperCase();

    const time = document.createElement("span");
    time.className = "log-time";
    time.textContent = formatTime();

    const message = document.createElement("span");
    message.className = "log-message";
    message.textContent = messageText;

    item.append(badge, time, message);
    list.prepend(item);

    while (list.childElementCount > MAX_LOG_ITEMS) {
      list.removeChild(list.lastElementChild);
    }
    return true;
  };

  return {
    enableDebug(isEnabled) {
      debugEnabled = Boolean(isEnabled);
      pushMessage(`Debug-Modus ${debugEnabled ? "aktiv" : "inaktiv"}.`, "status");
      return debugEnabled;
    },
    info(message) {
      return pushMessage(message, "info");
    },
    warn(message) {
      return pushMessage(message, "warn");
    },
    error(message) {
      return pushMessage(message, "error");
    },
    debug(message) {
      if (!debugEnabled) return false;
      return pushMessage(message, "debug");
    }
  };
}
