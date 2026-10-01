import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText } from '../ui';

export type MonitoringStatusCardProps = {
  /** Ej. "👁 Seguimiento en casa activo". */
  title: string;
  /** Ej. "Luna 🐕 · Próxima revisión". */
  subtitle?: string;
  /** Etiqueta del recuadro de la derecha, ej. "Revisión". */
  timeLabel?: string;
  /** Ej. "10:30 PM". */
  time?: string;
  onPress?: () => void;
};

/** Tarjeta verde de seguimiento activo (dashboard y guía en casa). */
export function MonitoringStatusCard({
  title,
  subtitle,
  timeLabel = 'Revisión',
  time,
  onPress,
}: MonitoringStatusCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={[title, subtitle, time && `${timeLabel} ${time}`].filter(Boolean).join('. ')}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.dot} />
      <View style={styles.texts}>
        <AppText variant="bodySmall" weight="bold" color={colors.primary}>
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="caption" color={colors.primary}>
            {subtitle}
          </AppText>
        )}
      </View>
      {time && (
        <View style={styles.timeBox}>
          <AppText variant="caption" color={colors.muted} style={styles.timeLabel}>
            {timeLabel}
          </AppText>
          <AppText variant="bodySmall" weight="semibold" color={colors.secondary}>
            {time}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  pressed: { opacity: 0.85 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  texts: { flex: 1, gap: 2 },
  timeBox: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeLabel: { fontSize: 11, lineHeight: 14 },
});
