import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, fontFamily, radius, shadows, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'accent'
  | 'social'
  | 'inverse'
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
  fullWidth?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
};

const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: string }> = {
  primary: {
    container: { backgroundColor: colors.primary, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', ...shadows.button },
    text: colors.white,
  },
  secondary: {
    container: { backgroundColor: colors.glass, borderWidth: 1, borderColor: '#C6DDD1', ...shadows.soft },
    text: colors.primary,
  },
  ghost: {
    container: { backgroundColor: '#EAF2ED', borderWidth: 1, borderColor: colors.glassBorder },
    text: colors.textSecondary,
  },
  danger: { container: { backgroundColor: colors.error }, text: colors.white },
  accent: { container: { backgroundColor: colors.secondary }, text: colors.white },
  social: {
    container: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder, ...shadows.soft },
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
  const [hovered, setHovered] = useState(false);
  const unavailable = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={unavailable}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: unavailable, busy: loading }}
      hitSlop={isLink ? 8 : undefined}
      style={({ pressed }) => [
        styles.base,
        !isLink && (size === 'sm' ? styles.sm : styles.md),
        container,
        fullWidth ? styles.fullWidth : styles.hug,
        hovered && !unavailable && styles.hovered,
        pressed && styles.pressed,
        disabled && !loading && styles.disabled,
        style,
      ]}
    >
      <View style={[styles.content, loading && styles.hiddenContent]} aria-hidden={loading}>
        {leftIcon && <Icon name={leftIcon} size={iconSize} color={text} />}
        <AppText
          variant={size === 'sm' ? 'bodySmall' : 'button'}
          color={text}
          style={[styles.text, (size === 'sm' || isLink) && styles.compactText]}
        >
          {title}
        </AppText>
        {rightIcon && <Icon name={rightIcon} size={iconSize} color={text} />}
      </View>
      {loading && (
        <View style={styles.loadingIndicator} pointerEvents="none">
          <ActivityIndicator color={text} accessible={false} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    maxWidth: '100%',
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    borderCurve: 'continuous',
  },
  md: {
    minHeight: 52,
    paddingVertical: 15,
    paddingHorizontal: spacing.xxl,
  },
  sm: {
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  hug: { alignSelf: 'flex-start' },
  fullWidth: { alignSelf: 'stretch' },
  content: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  text: { flexShrink: 1, textAlign: 'center' },
  compactText: { fontFamily: fontFamily.semibold },
  hiddenContent: { opacity: 0 },
  loadingIndicator: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' },
  hovered: { opacity: 0.92 },
  pressed: { opacity: 0.88, transform: [{ scale: 0.985 }] },
  disabled: { opacity: 0.5 },
});
