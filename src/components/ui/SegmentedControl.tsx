import { Pressable, StyleSheet, View } from 'react-native';

import { colors, fontFamily, radius, spacing } from '../../theme';
import { AppText } from './AppText';

export type SegmentOption<T extends string = string> = { label: string; value: T };

export type SegmentedControlProps<T extends string = string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange?: (value: T) => void;
  /**
   * - `tabs`: segmentos unidos con fondo verde tenue en el activo (Resumen | Historial | Medicamentos).
   * - `pills`: botones separados con fondo verde sólido en el activo (Luna | Rocky, Macho | Hembra).
   */
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
      {options.map((option, index) => {
        const selected = option.value === value;
        const textColor = isTabs
          ? selected
            ? colors.primary
            : colors.muted
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
              isTabs && index > 0 && styles.tabDivider,
              selected && (isTabs ? styles.tabSelected : styles.pillSelected),
              pressed && styles.pressed,
            ]}
          >
            <AppText
              // Los tabs usan texto más chico y hasta 2 líneas para que quepan 3 opciones largas en 390px.
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
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  pillsContainer: { flexDirection: 'row', gap: spacing.sm },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: spacing.sm,
  },
  tabDivider: { borderLeftWidth: 1, borderLeftColor: colors.border },
  tabSelected: { backgroundColor: colors.primarySoft },
  pill: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pillSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { fontFamily: fontFamily.medium },
  textSelected: { fontFamily: fontFamily.semibold },
  pressed: { opacity: 0.8 },
});
