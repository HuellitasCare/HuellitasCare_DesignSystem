import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, Badge, type BadgeTone } from '../ui';

export type SymptomSeverity = 'leve' | 'moderado' | 'grave';

const severityBadge: Record<SymptomSeverity, { label: string; tone: BadgeTone }> = {
  leve: { label: 'Leve', tone: 'success' },
  moderado: { label: 'Moderado', tone: 'warning' },
  grave: { label: 'Grave', tone: 'error' },
};

export type SymptomRecordRowProps = {
  /** Ej. "8 mayo 2026". */
  date: string;
  /** Ej. "Vómito + Letargo". */
  title: string;
  /** Ej. "Luna 🐕". */
  petName: string;
  severity: SymptomSeverity;
  onPress?: () => void;
};

/** Registro del historial de síntomas. Úsalo dentro de `ListGroup`. */
export function SymptomRecordRow({ date, title, petName, severity, onPress }: SymptomRecordRowProps) {
  const badge = severityBadge[severity];

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${title}, ${petName}, ${date}, severidad ${badge.label}`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.timeline} />
      <View style={styles.texts}>
        <AppText variant="caption" color={colors.muted} style={styles.date}>
          {date}
        </AppText>
        <AppText variant="bodySmall" weight="semibold">
          {title}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {petName}
        </AppText>
      </View>
      <Badge label={badge.label} tone={badge.tone} uppercase />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  pressed: { backgroundColor: colors.background },
  timeline: { width: 2, alignSelf: 'stretch', backgroundColor: colors.border, borderRadius: 1 },
  texts: { flex: 1, gap: 1 },
  date: { fontSize: 11, lineHeight: 14 },
});
