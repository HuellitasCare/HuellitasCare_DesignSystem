import { Image, Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText, Icon } from '../ui';

export type PhotoAttachProps = {
  /** Abre la cámara o galería; lo maneja la pantalla (ej. con expo-image-picker). */
  onPress?: () => void;
  /** Foto ya seleccionada, se muestra como miniatura. */
  image?: ImageSourcePropType;
  /**
   * - `row`: cuadro punteado + textos ("Toca para adjuntar").
   * - `avatar`: círculo punteado centrado ("Agregar foto" de la mascota).
   */
  variant?: 'row' | 'avatar';
  title?: string;
  subtitle?: string;
};

export function PhotoAttach({
  onPress,
  image,
  variant = 'row',
  title = variant === 'avatar' ? 'Agregar foto' : 'Toca para adjuntar',
  subtitle,
}: PhotoAttachProps) {
  const isAvatar = variant === 'avatar';
  const size = isAvatar ? 80 : 56;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={image !== undefined ? `${title}, foto seleccionada` : title}
      style={({ pressed }) => [isAvatar ? styles.avatarContainer : styles.rowContainer, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.box,
          { width: size, height: size, borderRadius: isAvatar ? size / 2 : radius.md },
          image !== undefined && styles.boxFilled,
        ]}
      >
        {image !== undefined ? (
          <Image source={image} style={{ width: size, height: size, borderRadius: isAvatar ? size / 2 : radius.md }} />
        ) : (
          <Icon name="add" size={22} color={colors.muted} />
        )}
      </View>
      <View style={isAvatar ? styles.avatarTexts : styles.rowTexts}>
        <AppText
          variant={isAvatar ? 'caption' : 'bodySmall'}
          weight={isAvatar ? undefined : 'semibold'}
          color={isAvatar ? colors.muted : colors.text}
          align={isAvatar ? 'center' : undefined}
        >
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="caption" color={colors.muted} align={isAvatar ? 'center' : undefined}>
            {subtitle}
          </AppText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rowContainer: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatarContainer: { alignItems: 'center', gap: spacing.sm, alignSelf: 'center' },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.muted,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  boxFilled: { borderStyle: 'solid', borderColor: colors.border },
  rowTexts: { flex: 1, gap: 2 },
  avatarTexts: { gap: 2 },
  pressed: { opacity: 0.8 },
});
