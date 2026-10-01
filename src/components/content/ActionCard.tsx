import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Icon, renderIconSlot, type IconSlot } from '../ui';

export type ActionCardProps = {
  title: string;
  subtitle?: string;
  icon?: IconSlot;
  onPress?: () => void;
  /** `dark`: negro (acción principal). `primary`: verde (ej. "Calendario de salud"). */
  variant?: 'dark' | 'primary';
};

/** Tarjeta de acción destacada con ícono, textos y chevron. */
export function ActionCard({ title, subtitle, icon, onPress, variant = 'dark' }: ActionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}. ${subtitle}` : title}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: variant === 'dark' ? colors.dark : colors.primary },
        pressed && styles.pressed,
      ]}
    >
      {icon && <View style={styles.iconBox}>{renderIconSlot(icon, 18)}</View>}
      <View style={styles.texts}>
        <AppText variant="bodySmall" weight="bold" color={colors.white}>
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="caption" color="rgba(255, 255, 255, 0.75)">
            {subtitle}
          </AppText>
        )}
      </View>
      <Icon name="chevron-forward" size={18} color={colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    minHeight: 64,
  },
  pressed: { opacity: 0.9 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.sm + 2,
    backgroundColor: colors.whiteTranslucent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { flex: 1, gap: 2 },
});
