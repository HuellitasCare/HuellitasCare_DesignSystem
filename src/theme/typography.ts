import type { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export type FontWeight = keyof typeof fontFamily;

export const typography = {
  h1: { fontFamily: fontFamily.bold, fontSize: 30, lineHeight: 37, letterSpacing: -1.1 },
  h2: { fontFamily: fontFamily.semibold, fontSize: 23, lineHeight: 30, letterSpacing: -0.65 },
  h3: { fontFamily: fontFamily.semibold, fontSize: 18, lineHeight: 25, letterSpacing: -0.3 },
  body: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24, letterSpacing: -0.15 },
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 21, letterSpacing: -0.1 },
  caption: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fontFamily.semibold, fontSize: 13, lineHeight: 18 },
  button: { fontFamily: fontFamily.semibold, fontSize: 15, lineHeight: 21, letterSpacing: -0.15 },
  sectionLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
