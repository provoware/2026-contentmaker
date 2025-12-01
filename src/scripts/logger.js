const MAX_LOG_ITEMS = 60;

export function createLogger(listElement) {
  const list = listElement;
  let debugEnabled = false;

  const pushMessage = (text, level = "info") => {
    if (!list || !(list instanceof HTMLElement)) return false;
    const item = document.createElement("li");
    item.dataset.level = level;
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
