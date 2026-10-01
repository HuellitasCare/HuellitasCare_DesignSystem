import { StyleSheet, View } from 'react-native';

import { radius, spacing, urgencyStyles, type UrgencyLevel } from '../../theme';
import { AppText } from '../ui';

export type UrgencyBannerProps = {
  level: UrgencyLevel;
  /** Por defecto "URGENCIA ALTA", "URGENCIA MODERADA", etc. */
  title?: string;
  description: string;
};

export function UrgencyBanner({ level, title, description }: UrgencyBannerProps) {
  const { label, color, soft, dot } = urgencyStyles[level];

  return (
    <View
      style={[styles.container, { backgroundColor: soft, borderLeftColor: color }]}
      accessibilityRole="alert"
    >
      <View style={styles.titleRow}>
        <View style={[styles.dot, { backgroundColor: dot }]} />
        <AppText variant="label" weight="bold" color={color} style={styles.title}>
          {title ?? `Urgencia ${label}`}
        </AppText>
      </View>
      <AppText variant="bodySmall" weight="semibold" color={color}>
        {description}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.xxs,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 2 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  title: { textTransform: 'uppercase' },
});
