import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, Card, ChipGroup, Icon, renderIconSlot, type ChipOption, type IconSlot } from '../ui';

export type SymptomCategoryAccordionProps<T extends string = string> = {
  /** Ej. "Digestivo", "Respiratorio". */
  title: string;
  icon?: IconSlot;
  expanded: boolean;
  onToggle?: () => void;
  options: ChipOption<T>[];
  /** Síntomas seleccionados (de esta categoría o de todas; solo se marcan los que coinciden). */
  value: T[];
  onChange?: (next: T[]) => void;
};

/** Categoría de síntomas desplegable con chips de selección múltiple. */
export function SymptomCategoryAccordion<T extends string = string>({
  title,
  icon,
  expanded,
  onToggle,
  options,
  value,
  onChange,
}: SymptomCategoryAccordionProps<T>) {
  const selectedCount = options.filter((o) => value.includes(o.value)).length;

  return (
    <Card padding={0}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={selectedCount > 0 ? `${title}, ${selectedCount} seleccionados` : title}
        style={styles.header}
      >
        {icon && renderIconSlot(icon, 14)}
        <AppText variant="bodySmall" weight="semibold" style={styles.flex}>
          {title}
        </AppText>
        <Icon name={expanded ? 'caret-up' : 'caret-down'} size={16} color={colors.muted} />
      </Pressable>
      {expanded && (
        <View style={styles.body}>
          <ChipGroup options={options} value={value} onChange={onChange} multiple />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  flex: { flex: 1 },
  body: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
