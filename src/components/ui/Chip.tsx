import { Pressable, StyleSheet } from 'react-native';

import { colors, fontFamily, radius, spacing } from '../../theme';
import { AppText } from './AppText';

export type ChipVariant =
  /** Gris: sobre fondos blancos (cards). */
  | 'filled'
  /** Blanco con borde: sobre el fondo gris de pantalla. */
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
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    minHeight: 32,
    justifyContent: 'center',
  },
  filled: { backgroundColor: '#EEEEEE', borderColor: colors.border },
  outlined: { backgroundColor: colors.surface, borderColor: colors.border },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  selectedText: { fontFamily: fontFamily.semibold },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
});

// Separación estándar entre chips (usada por ChipGroup).
export const CHIP_GAP = spacing.sm;
