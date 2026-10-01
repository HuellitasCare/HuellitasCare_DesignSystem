import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, Badge, Button, Card } from '../ui';

export type ReminderCardProps = {
  /** Ej. "Revisar a Luna a las 10:30 PM". */
  title: string;
  subtitle?: string;
  /** Si está activo se muestra el badge "Activado" en lugar del botón. */
  active?: boolean;
  actionLabel?: string;
  onActivate?: () => void;
};

/** Recordatorio programado con botón "Activar". */
export function ReminderCard({
  title,
  subtitle = 'Recordatorio programado',
  active = false,
  actionLabel = 'Activar',
  onActivate,
}: ReminderCardProps) {
  return (
    <Card padding={spacing.md} style={styles.card}>
      <View style={styles.texts}>
        <AppText variant="bodySmall" weight="bold">
          {title}
        </AppText>
        <AppText variant="caption" color={colors.muted}>
          {subtitle}
        </AppText>
      </View>
      {active ? (
        <Badge label="Activado" tone="warning" />
      ) : (
        <Button title={actionLabel} size="sm" onPress={onActivate} accessibilityLabel={`${actionLabel} recordatorio`} />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  texts: { flex: 1, gap: 2 },
});
