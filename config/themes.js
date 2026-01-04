export const themes = [
  {
    id: "focus",
    label: "Fokus (hoher Kontrast)",
    description: "Kontraststark für konzentriertes Arbeiten.",
    colors: {
      background: "#0b1120",
      surface: "#111827",
      text: "#f8fafc",
      textInvert: "#0b1120",
      accent: "#22c55e",
      border: "#22c55e",
      muted: "#cbd5e1"
    }
  },
  {
    id: "calm",
    label: "Beruhigt",
    description: "Angenehm weich mit guter Lesbarkeit.",
    colors: {
      background: "#0f172a",
      surface: "#1e293b",
      text: "#e2e8f0",
      textInvert: "#0f172a",
      accent: "#38bdf8",
      border: "#38bdf8",
      muted: "#cbd5e1"
    }
  },
  {
    id: "paper",
    label: "Papier",
    description: "Helles Thema mit klarer Schrift.",
    colors: {
      background: "#f5f5f0",
      surface: "#ffffff",
      text: "#0f172a",
      textInvert: "#ffffff",
      accent: "#e11d48",
      border: "#0ea5e9",
      muted: "#475569"
    }
  },
  {
    id: "contrast",
    label: "Kontrast Plus",
    description: "Maximaler Kontrast für starke Sichtbarkeit.",
    colors: {
      background: "#000000",
      surface: "#111111",
      text: "#ffffff",
      textInvert: "#000000",
      accent: "#ffd400",
      border: "#ffd400",
      muted: "#e5e7eb"
    }
  },
  {
    id: "forest",
    label: "Waldlicht",
    description: "Dunkelgrün mit ruhigem Akzent.",
    colors: {
      background: "#041f1a",
      surface: "#0b2f24",
      text: "#f8fafc",
      textInvert: "#041f1a",
      accent: "#34d399",
      border: "#34d399",
      muted: "#d1fae5"
    }
  }
];

export function getThemeById(id) {
  if (typeof id !== "string") return null;
  return themes.find((theme) => theme.id === id) ?? null;
}
