import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText } from './AppText';

export type ProgressBarProps = {
  /** Valor entre 0 y 1. */
  progress: number;
  /** Texto a la derecha, ej. "3 / 5 preguntas". */
  label?: string;
  color?: string;
  height?: number;
  accessibilityLabel?: string;
};

export function ProgressBar({
  progress,
  label,
  color = colors.primary,
  height = 8,
  accessibilityLabel,
}: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <View
      style={styles.row}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
    >
      <View style={[styles.track, { height, borderRadius: height / 2 }]}>
        <View
          style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: color, borderRadius: height / 2 }]}
        />
      </View>
      {label && (
        <AppText variant="caption" color={colors.textSecondary}>
          {label}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  track: { flex: 1, backgroundColor: colors.border, overflow: 'hidden', borderRadius: radius.pill },
  fill: { height: '100%' },
});
