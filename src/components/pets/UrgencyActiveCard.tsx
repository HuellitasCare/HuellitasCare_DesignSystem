import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Badge, Button } from '../ui';

export type UrgencyActiveCardProps = {
  /** Ej. "Urgencia alta · Luna 🐕". */
  title: string;
  description?: string;
  badgeLabel?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/** Tarjeta oscura del dashboard cuando hay una urgencia alta activa. */
export function UrgencyActiveCard({
  title,
  description,
  badgeLabel = 'Activa',
  actionLabel = 'Llamar al veterinario ahora',
  onAction,
}: UrgencyActiveCardProps) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <View style={styles.header}>
        <View style={styles.dot} />
        <AppText variant="bodySmall" weight="bold" color={colors.white} style={styles.flex}>
          {title}
        </AppText>
        <Badge label={badgeLabel} tone="error" variant="outline" uppercase />
      </View>
      {description && (
        <AppText variant="caption" color={colors.muted}>
          {description}
        </AppText>
      )}
      <Button title={actionLabel} variant="danger" leftIcon="call" fullWidth onPress={onAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.darkDanger,
    borderWidth: 1,
    borderColor: colors.error,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.error },
  flex: { flex: 1 },
});
