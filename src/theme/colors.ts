/**
 * Paleta del Design System de HuellitasCare (Figma → Design System → Colores).
 * Los tonos "Soft" son los fondos tenues que usan alertas, badges y estados seleccionados en las pantallas.
 */
export const colors = {
  primary: '#2E7D32',
  primaryLight: '#66BB6A',
  primarySoft: '#E8F5E9',

  secondary: '#F57C00',
  secondaryLight: '#FFCC80',
  secondarySoft: '#FFF3E0',

  error: '#D32F2F',
  errorSoft: '#FDECEA',
  warning: '#F9A825',
  warningSoft: '#FFF8E1',
  success: '#388E3C',
  successSoft: '#E8F5E9',

  background: '#F4F4F4',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B6B6B',
  muted: '#A0A0A0',
  border: '#E0E0E0',
  placeholder: '#D9D9D9',

  dark: '#1A1A1A',
  darkDanger: '#2A1212',
  white: '#FFFFFF',
  whiteTranslucent: 'rgba(255, 255, 255, 0.2)',
} as const;

export type ColorName = keyof typeof colors;
