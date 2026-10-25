import { Pressable, StyleSheet, View } from 'react-native';

import { colors, fontFamily, radius, shadows, spacing } from '../../theme';
import { AppText } from './AppText';

export type SegmentOption<T extends string = string> = { label: string; value: T };

export type SegmentedControlProps<T extends string = string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange?: (value: T) => void;
  variant?: 'tabs' | 'pills';
  accessibilityLabel?: string;
};

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  variant = 'tabs',
  accessibilityLabel,
}: SegmentedControlProps<T>) {
  const isTabs = variant === 'tabs';

  return (
    <View
      style={isTabs ? styles.tabsContainer : styles.pillsContainer}
      accessibilityRole={isTabs ? 'tablist' : 'radiogroup'}
      accessibilityLabel={accessibilityLabel}
    >
      {options.map((option) => {
        const selected = option.value === value;
        const textColor = isTabs
          ? selected
            ? colors.primary
            : colors.textSecondary
          : selected
            ? colors.white
            : colors.text;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange?.(option.value)}
            accessibilityRole={isTabs ? 'tab' : 'radio'}
            accessibilityState={{ selected }}
            style={({ pressed }) => [
              styles.segment,
              !isTabs && styles.pill,
              selected && (isTabs ? styles.tabSelected : styles.pillSelected),
              pressed && styles.pressed,
            ]}
          >
            <AppText
              variant={isTabs ? 'caption' : 'bodySmall'}
              color={textColor}
              numberOfLines={isTabs ? 2 : 1}
              align="center"
              style={selected ? styles.textSelected : styles.text}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E7F0E9',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: 5,
    gap: 3,
  },
  pillsContainer: { flexDirection: 'row', gap: spacing.sm },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
  },
  tabSelected: { backgroundColor: colors.surface, ...shadows.soft },
  pill: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.glass,
  },
  pillSelected: { backgroundColor: colors.primary, borderColor: colors.primary, ...shadows.button },
  text: { fontFamily: fontFamily.medium },
  textSelected: { fontFamily: fontFamily.semibold },
  pressed: { opacity: 0.8 },
});
