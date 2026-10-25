import { useState } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { colors, radius, shadows } from '../../theme';
import { Icon, type IconName } from './Icon';

export type IconButtonVariant =
  | 'filled'
  | 'outline'
  | 'translucent';

export type IconButtonProps = {
  icon: IconName;
  onPress?: () => void;
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  shape?: 'circle' | 'rounded';
  size?: number;
  disabled?: boolean;
  style?: ViewStyle;
};

const variantStyles: Record<IconButtonVariant, { container: ViewStyle; icon: string }> = {
  filled: { container: { backgroundColor: colors.primary, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.18)', ...shadows.button }, icon: colors.white },
  outline: {
    container: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder, ...shadows.soft },
    icon: colors.primary,
  },
  translucent: { container: { backgroundColor: colors.whiteTranslucent, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.28)' }, icon: colors.white },
};

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  variant = 'filled',
  shape = 'circle',
  size = 44,
  disabled = false,
  style,
}: IconButtonProps) {
  const { container, icon: iconColor } = variantStyles[variant];
  const [hovered, setHovered] = useState(false);
  const slop = Math.max(0, (44 - size) / 2);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
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
        hovered && !disabled && styles.hovered,
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
  hovered: { opacity: 0.9 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.95 }] },
  disabled: { opacity: 0.5 },
});
