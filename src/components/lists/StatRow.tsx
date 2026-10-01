import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText } from '../ui';

export type StatItem = {
  value: string | number;
  label: string;
  /** Color del número (ej. rojo para alertas, naranja para próxima cita). */
  color?: string;
};

export function StatCard({ value, label, color = colors.text }: StatItem) {
  return (
    <View style={styles.card} accessible accessibilityLabel={`${value} ${label}`}>
      <AppText variant="h2" weight="bold" color={color} align="center">
        {String(value)}
      </AppText>
      <AppText variant="caption" color={colors.muted} align="center">
        {label}
      </AppText>
    </View>
  );
}

export type StatRowProps = {
  items: StatItem[];
};

/** Fila de indicadores: "2 Alertas · 1 Próxima cita · 3 Al día". */
export function StatRow({ items }: StatRowProps) {
  return (
    <View style={styles.row}>
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm },
  card: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
