import type { TextStyle } from 'react-native';

/** Nombres de las fuentes Inter cargadas con `useFonts` en App.tsx. */
export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export type FontWeight = keyof typeof fontFamily;

/**
 * Escala tipográfica tomada del frame "Tipografía" del Design System
 * (H1 28 · H2 22 · H3 18 · Body 16 · Caption 13 · Button 16 · Section label 11).
 * `bodySmall` y `label` cubren los tamaños intermedios que usan filas y formularios en las pantallas.
 */
export const typography = {
  h1: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 34 },
  h2: { fontFamily: fontFamily.semibold, fontSize: 22, lineHeight: 28 },
  h3: { fontFamily: fontFamily.semibold, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 22 },
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fontFamily.semibold, fontSize: 13, lineHeight: 18 },
  button: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 20 },
  sectionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
