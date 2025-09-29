import type { FormTheme } from "../types/form-builder"

export const defaultThemes: FormTheme[] = [
  {
    id: "modern-purple",
    name: "Modern Purple",
    colors: {
      primary: "oklch(0.55 0.18 264)",
      secondary: "oklch(0.96 0.01 264)",
      background: "oklch(0.98 0.005 264)",
      foreground: "oklch(0.15 0.02 264)",
      accent: "oklch(0.94 0.02 264)",
      border: "oklch(0.92 0.01 264)",
    },
    typography: {
      fontFamily: "font-sans",
      headingSize: "text-2xl",
      bodySize: "text-base",
      labelSize: "text-sm",
    },
    spacing: {
      fieldGap: "gap-6",
      padding: "p-6",
      borderRadius: "rounded-lg",
    },
  },
  {
    id: "clean-blue",
    name: "Clean Blue",
    colors: {
      primary: "oklch(0.5 0.2 220)",
      secondary: "oklch(0.96 0.01 220)",
      background: "oklch(0.99 0.002 220)",
      foreground: "oklch(0.15 0.02 220)",
      accent: "oklch(0.94 0.02 220)",
      border: "oklch(0.92 0.01 220)",
    },
    typography: {
      fontFamily: "font-sans",
      headingSize: "text-xl",
      bodySize: "text-base",
      labelSize: "text-sm",
    },
    spacing: {
      fieldGap: "gap-4",
      padding: "p-4",
      borderRadius: "rounded-md",
    },
  },
  {
    id: "minimal-gray",
    name: "Minimal Gray",
    colors: {
      primary: "oklch(0.3 0.02 0)",
      secondary: "oklch(0.97 0.005 0)",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.15 0.01 0)",
      accent: "oklch(0.95 0.005 0)",
      border: "oklch(0.9 0.005 0)",
    },
    typography: {
      fontFamily: "font-sans",
      headingSize: "text-xl",
      bodySize: "text-sm",
      labelSize: "text-xs",
    },
    spacing: {
      fieldGap: "gap-3",
      padding: "p-3",
      borderRadius: "rounded",
    },
  },
  {
    id: "vibrant-orange",
    name: "Vibrant Orange",
    colors: {
      primary: "oklch(0.65 0.22 45)",
      secondary: "oklch(0.97 0.01 45)",
      background: "oklch(0.99 0.005 45)",
      foreground: "oklch(0.15 0.02 45)",
      accent: "oklch(0.95 0.02 45)",
      border: "oklch(0.92 0.01 45)",
    },
    typography: {
      fontFamily: "font-sans",
      headingSize: "text-2xl",
      bodySize: "text-base",
      labelSize: "text-sm",
    },
    spacing: {
      fieldGap: "gap-5",
      padding: "p-5",
      borderRadius: "rounded-lg",
    },
  },
  {
    id: "dark-professional",
    name: "Dark Professional",
    colors: {
      primary: "oklch(0.7 0.15 200)",
      secondary: "oklch(0.2 0.01 200)",
      background: "oklch(0.1 0.01 200)",
      foreground: "oklch(0.95 0.005 200)",
      accent: "oklch(0.25 0.02 200)",
      border: "oklch(0.3 0.02 200)",
    },
    typography: {
      fontFamily: "font-sans",
      headingSize: "text-xl",
      bodySize: "text-base",
      labelSize: "text-sm",
    },
    spacing: {
      fieldGap: "gap-4",
      padding: "p-4",
      borderRadius: "rounded-md",
    },
  },
]

export const getThemeById = (id: string): FormTheme => {
  return defaultThemes.find((theme) => theme.id === id) || defaultThemes[0]
}

export const createCustomTheme = (name: string, baseTheme?: FormTheme): FormTheme => {
  const base = baseTheme || defaultThemes[0]
  return {
    ...base,
    id: `custom-${Date.now()}`,
    name,
  }
}

export const exportTheme = (theme: FormTheme): string => {
  return JSON.stringify(theme, null, 2)
}

export const importTheme = (themeJson: string): FormTheme | null => {
  try {
    const theme = JSON.parse(themeJson)
    // Validate theme structure
    if (theme.id && theme.name && theme.colors && theme.typography && theme.spacing) {
      return theme
    }
    return null
  } catch {
    return null
  }
}

export const generateThemeCSS = (theme: FormTheme): string => {
  return `
    .form-theme-${theme.id} {
      --form-primary: ${theme.colors.primary};
      --form-secondary: ${theme.colors.secondary};
      --form-background: ${theme.colors.background};
      --form-foreground: ${theme.colors.foreground};
      --form-accent: ${theme.colors.accent};
      --form-border: ${theme.colors.border};
    }
  `
}
