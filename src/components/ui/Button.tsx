import { ActivityIndicator, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, fontFamily, radius, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  /** Naranja: CTAs del evaluador ("Contactar veterinario", "Qué hacer ahora"). */
  | 'accent'
  /** Blanco con borde: botones de Google / Apple. */
  | 'social'
  /** Blanco con texto rojo: sobre fondos rojos ("Llamar" en EmergencyCallCard). */
  | 'inverse'
  /** Solo texto: "¿Olvidaste tu contraseña?", "No guardar evaluación". */
  | 'link';

export type ButtonSize = 'md' | 'sm';

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: IconName;
  rightIcon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  /** Ocupa todo el ancho del contenedor. Por defecto el botón se ajusta a su contenido. */
  fullWidth?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
};

const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: string }> = {
  primary: { container: { backgroundColor: colors.primary }, text: colors.white },
  secondary: {
    container: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.primary },
    text: colors.primary,
  },
  ghost: {
    container: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
    text: colors.textSecondary,
  },
  danger: { container: { backgroundColor: colors.error }, text: colors.white },
  accent: { container: { backgroundColor: colors.secondary }, text: colors.white },
  social: {
    container: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    text: colors.text,
  },
  inverse: { container: { backgroundColor: colors.white }, text: colors.error },
  link: { container: { backgroundColor: 'transparent' }, text: colors.primary },
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  fullWidth = false,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const { container, text } = variantStyles[variant];
  const isLink = variant === 'link';
  const iconSize = size === 'sm' ? 16 : 18;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      hitSlop={isLink ? 8 : undefined}
      style={({ pressed }) => [
        styles.base,
        !isLink && (size === 'sm' ? styles.sm : styles.md),
        container,
        fullWidth ? styles.fullWidth : styles.hug,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={text} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <Icon name={leftIcon} size={iconSize} color={text} />}
          <AppText
            variant={size === 'sm' ? 'bodySmall' : 'button'}
            color={text}
            style={size === 'sm' || isLink ? styles.compactText : undefined}
          >
            {title}
          </AppText>
          {rightIcon && <Icon name={rightIcon} size={iconSize} color={text} />}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  md: {
    minHeight: 48,
    paddingVertical: 14,
    paddingHorizontal: spacing.xxl,
  },
  sm: {
    minHeight: 36,
    paddingVertical: spacing.sm,
    paddingHorizontal: 14,
    borderRadius: radius.sm,
  },
  hug: { alignSelf: 'flex-start' },
  fullWidth: { alignSelf: 'stretch' },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  compactText: { fontFamily: fontFamily.semibold },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
});
