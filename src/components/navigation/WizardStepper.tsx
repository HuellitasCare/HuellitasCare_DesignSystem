import { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { colors, fontFamily, radius, spacing } from '../../theme';
import { AppText, Icon } from '../ui';

export type WizardStepperProps = {
  /** Ej. ["Síntomas", "Resultado", "Acción", "Monitor", "Guardar"]. */
  steps: string[];
  /** Índice (base 0) del paso actual. */
  currentIndex: number;
  /** En el Figma solo se muestran los pasos ya alcanzados; actívalo para ver también los siguientes en gris. */
  showUpcoming?: boolean;
};

/** Indicador de pasos del evaluador de urgencia: "✓ Síntomas — ✓ Resultado — 3 Acción". */
export function WizardStepper({ steps, currentIndex, showUpcoming = false }: WizardStepperProps) {
  const visible = showUpcoming ? steps : steps.slice(0, currentIndex + 1);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      accessibilityLabel={`Paso ${currentIndex + 1} de ${steps.length}: ${steps[currentIndex]}`}
    >
      {visible.map((step, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;
        const upcoming = index > currentIndex;

        return (
          <Fragment key={`${index}-${step}`}>
            {index > 0 && <View style={[styles.connector, upcoming && styles.connectorUpcoming]} />}
            <View style={[styles.pill, current && styles.pillCurrent, upcoming && styles.pillUpcoming]}>
              {done ? (
                <Icon name="checkmark" size={12} color={colors.white} />
              ) : (
                <AppText variant="caption" color={upcoming ? colors.muted : colors.white} style={styles.text}>
                  {index + 1}
                </AppText>
              )}
              <AppText variant="caption" color={upcoming ? colors.muted : colors.white} style={styles.text}>
                {step}
              </AppText>
            </View>
          </Fragment>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.xs },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  pillCurrent: { borderColor: colors.primarySoft },
  pillUpcoming: { backgroundColor: colors.background, borderColor: colors.border },
  text: { fontSize: 11, lineHeight: 14, fontFamily: fontFamily.semibold },
  connector: { width: 12, height: 2, backgroundColor: colors.primary },
  connectorUpcoming: { backgroundColor: colors.border },
});
