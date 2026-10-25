import { StyleSheet, View } from 'react-native';

import { Chip, CHIP_GAP, type ChipVariant } from './Chip';

export type ChipOption<T extends string = string> = { label: string; value: T };

export type ChipGroupProps<T extends string = string> = {
  options: ChipOption<T>[];
  value: T[];
  onChange?: (next: T[]) => void;
  multiple?: boolean;
  variant?: ChipVariant;
};

export function ChipGroup<T extends string = string>({
  options,
  value,
  onChange,
  multiple = false,
  variant,
}: ChipGroupProps<T>) {
  const toggle = (option: T) => {
    if (!onChange) return;
    const isSelected = value.includes(option);
    if (multiple) {
      onChange(isSelected ? value.filter((v) => v !== option) : [...value, option]);
    } else {
      onChange(isSelected ? [] : [option]);
    }
  };

  return (
    <View style={styles.wrap} accessibilityRole={multiple ? undefined : 'radiogroup'}>
      {options.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          variant={variant}
          selected={value.includes(option.value)}
          onPress={onChange ? () => toggle(option.value) : undefined}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: CHIP_GAP },
});
