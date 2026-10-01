import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

export type CheckboxProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  /** Texto o nodo (permite links dentro, ej. "Términos y condiciones"). */
  label?: ReactNode;
  disabled?: boolean;
  accessibilityLabel?: string;
};

export function CheckboxBox({ checked }: { checked: boolean }) {
  return (
    <View style={[styles.box, checked && styles.boxChecked]}>
      {checked && <Icon name="checkmark" size={16} color={colors.white} />}
    </View>
  );
}

export function Checkbox({ checked, onChange, label, disabled = false, accessibilityLabel }: CheckboxProps) {
  return (
    <Pressable
      onPress={() => onChange?.(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel ?? (typeof label === 'string' ? label : undefined)}
      hitSlop={8}
      style={[styles.row, disabled && styles.disabled]}
    >
      <CheckboxBox checked={checked} />
      {typeof label === 'string' ? (
        <AppText variant="bodySmall" color={colors.textSecondary} style={styles.label}>
          {label}
        </AppText>
      ) : (
        label && <View style={styles.label}>{label}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#C4C4C4',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { flex: 1 },
  disabled: { opacity: 0.5 },
});
