import { tokens } from './tokens'

export const theme = {
  light: {
    background: {
      primary: '#ffffff',
      secondary: tokens.colors.secondary[50],
      tertiary: tokens.colors.secondary[100],
    },
    foreground: {
      primary: tokens.colors.secondary[900],
      secondary: tokens.colors.secondary[700],
      tertiary: tokens.colors.secondary[500],
    },
    border: {
      primary: tokens.colors.secondary[200],
      secondary: tokens.colors.secondary[300],
    },
    accent: {
      primary: tokens.colors.primary[500],
      secondary: tokens.colors.primary[600],
      hover: tokens.colors.primary[600],
      active: tokens.colors.primary[700],
    },
    status: {
      success: tokens.colors.success[500],
      warning: tokens.colors.warning[500],
      error: tokens.colors.error[500],
    },
  },
  dark: {
    background: {
      primary: tokens.colors.secondary[950],
      secondary: tokens.colors.secondary[900],
      tertiary: tokens.colors.secondary[800],
    },
    foreground: {
      primary: tokens.colors.secondary[50],
      secondary: tokens.colors.secondary[200],
      tertiary: tokens.colors.secondary[400],
    },
    border: {
      primary: tokens.colors.secondary[800],
      secondary: tokens.colors.secondary[700],
    },
    accent: {
      primary: tokens.colors.primary[400],
      secondary: tokens.colors.primary[500],
      hover: tokens.colors.primary[500],
      active: tokens.colors.primary[600],
    },
    status: {
      success: tokens.colors.success[400],
      warning: tokens.colors.warning[400],
      error: tokens.colors.error[400],
    },
  },
} as const

export type ThemeMode = keyof typeof theme
export type ThemeColors = typeof theme.light
