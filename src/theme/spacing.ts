export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/** Botones e inputs usan `md` (12), cards `lg` (16) y chips/badges `pill`. */
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

/** Área táctil mínima recomendada (iOS HIG / Material). */
export const MIN_TOUCH_SIZE = 44;
