import { isValidElement, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Badge, Icon, renderIconSlot, type BadgeProps, type IconSlot } from '../ui';

export type ListRowProps = {
  title: string;
  subtitle?: string;
  /** Emoji o elemento dentro de la caja cuadrada izquierda. */
  icon?: IconSlot;
  iconBackground?: string;
  /** Reemplaza la caja de ícono (ej. una miniatura de artículo). */
  leading?: ReactNode;
  /** Badge a la derecha ("Nuevo", "Activo", "1") o cualquier nodo. */
  badge?: BadgeProps | ReactNode;
  onPress?: () => void;
  /** Por defecto se muestra cuando la fila es presionable. */
  showChevron?: boolean;
  /** `danger`: fila resaltada en rojo (ej. "Contacto veterinario" en urgencia alta). */
  tone?: 'default' | 'danger';
};

function isBadgeProps(value: unknown): value is BadgeProps {
  return typeof value === 'object' && value !== null && !isValidElement(value) && 'label' in value;
}

export function ListRow({
  title,
  subtitle,
  icon,
  iconBackground = colors.background,
  leading,
  badge,
  onPress,
  showChevron = Boolean(onPress),
  tone = 'default',
}: ListRowProps) {
  const isDanger = tone === 'danger';

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={subtitle ? `${title}. ${subtitle}` : title}
      style={({ pressed }) => [styles.row, isDanger && styles.danger, pressed && styles.pressed]}
    >
      {leading ??
        (icon && (
          <View style={[styles.iconBox, { backgroundColor: isDanger ? colors.white : iconBackground }]}>
            {renderIconSlot(icon, 18)}
          </View>
        ))}
      <View style={styles.texts}>
        <AppText variant="bodySmall" weight="semibold" color={isDanger ? colors.error : colors.text}>
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="caption" color={colors.muted} numberOfLines={2}>
            {subtitle}
          </AppText>
        )}
      </View>
      {badge !== undefined && (isBadgeProps(badge) ? <Badge {...badge} /> : badge)}
      {showChevron && <Icon name="chevron-forward" size={16} color={colors.muted} />}
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
  danger: { backgroundColor: colors.errorSoft },
  pressed: { backgroundColor: colors.background },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { flex: 1, gap: 1 },
});
