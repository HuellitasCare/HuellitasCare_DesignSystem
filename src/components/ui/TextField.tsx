import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, fontFamily, radius, spacing, typography } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

export type TextFieldVariant =
  /** Fondo gris: dentro de cards blancas (registro, formularios). */
  | 'filled'
  /** Fondo blanco: sobre el fondo gris de pantalla (login). */
  | 'outlined';

export type TextFieldProps = Omit<TextInputProps, 'style' | 'editable'> & {
  label?: string;
  /** Mensaje de error. Si existe, el campo se pinta en estado de error. */
  error?: string;
  helperText?: string;
  /** Campo de contraseña con botón para mostrar/ocultar. */
  password?: boolean;
  disabled?: boolean;
  variant?: TextFieldVariant;
};

export function TextField({
  label,
  error,
  helperText,
  password = false,
  disabled = false,
  variant = 'filled',
  multiline,
  onFocus,
  onBlur,
  ...inputProps
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      {label && (
        <AppText variant="label" color={colors.textSecondary}>
          {label}
        </AppText>
      )}
      <View
        style={[
          styles.field,
          variant === 'filled' ? styles.filled : styles.outlined,
          multiline && styles.multiline,
          focused && styles.focused,
          hasError && styles.error,
          disabled && styles.disabled,
        ]}
      >
        <TextInput
          {...inputProps}
          multiline={multiline}
          editable={!disabled}
          secureTextEntry={password && hidden}
          placeholderTextColor={colors.muted}
          accessibilityLabel={inputProps.accessibilityLabel ?? label}
          accessibilityState={{ disabled }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, multiline && styles.inputMultiline, disabled && styles.inputDisabled]}
        />
        {password && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Mostrar contraseña' : 'Ocultar contraseña'}
            hitSlop={12}
          >
            <Icon name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>
      {(error || helperText) && (
        <AppText variant="caption" color={hasError ? colors.error : colors.textSecondary}>
          {error ?? helperText}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs + 2 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  filled: { backgroundColor: colors.background, borderColor: colors.border },
  outlined: { backgroundColor: colors.surface, borderColor: colors.border },
  multiline: { minHeight: 96, alignItems: 'flex-start', paddingVertical: spacing.md },
  focused: { borderColor: colors.primary },
  error: { borderColor: colors.error, backgroundColor: colors.errorSoft },
  disabled: { opacity: 0.6 },
  input: {
    flex: 1,
    ...typography.body,
    fontFamily: fontFamily.regular,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  inputMultiline: { textAlignVertical: 'top', paddingVertical: 0 },
  inputDisabled: { color: colors.muted },
});
