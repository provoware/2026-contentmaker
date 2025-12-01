const MAX_LOG_ITEMS = 60;

function formatTime(date = new Date()) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "--:--:--";
  return date.toLocaleTimeString("de-DE", { hour12: false });
}

export function createLogger(listElement) {
  const list = listElement;
  let debugEnabled = false;

  const pushMessage = (text, level = "info") => {
    if (!list || !(list instanceof HTMLElement)) return false;
    const item = document.createElement("li");
    item.dataset.level = level;

    const badge = document.createElement("span");
    badge.className = "log-badge";
    badge.textContent = level.toUpperCase();

    const time = document.createElement("span");
    time.className = "log-time";
    time.textContent = formatTime();

    const message = document.createElement("span");
    message.className = "log-message";
    message.textContent = text;

    item.append(badge, time, message);
    item.textContent = text;
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
