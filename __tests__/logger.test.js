import { jest } from "@jest/globals";
import { createLogger } from "../src/scripts/logger.js";

describe("createLogger", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01T12:34:56Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("gibt false zurück, wenn keine Liste vorhanden ist", () => {
    const logger = createLogger(null);
    expect(logger.info("test")).toBe(false);
  });

  test("erstellt strukturierte, farbcodierte Einträge mit Zeitstempel", () => {
    const list = document.createElement("ul");
    const logger = createLogger(list);

    logger.info("Bereit");

    expect(list.childElementCount).toBe(1);
    const item = list.firstElementChild;
    expect(item.dataset.level).toBe("info");
    expect(item.querySelector(".log-badge").textContent).toBe("INFO");
    expect(item.querySelector(".log-time").textContent).toMatch(/\d{2}:\d{2}:\d{2}/);
    expect(item.querySelector(".log-message").textContent).toBe("Bereit");
  });

  test("begrenzt die Log-Länge und respektiert Debug-Schalter", () => {
    const list = document.createElement("ul");
    const logger = createLogger(list);

    logger.debug("unsichtbar");
    expect(list.childElementCount).toBe(0);

    logger.enableDebug(true);
    logger.debug("sichtbar");

    expect(list.firstElementChild.dataset.level).toBe("debug");
    expect(list.lastElementChild.dataset.level).toBe("status");

    Array.from({ length: 70 }).forEach((_, index) => {
      logger.info(`eintrag ${index}`);
    });
    expect(list.childElementCount).toBe(60);
  });

  test("normalisiert Meldungen und Level", () => {
    const list = document.createElement("ul");
    const logger = createLogger(list);

    logger.info({ text: "objekt" });

    const item = list.firstElementChild;
    expect(item.dataset.level).toBe("info");
    expect(item.querySelector(".log-message").textContent).toBe("[object Object]");
  });
});
