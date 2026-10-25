import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';
import type { TextFieldVariant } from './TextField';

export type SelectFieldProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  error?: string;
  disabled?: boolean;
  variant?: TextFieldVariant;
};

export function SelectField({
  label,
  value,
  placeholder = 'Selecciona una opción',
  onPress,
  error,
  disabled = false,
  variant = 'filled',
}: SelectFieldProps) {
  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      {label && (
        <AppText variant="label" color={colors.textSecondary}>
          {label}
        </AppText>
      )}
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label ? `${label}: ${value ?? placeholder}` : value ?? placeholder}
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.field,
          variant === 'filled' ? styles.filled : styles.outlined,
          hasError && styles.error,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        <AppText color={value ? colors.text : colors.muted} style={styles.value} numberOfLines={1}>
          {value ?? placeholder}
        </AppText>
        <Icon name="chevron-down" size={18} color={colors.textSecondary} />
      </Pressable>
      {error && (
        <AppText variant="caption" color={colors.error}>
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 54,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  filled: { backgroundColor: '#F1F6F3', borderColor: '#E1EBE4' },
  outlined: { backgroundColor: colors.glass, borderColor: colors.glassBorder },
  error: { borderColor: colors.error, backgroundColor: colors.errorSoft },
  pressed: { borderColor: colors.primary },
  disabled: { opacity: 0.6 },
  value: { flex: 1 },
});
