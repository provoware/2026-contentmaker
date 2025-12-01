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
  }
];

export function getThemeById(id) {
  if (typeof id !== "string") return null;
  return themes.find((theme) => theme.id === id) ?? null;
}
