import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors, fontFamily, radius, spacing, typography } from '../../theme';
import { Icon } from '../ui';

export type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** Si se pasa, muestra el botón de filtros a la derecha. */
  onFilterPress?: () => void;
  onSubmit?: () => void;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar...',
  onFilterPress,
  onSubmit,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Icon name="search" size={18} color={colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        accessibilityRole="search"
        accessibilityLabel={placeholder}
        style={styles.input}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} accessibilityRole="button" accessibilityLabel="Borrar búsqueda" hitSlop={10}>
          <Icon name="close-circle" size={18} color={colors.muted} />
        </Pressable>
      )}
      {onFilterPress && (
        <Pressable onPress={onFilterPress} accessibilityRole="button" accessibilityLabel="Filtros" hitSlop={10}>
          <Icon name="options-outline" size={20} color={colors.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 44,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    ...typography.bodySmall,
    fontFamily: fontFamily.regular,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
});
