import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { colors, radius } from '../../theme';
import { Icon, type IconName } from './Icon';

export type IconButtonVariant =
  /** Verde sólido: llamar, enviar, adjuntar. */
  | 'filled'
  /** Blanco con borde: chat. */
  | 'outline'
  /** Blanco translúcido sobre verde: botón "atrás" del header. */
  | 'translucent';

export type IconButtonProps = {
  icon: IconName;
  onPress?: () => void;
  /** Obligatorio: el botón no tiene texto visible. */
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  shape?: 'circle' | 'rounded';
  size?: number;
  disabled?: boolean;
  style?: ViewStyle;
};

const variantStyles: Record<IconButtonVariant, { container: ViewStyle; icon: string }> = {
  filled: { container: { backgroundColor: colors.primary }, icon: colors.white },
  outline: {
    container: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    icon: colors.textSecondary,
  },
  translucent: { container: { backgroundColor: colors.whiteTranslucent }, icon: colors.white },
};

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  variant = 'filled',
  shape = 'circle',
  size = 40,
  disabled = false,
  style,
}: IconButtonProps) {
  const { container, icon: iconColor } = variantStyles[variant];
  // Mantiene el área táctil en 44px aunque el botón visual sea más chico.
  const slop = Math.max(0, (44 - size) / 2);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      hitSlop={slop}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: shape === 'circle' ? size / 2 : radius.sm,
        },
        container,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Icon name={icon} size={Math.round(size * 0.45)} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
});
