import { StyleSheet, View } from 'react-native';

import { colors, spacing, URGENCY_ORDER, urgencyStyles, type UrgencyLevel } from '../../theme';
import { AppText, Card } from '../ui';

const DEFAULT_DESCRIPTIONS: Record<UrgencyLevel, string> = {
  alta: 'Atención inmediata',
  moderada: 'Hoy o mañana',
  baja: 'Monitorear en casa',
};

export type UrgencyScaleProps = {
  /** Nivel resultante; se resalta con la etiqueta "Actual". */
  current: UrgencyLevel;
  descriptions?: Partial<Record<UrgencyLevel, string>>;
  currentLabel?: string;
};

/** Escala Alta / Moderada / Baja con el nivel actual resaltado. */
export function UrgencyScale({ current, descriptions, currentLabel = 'Actual' }: UrgencyScaleProps) {
  return (
    <Card padding={0}>
      {URGENCY_ORDER.map((level, index) => {
        const { label, color, soft, dot } = urgencyStyles[level];
        const isCurrent = level === current;
        const description = descriptions?.[level] ?? DEFAULT_DESCRIPTIONS[level];

        return (
          <View
            key={level}
            style={[styles.row, index > 0 && styles.divider, isCurrent && { backgroundColor: soft }]}
            accessible
            accessibilityLabel={`${label}: ${description}${isCurrent ? `, ${currentLabel}` : ''}`}
            accessibilityState={{ selected: isCurrent }}
          >
            <View style={[styles.dot, { backgroundColor: dot }]} />
            <View style={styles.texts}>
              <AppText variant="bodySmall" weight="bold" color={color} style={styles.uppercase}>
                {label}
              </AppText>
              <AppText variant="caption" color={colors.muted}>
                {description}
              </AppText>
            </View>
            {isCurrent && (
              <AppText variant="caption" weight="semibold" color={color}>
                {currentLabel}
              </AppText>
            )}
          </View>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  dot: { width: 12, height: 12, borderRadius: 6 },
  texts: { flex: 1 },
  uppercase: { textTransform: 'uppercase' },
});
