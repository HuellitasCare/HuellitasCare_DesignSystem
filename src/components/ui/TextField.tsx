import { useId, useState, type Ref } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, fontFamily, radius, spacing, typography } from '../../theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

export type TextFieldVariant =
  | 'filled'
  | 'outlined';

export type TextFieldProps = Omit<TextInputProps, 'style' | 'editable'> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: IconName;
  inputRef?: Ref<TextInput>;
  password?: boolean;
  disabled?: boolean;
  variant?: TextFieldVariant;
};

export function TextField({
  label,
  error,
  helperText,
  leftIcon,
  inputRef,
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
  const descriptionId = useId();
  const hasError = Boolean(error);
  const description = error || helperText;
  const iconColor = hasError ? colors.error : focused ? colors.primary : colors.textSecondary;

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
          focused && hasError && styles.errorFocused,
          password && styles.passwordField,
          disabled && styles.disabled,
        ]}
      >
        {leftIcon && <Icon name={leftIcon} size={19} color={iconColor} />}
        <TextInput
          {...inputProps}
          {...(Platform.OS === 'web' ? {
            dataSet: { glassInput: 'true' },
            'aria-describedby': description ? descriptionId : undefined,
            'aria-invalid': hasError || undefined,
          } : {})}
          ref={inputRef}
          multiline={multiline}
          editable={!disabled}
          secureTextEntry={password ? hidden : inputProps.secureTextEntry}
          autoCapitalize={inputProps.autoCapitalize ?? (password ? 'none' : undefined)}
          autoCorrect={inputProps.autoCorrect ?? (password ? false : undefined)}
          selectionColor={colors.primary}
          underlineColorAndroid="transparent"
          placeholderTextColor={colors.muted}
          accessibilityLabel={inputProps.accessibilityLabel ?? label}
          accessibilityHint={inputProps.accessibilityHint ?? description}
          accessibilityState={{ ...inputProps.accessibilityState, disabled }}
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
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Mostrar contraseña' : 'Ocultar contraseña'}
            accessibilityState={{ disabled }}
            style={({ pressed }) => [styles.passwordToggle, pressed && styles.passwordTogglePressed]}
          >
            <Icon name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color={iconColor} />
          </Pressable>
        )}
      </View>
      {description && (
        <AppText
          nativeID={descriptionId}
          variant="caption"
          color={hasError ? colors.error : colors.textSecondary}
          accessibilityLiveRegion={hasError ? 'polite' : 'none'}
          style={styles.description}
        >
          {description}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm, minWidth: 0 },
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
  multiline: { minHeight: 96, alignItems: 'flex-start', paddingVertical: spacing.md },
  focused: { borderColor: colors.primary, backgroundColor: colors.surface, boxShadow: '0 0 0 3px rgba(35, 117, 95, 0.10)' },
  error: { borderColor: colors.error, backgroundColor: colors.errorSoft },
  errorFocused: { boxShadow: '0 0 0 3px rgba(178, 63, 77, 0.10)' },
  passwordField: { paddingRight: spacing.xs },
  passwordToggle: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: radius.pill },
  passwordTogglePressed: { backgroundColor: colors.primarySoft },
  description: { paddingHorizontal: spacing.xxs },
  disabled: { opacity: 0.6 },
  input: {
    flex: 1,
    minWidth: 0,
    ...typography.body,
    fontFamily: fontFamily.regular,
    color: colors.text,
    paddingVertical: spacing.sm,
    outlineWidth: 0,
  },
  inputMultiline: { textAlignVertical: 'top', paddingVertical: 0 },
  inputDisabled: { color: colors.muted },
});
