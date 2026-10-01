import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, Icon, type IconName } from '../ui';

export type SuccessStateProps = {
  title: string;
  subtitle?: string;
  icon?: IconName;
};

/** Confirmación centrada: "Síntoma registrado", "Recordatorio configurado", "Acción completada". */
export function SuccessState({ title, subtitle, icon = 'checkmark' }: SuccessStateProps) {
  return (
    <View style={styles.container} accessibilityRole="summary">
      <View style={styles.circle}>
        <Icon name={icon} size={28} color={colors.primary} />
      </View>
      <AppText variant="h3" weight="bold" align="center">
        {title}
      </AppText>
      {subtitle && (
        <AppText variant="caption" color={colors.muted} align="center">
          {subtitle}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.lg },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
});
