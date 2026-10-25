import { Pressable, StyleSheet } from 'react-native';

import { colors, fontFamily, radius, shadows, spacing } from '../../theme';
import { AppText } from './AppText';

export type ChipVariant =
  | 'filled'
  | 'outlined';

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: ChipVariant;
  disabled?: boolean;
};

export function Chip({
  label,
  selected = false,
  onPress,
  variant = 'filled',
  disabled = false,
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityState={{ selected, disabled }}
      hitSlop={6}
      style={({ pressed }) => [
        styles.base,
        variant === 'filled' ? styles.filled : styles.outlined,
        selected && styles.selected,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <AppText
        variant="bodySmall"
        color={selected ? colors.white : colors.text}
        style={selected && styles.selectedText}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    maxWidth: '100%',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: 1,
    minHeight: 42,
    justifyContent: 'center',
  },
  filled: { backgroundColor: '#EAF2ED', borderColor: colors.glassBorder },
  outlined: { backgroundColor: colors.glass, borderColor: colors.glassBorder },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary, ...shadows.button },
  selectedText: { fontFamily: fontFamily.semibold },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
});

export const CHIP_GAP = spacing.sm;
