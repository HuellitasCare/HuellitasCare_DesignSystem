import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, Card } from '../ui';

export type KeyValueItem = {
  label: string;
  /** Texto o nodo (ej. chips de síntomas, badge "Moderada"). */
  value: ReactNode;
};

export type KeyValueListProps = {
  items: KeyValueItem[];
};

/** Tabla de datos: Especie / Perro, Raza / Golden Retriever, resumen de registros. */
export function KeyValueList({ items }: KeyValueListProps) {
  return (
    <Card padding={0}>
      {items.map((item, index) => (
        <View
          key={item.label}
          style={[styles.row, index > 0 && styles.divider]}
          accessible
          accessibilityLabel={typeof item.value === 'string' ? `${item.label}: ${item.value}` : item.label}
        >
          <AppText variant="caption" color={colors.muted}>
            {item.label}
          </AppText>
          <View style={styles.value}>
            {typeof item.value === 'string' || typeof item.value === 'number' ? (
              <AppText variant="bodySmall" weight="semibold" align="right">
                {item.value}
              </AppText>
            ) : (
              item.value
            )}
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
    minHeight: 44,
  },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  value: { flexShrink: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.xs },
});
