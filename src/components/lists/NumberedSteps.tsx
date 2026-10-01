import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, Card } from '../ui';

export type NumberedStep = {
  title: string;
  description?: string;
};

export type NumberedStepsProps = {
  steps: NumberedStep[];
};

/** Instrucciones numeradas de un artículo, ej. "Cómo medir la temperatura". */
export function NumberedSteps({ steps }: NumberedStepsProps) {
  return (
    <Card padding={0}>
      {steps.map((step, index) => (
        <View key={`${index}-${step.title}`} style={[styles.row, index > 0 && styles.divider]}>
          <View style={styles.number}>
            <AppText variant="caption" weight="bold" color={colors.white}>
              {index + 1}
            </AppText>
          </View>
          <View style={styles.texts}>
            <AppText variant="bodySmall" weight="semibold">
              {step.title}
            </AppText>
            {step.description && (
              <AppText variant="caption" color={colors.textSecondary}>
                {step.description}
              </AppText>
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
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
  },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  number: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { flex: 1, gap: 2 },
});
