import { Pressable, StyleSheet, View } from 'react-native';

import { colors, fontFamily, radius, spacing } from '../../theme';
import { AppText } from './AppText';

export type RadioOption<T extends string = string> = { label: string; value: T };

export type RadioPillGroupProps<T extends string = string> = {
  options: RadioOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  accessibilityLabel?: string;
};

/** Selector de opciones con círculo de radio, ej. severidad Leve / Moderado / Grave. */
export function RadioPillGroup<T extends string = string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: RadioPillGroupProps<T>) {
  return (
    <View style={styles.row} accessibilityRole="radiogroup" accessibilityLabel={accessibilityLabel}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange?.(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={option.label}
            style={({ pressed }) => [styles.pill, selected && styles.pillSelected, pressed && styles.pressed]}
          >
            <View style={[styles.radio, selected && styles.radioSelected]}>
              {selected && <View style={styles.radioDot} />}
            </View>
            <AppText
              variant="bodySmall"
              color={selected ? colors.primary : colors.textSecondary}
              style={selected && styles.textSelected}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm - 2,
    minHeight: 44,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pillSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: colors.primary },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  textSelected: { fontFamily: fontFamily.semibold },
  pressed: { opacity: 0.8 },
});
