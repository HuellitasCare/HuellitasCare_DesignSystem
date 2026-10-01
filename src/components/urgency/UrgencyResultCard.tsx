import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing, urgencyStyles, type UrgencyLevel } from '../../theme';
import { AppText } from '../ui';

export type UrgencyResultCardProps = {
  level: UrgencyLevel;
  /** Por defecto "URGENCIA ALTA", "URGENCIA MODERADA", etc. */
  title?: string;
  description: string;
};

/** Resultado del evaluador: círculo de color grande + nivel + recomendación. */
export function UrgencyResultCard({ level, title, description }: UrgencyResultCardProps) {
  const { label, color, soft, dot } = urgencyStyles[level];

  return (
    <View
      style={[styles.container, { backgroundColor: soft, borderColor: color }]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`${title ?? `Urgencia ${label}`}. ${description}`}
    >
      <View style={[styles.indicator, { backgroundColor: dot }]} />
      <AppText variant="h3" weight="bold" color={color} align="center" style={styles.title}>
        {title ?? `Urgencia ${label}`}
      </AppText>
      <AppText variant="caption" color={colors.textSecondary} align="center">
        {description}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1.5,
  },
  indicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  title: { textTransform: 'uppercase' },
});
