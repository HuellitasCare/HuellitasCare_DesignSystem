import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText, CheckboxBox } from '../ui';

export type ChecklistItemProps = {
  title: string;
  subtitle?: string;
  checked: boolean;
  onToggle?: (checked: boolean) => void;
  /** Elemento a la derecha, ej. un badge "¿Cómo? →". */
  accessory?: ReactNode;
};

/** Ítem de la guía de seguimiento en casa ("Agua fresca y accesible"). Úsalo dentro de `ListGroup`. */
export function ChecklistItem({ title, subtitle, checked, onToggle, accessory }: ChecklistItemProps) {
  return (
    <Pressable
      onPress={() => onToggle?.(!checked)}
      disabled={!onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={subtitle ? `${title}. ${subtitle}` : title}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <CheckboxBox checked={checked} />
      <View style={styles.texts}>
        <AppText variant="bodySmall" weight="semibold">
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="caption" color={colors.muted}>
            {subtitle}
          </AppText>
        )}
      </View>
      {accessory}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  pressed: { backgroundColor: colors.background },
  texts: { flex: 1, gap: 1 },
});
