export const theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  radius: {
    sm: 6,
    md: 12,
    lg: 20
  },
  text: {
    title: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "700"
    },
    subtitle: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: "600"
    },
    body: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "400"
    },
    caption: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "400"
    }
  },
  colors: {
    background: "#F7F9FC",
    surface: "#FFFFFF",
    primary: "#1B6DA8",
    primaryMuted: "#D6E7F4",
    accent: "#2BAE9E",
    textPrimary: "#1F2A37",
    textSecondary: "#4B5563",
    border: "#E5E7EB",
    success: "#2E7D32",
    warning: "#B45309",
    danger: "#B91C1C"
  }
} as const;

export type Theme = typeof theme;
