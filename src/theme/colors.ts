export const colors = {
  primary: '#23755F',
  primaryLight: '#72B7A0',
  primarySoft: '#E1F0E8',

  secondary: '#A25422',
  secondaryLight: '#E9B48E',
  secondarySoft: '#FBEEE3',

  error: '#B23F4D',
  errorSoft: '#FAECEE',
  warning: '#8A6116',
  warningSoft: '#FBF4E2',
  success: '#28765A',
  successSoft: '#E1F0E8',

  background: '#F0F6F3',
  surface: '#FFFFFF',
  text: '#183D34',
  textSecondary: '#566F64',
  muted: '#5A7066',
  border: '#DDE8E1',
  placeholder: '#D8E5DD',

  dark: '#183F35',
  darkDanger: '#4D2930',
  white: '#FFFFFF',
  whiteTranslucent: 'rgba(255, 255, 255, 0.18)',
  glass: 'rgba(255, 255, 255, 0.74)',
  glassSoft: 'rgba(239, 248, 242, 0.78)',
  glassBorder: 'rgba(255, 255, 255, 0.94)',
} as const;

export type ColorName = keyof typeof colors;
