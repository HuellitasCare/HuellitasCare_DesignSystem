import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, Card, Icon } from '../ui';

export type StepStatus = 'completed' | 'active' | 'pending';

export type StepListItem = {
  label: string;
  status: StepStatus;
};

export type StepListProps = {
  steps: StepListItem[];
};

const statusLabel: Record<StepStatus, string> = {
  completed: 'completado',
  active: 'actual',
  pending: 'pendiente',
};

/** Lista de pasos con estado: completado (tachado), activo y pendiente. */
export function StepList({ steps }: StepListProps) {
  return (
    <Card padding={0}>
      {steps.map((step, index) => (
        <View
          key={`${index}-${step.label}`}
          style={[styles.row, index > 0 && styles.divider]}
          accessible
          accessibilityLabel={`Paso ${index + 1}, ${step.label}, ${statusLabel[step.status]}`}
        >
          <View
            style={[
              styles.circle,
              step.status === 'completed' && styles.completed,
              step.status === 'active' && styles.active,
              step.status === 'pending' && styles.pending,
            ]}
          >
            {step.status === 'completed' ? (
              <Icon name="checkmark" size={14} color={colors.white} />
            ) : (
              <AppText
                variant="caption"
                weight="bold"
                color={step.status === 'active' ? colors.white : colors.muted}
              >
                {index + 1}
              </AppText>
            )}
          </View>
          <AppText
            variant="bodySmall"
            color={step.status === 'active' ? colors.text : colors.muted}
            style={step.status === 'completed' && styles.strike}
          >
            {step.label}
          </AppText>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
  },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  circle: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  completed: { backgroundColor: colors.primary },
  active: { backgroundColor: colors.dark },
  pending: { backgroundColor: colors.border },
  strike: { textDecorationLine: 'line-through' },
});
