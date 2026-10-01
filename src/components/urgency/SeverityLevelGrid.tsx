import { StyleSheet, View } from 'react-native';

import { radius, spacing, urgencyStyles, type UrgencyLevel } from '../../theme';
import { AppText } from '../ui';

export type SeverityLevelItem = {
  level: UrgencyLevel;
  /** Ej. "Leve", "Moderada", "Severa". */
  title: string;
  description: string;
};

export type SeverityLevelGridProps = {
  items: SeverityLevelItem[];
};

/** Columnas de niveles de gravedad de un artículo (ej. prueba del pellizco de piel). */
export function SeverityLevelGrid({ items }: SeverityLevelGridProps) {
  return (
    <View style={styles.row}>
      {items.map((item) => {
        const { color, soft } = urgencyStyles[item.level];
        return (
          <View
            key={item.level}
            style={[styles.cell, { backgroundColor: soft }]}
            accessible
            accessibilityLabel={`${item.title}: ${item.description}`}
          >
            <AppText variant="caption" weight="bold" color={color} align="center" style={styles.title}>
              {item.title}
            </AppText>
            <AppText variant="caption" color={color} align="center">
              {item.description}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm },
  cell: {
    flex: 1,
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  title: { textTransform: 'uppercase' },
});
