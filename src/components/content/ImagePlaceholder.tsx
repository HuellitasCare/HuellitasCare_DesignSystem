import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Icon, type IconName } from '../ui';

export type ImagePlaceholderProps = {
  label?: string;
  icon?: IconName;
  height?: number;
  /** Sin esquinas redondeadas (para la parte superior de una card). */
  flat?: boolean;
};

/** Espacio reservado para imagen o mapa ("Imagen destacada", "Clínicas cercanas"). */
export function ImagePlaceholder({ label, icon = 'image-outline', height = 120, flat = false }: ImagePlaceholderProps) {
  return (
    <View
      style={[styles.container, { height }, !flat && styles.rounded]}
      accessibilityRole="image"
      accessibilityLabel={label ?? 'Imagen'}
    >
      <Icon name={icon} size={22} color={colors.textSecondary} />
      {label && (
        <AppText variant="caption" color={colors.textSecondary}>
          {label}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  rounded: { borderRadius: radius.md },
});
