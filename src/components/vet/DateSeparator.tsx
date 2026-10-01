import { StyleSheet } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText } from '../ui';

export type DateSeparatorProps = {
  /** Ej. "Hoy, 18 mayo 2026". */
  label: string;
};

export function DateSeparator({ label }: DateSeparatorProps) {
  return (
    <AppText variant="caption" color={colors.muted} align="center" style={styles.label}>
      {label}
    </AppText>
  );
}

const styles = StyleSheet.create({
  label: { marginVertical: spacing.sm },
});
