import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Icon, type IconName } from '../ui';

export type AlertTone = 'success' | 'warning' | 'error';

export type AlertProps = {
  tone: AlertTone;
  title: string;
  message?: string;
  /** Sobrescribe el ícono por defecto del tono. */
  icon?: IconName;
};

const tones: Record<AlertTone, { color: string; soft: string; icon: IconName }> = {
  success: { color: colors.primary, soft: colors.primarySoft, icon: 'checkmark' },
  warning: { color: colors.secondary, soft: colors.secondarySoft, icon: 'warning' },
  error: { color: colors.error, soft: colors.errorSoft, icon: 'close' },
};

/** Banner con borde izquierdo: "Cambios guardados correctamente", "Algo salió mal". */
export function Alert({ tone, title, message, icon }: AlertProps) {
  const { color, soft, icon: defaultIcon } = tones[tone];

  return (
    <View
      style={[styles.container, { backgroundColor: soft, borderLeftColor: color }]}
      accessibilityRole="alert"
    >
      <View style={styles.titleRow}>
        <Icon name={icon ?? defaultIcon} size={18} color={color} />
        <AppText variant="bodySmall" weight="semibold" color={color} style={styles.flex}>
          {title}
        </AppText>
      </View>
      {message && (
        <AppText variant="caption" color={color} style={styles.message}>
          {message}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  flex: { flex: 1 },
  message: { marginLeft: 26 },
});
