import type { ViewStyle } from 'react-native';

export const shadows = {
  soft: { boxShadow: '0 8px 28px rgba(38, 79, 60, 0.065)' },
  raised: { boxShadow: '0 12px 38px rgba(31, 75, 56, 0.11), 0 2px 6px rgba(31, 75, 56, 0.035)' },
  button: { boxShadow: '0 6px 14px rgba(35, 117, 95, 0.18)' },
} as const satisfies Record<string, ViewStyle>;
