import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText } from '../ui';

export type NotificationPreviewProps = {
  title: string;
  body: string;
  /** Ej. "10:20 PM". */
  time?: string;
  appName?: string;
};

/** Vista previa de una notificación push (confirmación de recordatorio). */
export function NotificationPreview({ title, body, time, appName = 'Huellitas Care' }: NotificationPreviewProps) {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={`Notificación de ${appName}: ${title}. ${body}`}
    >
      <View style={styles.header}>
        <AppText variant="caption" weight="bold" style={styles.flex}>
          🐾 {appName}
        </AppText>
        {time && (
          <AppText variant="caption" color={colors.muted}>
            {time}
          </AppText>
        )}
      </View>
      <AppText variant="bodySmall" weight="bold">
        {title}
      </AppText>
      <AppText variant="caption" color={colors.textSecondary}>
        {body}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 2 },
  flex: { flex: 1 },
});
